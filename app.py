import os
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, flash, session, make_response
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from authlib.integrations.flask_client import OAuth
from pymongo import MongoClient
import certifi
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'gharseva-fallback-key')
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=30)
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # True for HTTPS only
app.config['REMEMBER_COOKIE_HTTPONLY'] = True
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=30)

# ─── Flask-Login Setup ───────────────────────────────────────────────
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to access this page.'
login_manager.remember_cookie_duration = timedelta(days=30)
login_manager.session_protection = "strong"

# MongoDB setup
client = MongoClient(
    os.getenv('MONGO_URI'),
    tls=True,
    tlsCAFile=certifi.where(),
)
db = client[os.getenv('MONGO_DB_NAME', 'GharSeva')]

users_col = db['users']
workers_col = db['workers']

# ─── User class for Flask-Login ──────────────────────────────────────
class User(UserMixin):
    def __init__(self, user_data, role):
        self.id = str(user_data['_id'])
        self.name = user_data.get('name', '')
        self.email = user_data.get('email', '')
        self.role = role
        self.data = user_data

    @staticmethod
    def get(user_id):
        # Try to find in users collection
        user_data = users_col.find_one({'_id': ObjectId(user_id)})
        if user_data:
            return User(user_data, 'user')
        
        # Try workers collection
        worker_data = workers_col.find_one({'_id': ObjectId(user_id)})
        if worker_data:
            return User(worker_data, 'worker')
        
        return None
    
    def get_id(self):
        # Return string representation of user ID
        return str(self.id)

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@login_manager.unauthorized_handler
def unauthorized():
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login'))

# ─── OAuth Setup ────────────────────────────────────────────────────
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# ─── Helper Functions ───────────────────────────────────────────────
def find_user_by_email(email):
    u = users_col.find_one({'email': email})
    if u:
        return u, 'user'
    w = workers_col.find_one({'email': email})
    if w:
        return w, 'worker'
    return None, None

def delete_user_session_tokens(user_id):
    """Delete all session tokens for a user (if you have a tokens collection)"""
    # Agar tumne sessions store ki hain toh yaha delete karo
    # Example: db['user_sessions'].delete_many({'user_id': user_id})
    pass

# ─── Template Context ───────────────────────────────────────────────
@app.context_processor
def inject_user():
    if current_user.is_authenticated:
        return {
            'current_user': {
                'logged_in': True,
                'name': current_user.name,
                'email': current_user.email,
                'role': current_user.role,
                'id': current_user.id,
            }
        }
    return {
        'current_user': {
            'logged_in': False,
            'name': '',
            'email': '',
            'role': '',
            'id': '',
        }
    }

# ─── Routes ─────────────────────────────────────────────────────────

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/service')
def service():
    return render_template('service.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        remember_me = request.form.get('remember_me') == 'on'

        user_data, role = find_user_by_email(email)

        if not user_data:
            flash('No account found with this email.', 'error')
            return render_template('login.html')

        if not check_password_hash(user_data.get('password', ''), password):
            flash('Incorrect password.', 'error')
            return render_template('login.html')

        # Create User object and login
        user = User(user_data, role)
        login_user(user, remember=remember_me)
        
        flash(f"Welcome back, {user.name}!", 'success')
        
        # Redirect to next page or home
        next_page = request.args.get('next')
        if next_page:
            return redirect(next_page)
        return redirect(url_for('index'))

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
        
    if request.method == 'POST':
        role = request.form.get('role', 'user')
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '')

        # Check duplicate email
        existing, _ = find_user_by_email(email)
        if existing:
            flash('An account with this email already exists.', 'error')
            return render_template('signup.html')

        hashed_pw = generate_password_hash(password)
        now = datetime.utcnow()

        if role == 'worker':
            doc = {
                'name': name,
                'email': email,
                'phone': phone,
                'password': hashed_pw,
                'expertise': request.form.get('expertise', ''),
                'location': request.form.get('location', ''),
                'role': 'worker',
                'auth_provider': 'local',
                'created_at': now,
            }
            workers_col.insert_one(doc)
        else:
            doc = {
                'name': name,
                'email': email,
                'phone': phone,
                'password': hashed_pw,
                'role': 'user',
                'auth_provider': 'local',
                'created_at': now,
            }
            users_col.insert_one(doc)

        flash('Account created successfully! Please log in.', 'success')
        return redirect(url_for('login'))

    return render_template('signup.html')

@app.route('/auth/google')
def google_login():
    role = request.args.get('role', 'user')
    session['oauth_role'] = role
    redirect_uri = url_for('google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/auth/google/callback')
def google_callback():
    token = google.authorize_access_token(leeway=60)
    user_info = token.get('userinfo')

    if not user_info:
        flash('Google login failed. Please try again.', 'error')
        return redirect(url_for('login'))

    email = user_info['email'].lower()
    name = user_info.get('name', '')
    role = session.pop('oauth_role', 'user')

    # Check if already registered
    existing, existing_role = find_user_by_email(email)

    if existing:
        # Already exists — just log in
        user = User(existing, existing_role)
        login_user(user, remember=True)
        flash(f"Welcome back, {user.name}!", 'success')
    else:
        # New user via Google
        now = datetime.utcnow()
        doc = {
            'name': name,
            'email': email,
            'phone': '',
            'role': role,
            'auth_provider': 'google',
            'google_id': user_info.get('sub', ''),
            'avatar': user_info.get('picture', ''),
            'created_at': now,
        }
        if role == 'worker':
            doc['expertise'] = ''
            doc['location'] = ''
            result = workers_col.insert_one(doc)
        else:
            result = users_col.insert_one(doc)
        
        doc['_id'] = result.inserted_id
        user = User(doc, role)
        login_user(user, remember=True)
        flash(f"Account created! Welcome, {name}!", 'success')

    return redirect(url_for('index'))

@app.route('/logout')
@login_required
def logout():
    """Proper logout function with complete cleanup"""
    
    # Debug print
    print(f"Logging out user: {current_user.email if current_user.is_authenticated else 'Unknown'}")
    
    # Store user info for flash message
    user_name = current_user.name if current_user.is_authenticated else "User"
    
    # Delete any stored session tokens for this user
    delete_user_session_tokens(current_user.id)
    
    # Flask-Login logout
    logout_user()
    
    # Clear all session data
    session.clear()
    
    # Create response and delete all cookies
    resp = make_response(redirect(url_for('index')))
    
    # Delete all relevant cookies
    resp.delete_cookie('session')
    resp.delete_cookie('remember_token')
    resp.set_cookie('session', '', expires=0, path='/')
    resp.set_cookie('remember_token', '', expires=0, path='/')
    
    # Flash success message
    flash(f'Goodbye, {user_name}! You have been logged out successfully.', 'success')
    
    print("Logout completed - cookies cleared")
    
    return resp

# Optional: Session cleanup endpoint (for debugging)
@app.route('/clear-session')
def clear_session():
    """Emergency session clear endpoint"""
    session.clear()
    resp = make_response(redirect(url_for('index')))
    resp.delete_cookie('session')
    resp.delete_cookie('remember_token')
    flash('Session cleared!', 'info')
    return resp

# ─── Protected Routes ────────────────────────────────────────
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html', user=current_user)

# ─── Error Handlers ─────────────────────────────────────────────
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500


@app.route('/how_it_works')
def how_it_works():
    return render_template('how_it_works.html')

app=app
