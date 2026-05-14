// toast.js — GharSeva Toast Notification System

(function () {
    // ── Create container once ──
    function getContainer() {
        let c = document.getElementById('toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'toast-container';
            document.body.appendChild(c);
        }
        return c;
    }

    // ── Core show function ──
    window.showToast = function (message, type = 'success', duration = 4000) {
        const container = getContainer();

        const icons = { success: '✅', error: '❌' };
        const titles = { success: 'Success', error: 'Error' };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '🔔'}</span>
            <div class="toast-body">
                <div class="toast-title">${titles[type] || 'Notice'}</div>
                <div class="toast-msg">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">✕</button>
            <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
        `;

        container.appendChild(toast);

        // Close on click anywhere on toast
        function dismiss() {
            toast.classList.add('toast-hiding');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        }

        toast.addEventListener('click', dismiss);
        toast.querySelector('.toast-close').addEventListener('click', (e) => {
            e.stopPropagation();
            dismiss();
        });

        // Auto dismiss
        setTimeout(dismiss, duration);
    };

    // ── Auto-render flashed messages injected by Flask via data attribute ──
    // Usage: <div id="flask-messages" data-messages='[["success","Welcome!"]]'></div>
    document.addEventListener('DOMContentLoaded', function () {
        const el = document.getElementById('flask-messages');
        if (!el) return;
        try {
            const messages = JSON.parse(el.dataset.messages || '[]');
            messages.forEach(function ([category, message]) {
                // Flask uses 'error' or 'success'; map accordingly
                const type = (category === 'error') ? 'error' : 'success';
                // Small delay so page has rendered before toast appears
                setTimeout(() => showToast(message, type), 150);
            });
        } catch (e) {
            console.warn('GharSeva Toast: Could not parse flash messages', e);
        }
    });
})();