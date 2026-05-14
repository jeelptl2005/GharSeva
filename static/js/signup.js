function switchTab(type) {
    const userForm = document.getElementById('userForm');
    const workerForm = document.getElementById('workerForm');
    const tabUser = document.getElementById('tabUser');
    const tabWorker = document.getElementById('tabWorker');

    if (type === 'user') {
        userForm.classList.add('active');
        workerForm.classList.remove('active');
        tabUser.classList.add('active');
        tabWorker.classList.remove('active');
    } else {
        workerForm.classList.add('active');
        userForm.classList.remove('active');
        tabWorker.classList.add('active');
        tabUser.classList.remove('active');
    }
}

// ---------- PASSWORD SHOW / HIDE ----------
const eyeState = {};
function togglePass(inputId, eyeId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(eyeId);
    eyeState[inputId] = !eyeState[inputId];
    input.type = eyeState[inputId] ? 'text' : 'password';
    eye.textContent = eyeState[inputId] ? '🙈' : '👁️';
}

// ---------- PASSWORD STRENGTH ----------
function checkStrength(password, barId, labelId) {
    const bar = document.getElementById(barId);
    const label = document.getElementById(labelId);
    if (!bar || !label) return;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = [
        { width: '0%', color: '#e5dfd8', text: '' },
        { width: '25%', color: '#ef4444', text: 'Weak' },
        { width: '50%', color: '#f59e0b', text: 'Fair' },
        { width: '75%', color: '#3b82f6', text: 'Good' },
        { width: '100%', color: '#22c55e', text: 'Strong' },
    ];
    const level = levels[Math.min(score, 4)];
    bar.style.width = level.width;
    bar.style.background = level.color;
    label.textContent = level.text;
    label.style.color = level.color;
}

// ---------- VALIDATORS ----------
function validateName(val) { if (!val.trim()) return 'Name is required.'; if (val.trim().length < 2) return 'Enter a valid name.'; return ''; }
function validateEmail(val) { if (!val.trim()) return 'Email is required.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email.'; return ''; }
function validatePhone(val) { const d = val.replace(/\D/g, ''); if (!val.trim()) return 'Phone is required.'; if (d.length < 10) return 'Enter a valid 10-digit number.'; return ''; }
function validatePassword(val) { if (!val.trim()) return 'Password is required.'; if (val.length < 6) return 'Min. 6 characters.'; return ''; }
function validateConfirm(p, c) { if (!c.trim()) return 'Please confirm password.'; if (p !== c) return 'Passwords do not match.'; return ''; }
function validateSelect(val) { if (!val) return 'Please select expertise.'; return ''; }
function validateLocation(val) { if (!val.trim()) return 'Location is required.'; return ''; }

function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (error) error.textContent = msg;
    if (input) input.classList.toggle('error', !!msg);
}

function liveValidate(inputId, errorId, fn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('blur', () => setError(inputId, errorId, fn(input.value)));
    input.addEventListener('input', () => { if (input.classList.contains('error')) setError(inputId, errorId, fn(input.value)); });
}

document.addEventListener('DOMContentLoaded', function () {
    liveValidate('uName', 'uNameError', validateName);
    liveValidate('uEmail', 'uEmailError', validateEmail);
    liveValidate('uPhone', 'uPhoneError', validatePhone);
    liveValidate('uPassword', 'uPasswordError', validatePassword);

    document.getElementById('uPassword').addEventListener('input', function () { checkStrength(this.value, 'uStrengthBar', 'uStrengthLabel'); });
    document.getElementById('uConfirm').addEventListener('blur', function () { setError('uConfirm', 'uConfirmError', validateConfirm(document.getElementById('uPassword').value, this.value)); });

    liveValidate('wName', 'wNameError', validateName);
    liveValidate('wEmail', 'wEmailError', validateEmail);
    liveValidate('wPhone', 'wPhoneError', validatePhone);
    liveValidate('wPassword', 'wPasswordError', validatePassword);
    liveValidate('wLocation', 'wLocationError', validateLocation);

    document.getElementById('wPassword').addEventListener('input', function () { checkStrength(this.value, 'wStrengthBar', 'wStrengthLabel'); });
    document.getElementById('wConfirm').addEventListener('blur', function () { setError('wConfirm', 'wConfirmError', validateConfirm(document.getElementById('wPassword').value, this.value)); });
    document.getElementById('wExpertise').addEventListener('change', function () { setError('wExpertise', 'wExpertiseError', validateSelect(this.value)); });

    // User submit
    document.getElementById('userRegForm').addEventListener('submit', function (e) {
        const nameErr = validateName(document.getElementById('uName').value);
        const emailErr = validateEmail(document.getElementById('uEmail').value);
        const phoneErr = validatePhone(document.getElementById('uPhone').value);
        const passErr = validatePassword(document.getElementById('uPassword').value);
        const confirmErr = validateConfirm(document.getElementById('uPassword').value, document.getElementById('uConfirm').value);
        const termsErr = document.getElementById('uTerms').checked ? '' : 'You must agree to the terms.';
        setError('uName', 'uNameError', nameErr); setError('uEmail', 'uEmailError', emailErr);
        setError('uPhone', 'uPhoneError', phoneErr); setError('uPassword', 'uPasswordError', passErr);
        setError('uConfirm', 'uConfirmError', confirmErr);
        document.getElementById('uTermsError').textContent = termsErr;
        if (nameErr || emailErr || phoneErr || passErr || confirmErr || termsErr) {
            e.preventDefault();
            return;
        }
        const btn = document.getElementById('uSubmitBtn');
        btn.querySelector('.btn-text').textContent = 'Creating account...';
        btn.disabled = true;
        // form submits naturally to Flask
    });

    // Worker submit
    document.getElementById('workerRegForm').addEventListener('submit', function (e) {
        const nameErr = validateName(document.getElementById('wName').value);
        const emailErr = validateEmail(document.getElementById('wEmail').value);
        const phoneErr = validatePhone(document.getElementById('wPhone').value);
        const expertiseErr = validateSelect(document.getElementById('wExpertise').value);
        const locationErr = validateLocation(document.getElementById('wLocation').value);
        const passErr = validatePassword(document.getElementById('wPassword').value);
        const confirmErr = validateConfirm(document.getElementById('wPassword').value, document.getElementById('wConfirm').value);
        const termsErr = document.getElementById('wTerms').checked ? '' : 'You must agree to the terms.';
        setError('wName', 'wNameError', nameErr); setError('wEmail', 'wEmailError', emailErr);
        setError('wPhone', 'wPhoneError', phoneErr); setError('wExpertise', 'wExpertiseError', expertiseErr);
        setError('wLocation', 'wLocationError', locationErr); setError('wPassword', 'wPasswordError', passErr);
        setError('wConfirm', 'wConfirmError', confirmErr);
        document.getElementById('wTermsError').textContent = termsErr;
        if (nameErr || emailErr || phoneErr || expertiseErr || locationErr || passErr || confirmErr || termsErr) {
            e.preventDefault();
            return;
        }
        const btn = document.getElementById('wSubmitBtn');
        btn.querySelector('.btn-text').textContent = 'Registering...';
        btn.disabled = true;
        // form submits naturally to Flask
    });
});