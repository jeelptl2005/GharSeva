// script.js
document.addEventListener("DOMContentLoaded", function () {
    initDropdowns();
    initSearchSuggestions();
    initMobileDrawer();
    initScrollEffects();
    initButtons();
    initServiceFilters();
    initUserMenu();


    // ---------- DROPDOWN LOGIC ----------
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');

        function closeAllDropdowns() {
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('open'));
        }

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!toggle || !menu) return;

            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = menu.classList.contains('open');
                closeAllDropdowns();
                if (!isOpen) {
                    menu.classList.add('open');
                    toggle.classList.add('open');
                }
            });

            menu.addEventListener('click', e => e.stopPropagation());
        });

        document.addEventListener('click', closeAllDropdowns);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllDropdowns(); });
    }

    // ---------- SEARCH SUGGESTIONS ----------
    function initSearchSuggestions() {
        const searchInput = document.getElementById('serviceSearch');
        const suggestionsDiv = document.getElementById('searchSuggestions');
        const clearBtn = document.getElementById('clearSearch');

        if (!searchInput) return;

        const services = [
            { name: "Plumbing Services", icon: "🔧", category: "Plumbing", keywords: ["plumbing", "pipe", "leak", "tap", "faucet"] },
            { name: "Electrician Services", icon: "⚡", category: "Electrician", keywords: ["electrician", "wiring", "circuit", "switch", "fan"] },
            { name: "Home Cleaning", icon: "🧹", category: "Cleaning", keywords: ["cleaning", "clean", "housekeeping", "deep clean"] },
            { name: "Carpenter Services", icon: "🛠️", category: "Carpenter", keywords: ["carpenter", "furniture", "repair", "wood"] },
            { name: "Painting Services", icon: "🎨", category: "Painter", keywords: ["painting", "paint", "wall", "color"] },
            { name: "AC Repair & Service", icon: "❄️", category: "AC Repair", keywords: ["ac", "air conditioner", "cooling", "repair"] },
            { name: "Security Systems", icon: "🔒", category: "Security", keywords: ["security", "cctv", "alarm", "lock"] },
            { name: "Laundry & Dry Cleaning", icon: "🧺", category: "Laundry", keywords: ["laundry", "wash", "dry clean", "iron"] },
            { name: "Appliance Repair", icon: "📺", category: "Appliances", keywords: ["appliance", "fridge", "washing machine", "oven"] },
            { name: "Pest Control", icon: "🐜", category: "Pest", keywords: ["pest", "insect", "rodent", "termite"] }
        ];

        function filterServices(query) {
            if (!query.trim()) return [];
            const lowerQuery = query.toLowerCase();
            return services.filter(s =>
                s.name.toLowerCase().includes(lowerQuery) ||
                s.category.toLowerCase().includes(lowerQuery) ||
                s.keywords.some(k => k.includes(lowerQuery))
            ).slice(0, 6);
        }

        function showSuggestions(results) {
            if (!results.length) { suggestionsDiv.classList.remove('active'); return; }
            suggestionsDiv.innerHTML = results.map(s => `
                <div class="suggestion-item" data-service="${s.name}">
                    <span class="suggestion-icon">${s.icon}</span>
                    <div class="suggestion-text">
                        <div style="font-weight:600;font-size:15px;">${s.name}</div>
                        <div class="suggestion-category">${s.category}</div>
                    </div>
                </div>
            `).join('');
            suggestionsDiv.classList.add('active');

            suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.dataset.service;
                    suggestionsDiv.classList.remove('active');
                    clearBtn.classList.add('visible');
                    alert(`✨ Booking for "${item.dataset.service}" — Our expert will reach out shortly!`);
                });
            });
        }

        function handleSearch() {
            const q = searchInput.value;
            clearBtn.classList.toggle('visible', !!q);
            showSuggestions(q ? filterServices(q) : []);
        }

        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) handleSearch(); });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearBtn.classList.remove('visible');
                suggestionsDiv.classList.remove('active');
                searchInput.focus();
            });
        }

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                suggestionsDiv.classList.remove('active');
            }
        });
    }

    // ---------- MOBILE DRAWER ----------
    function initMobileDrawer() {
        const hamburger = document.getElementById('hamburger');
        const drawer = document.getElementById('mobileDrawer');
        const overlay = document.getElementById('mobileOverlay');
        const closeBtn = document.getElementById('drawerClose');

        if (!hamburger || !drawer) return;

        function openDrawer() {
            drawer.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            drawer.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', (e) => { e.stopPropagation(); openDrawer(); });
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (overlay) overlay.addEventListener('click', closeDrawer);

        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

        // Drawer accordions
        document.querySelectorAll('.drawer-accordion').forEach(acc => {
            const toggle = acc.querySelector('.drawer-toggle');
            if (!toggle) return;
            toggle.addEventListener('click', () => {
                const isOpen = acc.classList.contains('open');
                document.querySelectorAll('.drawer-accordion').forEach(a => a.classList.remove('open'));
                if (!isOpen) acc.classList.add('open');
            });
        });

        // Mobile search
        const mobileSearch = document.getElementById('mobileSearch');
        if (mobileSearch) {
            mobileSearch.addEventListener('input', (e) => {
                const val = e.target.value.toLowerCase();
                const serviceItems = document.querySelectorAll('.drawer-service-item');
                serviceItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(val) ? 'flex' : 'none';
                });
            });
        }

        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const mobileSignupBtn = document.getElementById('mobileSignupBtn');
        if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', () => { closeDrawer(); alert('🔐 Welcome back! Login to manage your bookings.'); });
        if (mobileSignupBtn) mobileSignupBtn.addEventListener('click', () => { closeDrawer(); alert('🎉 Create your Ghar Seva account & get ₹100 off on first service!'); });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 780) closeDrawer();
        });
    }

    // ---------- SCROLL EFFECT ----------
    function initScrollEffects() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // ---------- BUTTONS ----------
    function initButtons() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');


        const bookBtn = document.querySelector('.hero-buttons .btn-primary');
        if (bookBtn) bookBtn.addEventListener('click', () => alert('📞 Find best professionals near you. Get instant quotes!'));
    }

    // ---------- USER MENU DROPDOWN ----------
    function initUserMenu() {
        const userMenu = document.getElementById('userMenu');
        const userTrigger = document.getElementById('userTrigger');
        const userDropdown = document.getElementById('userDropdown');

        if (!userTrigger || !userMenu || !userDropdown) return;

        userTrigger.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = userDropdown.classList.contains('open');
            userMenu.classList.toggle('open', !isOpen);
            userDropdown.classList.toggle('open', !isOpen);
        });

        // Close when clicking outside
        document.addEventListener('click', function () {
            userMenu.classList.remove('open');
            userDropdown.classList.remove('open');
        });

        // Don't close when clicking inside dropdown
        userDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                userMenu.classList.remove('open');
                userDropdown.classList.remove('open');
            }
        });
    }

    // ---------- SERVICE FILTERS ----------
    function initServiceFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.service-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                cards.forEach(card => {
                    const cats = card.dataset.category || '';
                    if (filter === 'all' || cats.includes(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});

// ---------- SERVICE MODAL ----------
function openServiceModal(name, icon, desc, category, price, time, rating) {
    document.getElementById('modalIcon').textContent = icon;
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalTime').textContent = time + ' min arrival';
    document.getElementById('modalRatingVal').textContent = rating + ' / 5';
    document.getElementById('serviceModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    document.getElementById('serviceModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeServiceModal();
});