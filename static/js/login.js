// ======= Login =======

// login.js — GharSeva Login Page

document.addEventListener('DOMContentLoaded', function () {

    // ---------- PASSWORD SHOW / HIDE ----------
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    let isPasswordVisible = false;

    toggleBtn.addEventListener('click', function () {
        isPasswordVisible = !isPasswordVisible;

        if (isPasswordVisible) {
            passwordInput.type = 'text';
            eyeIcon.textContent = '🙈';          // hide icon
            toggleBtn.setAttribute('aria-label', 'Hide password');
        } else {
            passwordInput.type = 'password';
            eyeIcon.textContent = '👁️';           // show icon
            toggleBtn.setAttribute('aria-label', 'Show password');
        }
    });

    // ---------- FORM VALIDATION ----------
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.getElementById('loginBtn');
    const btnLoader = document.getElementById('btnLoader');
    const btnText = loginBtn.querySelector('.btn-text');

    function validateEmail(val) {
        if (!val.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email address.';
        return '';
    }

    function validatePassword(val) {
        if (!val.trim()) return 'Password is required.';
        if (val.length < 6) return 'Password must be at least 6 characters.';
        return '';
    }

    function setError(input, errorEl, msg) {
        errorEl.textContent = msg;
        if (msg) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    // Live validation on blur
    emailInput.addEventListener('blur', () => {
        setError(emailInput, emailError, validateEmail(emailInput.value));
    });

    passwordInput.addEventListener('blur', () => {
        setError(passwordInput, passwordError, validatePassword(passwordInput.value));
    });

    // Clear error on input
    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('error')) {
            setError(emailInput, emailError, validateEmail(emailInput.value));
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.classList.contains('error')) {
            setError(passwordInput, passwordError, validatePassword(passwordInput.value));
        }
    });

    // ---------- FORM SUBMIT - Only validation, no fake submission ----------
    loginForm.addEventListener('submit', function (e) {
        const emailErr = validateEmail(emailInput.value);
        const passErr = validatePassword(passwordInput.value);

        setError(emailInput, emailError, emailErr);
        setError(passwordInput, passwordError, passErr);

        // Agar validation fail ho jaye toh form submit nahi hone denge
        if (emailErr || passErr) {
            e.preventDefault();
            return;
        }

        // Agar validation pass hai, toh loader show karo
        // Note: e.preventDefault() nahi kiya, toh form normally submit hoga Flask ko
        btnText.textContent = 'Logging in...';
        btnLoader.classList.add('visible');
        loginBtn.disabled = true;
        
        // Form automatically submit ho jayega Flask ko
        // No fake setTimeout or alert
    });

});