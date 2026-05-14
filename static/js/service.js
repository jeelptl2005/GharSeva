// service.js
document.addEventListener("DOMContentLoaded", function () {

    // ─── SERVICES DATA ───────────────────────────────────────────────
    const servicesData = [
        {
            id: 1, name: "Plumbing Services", icon: "🔧", category: "Plumbing",
            price: 349, rating: 4.8, eta: "20 min",
            desc: "Leakage repair, pipe fitting, tap installation, drainage cleaning, water tank cleaning",
            subServices: [
                { icon: "🚰", title: "Tap & Faucet Repair", price: "₹149" },
                { icon: "🪠", title: "Drainage Cleaning", price: "₹199" },
                { icon: "🔩", title: "Pipe Fitting", price: "₹249" },
                { icon: "🚿", title: "Shower Installation", price: "₹299" },
                { icon: "🪣", title: "Water Tank Cleaning", price: "₹349" },
                { icon: "🚽", title: "Toilet Repair", price: "₹199" },
            ],
            workers: [
                { name: "Ramesh Patel", exp: "8 yrs", jobs: 420, rating: 4.9, avatar: "👷" },
                { name: "Suresh Kumar", exp: "5 yrs", jobs: 280, rating: 4.8, avatar: "🧑‍🔧" },
                { name: "Mahesh Vora",  exp: "6 yrs", jobs: 310, rating: 4.7, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 2, name: "Electrician Services", icon: "⚡", category: "Electrician",
            price: 399, rating: 4.7, eta: "25 min",
            desc: "Wiring, switch/socket repair, fan installation, circuit breaker, inverter setup",
            subServices: [
                { icon: "🔌", title: "Switch & Socket Repair", price: "₹149" },
                { icon: "💡", title: "Light Installation", price: "₹199" },
                { icon: "🌀", title: "Fan Installation", price: "₹249" },
                { icon: "🔋", title: "Inverter Setup", price: "₹499" },
                { icon: "⚡", title: "Full Home Wiring", price: "₹999" },
                { icon: "🔐", title: "MCB/Fuse Repair", price: "₹199" },
            ],
            workers: [
                { name: "Vijay Singh",   exp: "10 yrs", jobs: 560, rating: 4.9, avatar: "👷" },
                { name: "Ajay Sharma",   exp: "6 yrs",  jobs: 340, rating: 4.7, avatar: "🧑‍🔧" },
                { name: "Ravi Chauhan",  exp: "4 yrs",  jobs: 190, rating: 4.6, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 3, name: "Home Cleaning", icon: "🧹", category: "Cleaning",
            price: 449, rating: 4.9, eta: "30 min",
            desc: "Full home deep clean, kitchen, bathroom, sofa/carpet cleaning, office cleaning",
            subServices: [
                { icon: "🏠", title: "Full Home Deep Clean", price: "₹899" },
                { icon: "🍳", title: "Kitchen Deep Clean",   price: "₹499" },
                { icon: "🚿", title: "Bathroom Sanitization", price: "₹299" },
                { icon: "🛋️", title: "Sofa/Carpet Cleaning", price: "₹449" },
                { icon: "🪟", title: "Window Cleaning",      price: "₹199" },
                { icon: "🏢", title: "Office Cleaning",      price: "₹699" },
            ],
            workers: [
                { name: "Priya Mehta",   exp: "5 yrs", jobs: 610, rating: 4.9, avatar: "👩‍🦱" },
                { name: "Sunita Yadav",  exp: "4 yrs", jobs: 430, rating: 4.8, avatar: "👩‍🦰" },
                { name: "Rita Desai",    exp: "7 yrs", jobs: 520, rating: 4.9, avatar: "👩" },
            ]
        },
        {
            id: 4, name: "Carpenter Services", icon: "🛠️", category: "Carpenter",
            price: 499, rating: 4.6, eta: "35 min",
            desc: "Furniture repair, door/window fitting, custom furniture, wardrobe installation",
            subServices: [
                { icon: "🚪", title: "Door/Window Fitting", price: "₹349" },
                { icon: "🛏️", title: "Bed Assembly",        price: "₹449" },
                { icon: "🗄️", title: "Wardrobe Install",    price: "₹599" },
                { icon: "🪑", title: "Chair/Table Repair",  price: "₹249" },
                { icon: "🔨", title: "Custom Furniture",    price: "₹999+" },
                { icon: "🖼️", title: "Wall Mounting",       price: "₹199" },
            ],
            workers: [
                { name: "Mohan Thakor",  exp: "12 yrs", jobs: 390, rating: 4.8, avatar: "👷" },
                { name: "Dinesh Parmar", exp: "8 yrs",  jobs: 260, rating: 4.6, avatar: "🧑‍🔧" },
                { name: "Hitesh Shah",   exp: "6 yrs",  jobs: 210, rating: 4.5, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 5, name: "Painting Services", icon: "🎨", category: "Painter",
            price: 599, rating: 4.7, eta: "40 min",
            desc: "Interior wall painting, exterior painting, waterproofing, texture painting",
            subServices: [
                { icon: "🏠", title: "Interior Painting",   price: "₹1499" },
                { icon: "🏗️", title: "Exterior Painting",   price: "₹1999" },
                { icon: "💧", title: "Waterproofing",       price: "₹999" },
                { icon: "🖌️", title: "Texture Painting",    price: "₹1299" },
                { icon: "🚪", title: "Door/Window Paint",   price: "₹499" },
                { icon: "✨", title: "POP Work",            price: "₹799" },
            ],
            workers: [
                { name: "Rajesh Solanki", exp: "9 yrs", jobs: 310, rating: 4.8, avatar: "👷" },
                { name: "Kamlesh Barot",  exp: "7 yrs", jobs: 240, rating: 4.7, avatar: "🧑‍🔧" },
                { name: "Bhavesh Patel",  exp: "5 yrs", jobs: 180, rating: 4.6, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 6, name: "AC Repair & Service", icon: "❄️", category: "AC Repair",
            price: 549, rating: 4.8, eta: "20 min",
            desc: "AC servicing, gas refill, installation, cooling issue fix, AMC plans",
            subServices: [
                { icon: "❄️", title: "AC Servicing",        price: "₹549" },
                { icon: "⛽", title: "Gas Refill",          price: "₹799" },
                { icon: "🔧", title: "AC Installation",     price: "₹999" },
                { icon: "🌡️", title: "Cooling Issue Fix",   price: "₹399" },
                { icon: "📋", title: "AMC Plan (Annual)",   price: "₹1499" },
                { icon: "🧹", title: "Filter Cleaning",     price: "₹199" },
            ],
            workers: [
                { name: "Nilesh Rana",   exp: "7 yrs", jobs: 470, rating: 4.9, avatar: "👷" },
                { name: "Sachin Modi",   exp: "5 yrs", jobs: 310, rating: 4.8, avatar: "🧑‍🔧" },
                { name: "Pratik Dave",   exp: "4 yrs", jobs: 220, rating: 4.7, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 7, name: "Security Systems", icon: "🔒", category: "Security",
            price: 699, rating: 4.5, eta: "45 min",
            desc: "CCTV installation, alarm system, smart lock, video doorbell, security audit",
            subServices: [
                { icon: "📷", title: "CCTV Installation",   price: "₹1499" },
                { icon: "🔔", title: "Alarm System",        price: "₹999" },
                { icon: "🔐", title: "Smart Lock Install",  price: "₹1199" },
                { icon: "🔔", title: "Video Doorbell",      price: "₹799" },
                { icon: "🛡️", title: "Security Audit",      price: "₹499" },
                { icon: "📡", title: "Intercom Setup",      price: "₹699" },
            ],
            workers: [
                { name: "Kiran Joshi",   exp: "8 yrs", jobs: 260, rating: 4.7, avatar: "👷" },
                { name: "Tejas Pandya",  exp: "5 yrs", jobs: 180, rating: 4.5, avatar: "🧑‍🔧" },
                { name: "Maulik Shah",   exp: "6 yrs", jobs: 210, rating: 4.6, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 8, name: "Laundry & Dry Cleaning", icon: "🧺", category: "Laundry",
            price: 199, rating: 4.6, eta: "15 min",
            desc: "Wash & fold, dry cleaning, ironing, curtain/bedsheet wash, pickup & delivery",
            subServices: [
                { icon: "👕", title: "Wash & Fold",         price: "₹199" },
                { icon: "🧥", title: "Dry Cleaning",        price: "₹349" },
                { icon: "👔", title: "Steam Ironing",       price: "₹149" },
                { icon: "🛏️", title: "Bedsheet Wash",       price: "₹249" },
                { icon: "🪟", title: "Curtain Wash",        price: "₹299" },
                { icon: "🚚", title: "Pickup & Delivery",   price: "Free above ₹399" },
            ],
            workers: [
                { name: "Hetal Patel",   exp: "4 yrs", jobs: 380, rating: 4.7, avatar: "👩" },
                { name: "Rekha Shah",    exp: "6 yrs", jobs: 290, rating: 4.6, avatar: "👩‍🦱" },
                { name: "Meena Solanki", exp: "3 yrs", jobs: 170, rating: 4.5, avatar: "👩‍🦰" },
            ]
        },
        {
            id: 9, name: "Appliance Repair", icon: "📺", category: "Appliances",
            price: 449, rating: 4.7, eta: "30 min",
            desc: "Fridge, washing machine, microwave, oven, geyser repair",
            subServices: [
                { icon: "❄️", title: "Refrigerator Repair",  price: "₹449" },
                { icon: "🌀", title: "Washing Machine Repair",price: "₹399" },
                { icon: "📡", title: "Microwave Repair",     price: "₹299" },
                { icon: "🔥", title: "Oven Repair",          price: "₹349" },
                { icon: "🚿", title: "Geyser Repair",        price: "₹299" },
                { icon: "📺", title: "TV Repair",            price: "₹499" },
            ],
            workers: [
                { name: "Ashok Trivedi", exp: "10 yrs", jobs: 510, rating: 4.8, avatar: "👷" },
                { name: "Paresh Desai",  exp: "7 yrs",  jobs: 360, rating: 4.7, avatar: "🧑‍🔧" },
                { name: "Jignesh Patel", exp: "5 yrs",  jobs: 240, rating: 4.6, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 11, name: "Gas Technician", icon: "🔴", category: "Gas",
            price: 299, rating: 4.8, eta: "25 min",
            desc: "Gas pipeline repair, cylinder connection, gas stove service, leak detection, regulator replacement",
            subServices: [
                { icon: "🔍", title: "Gas Leak Detection",      price: "₹199" },
                { icon: "🛢️", title: "Cylinder Connection",     price: "₹149" },
                { icon: "🔧", title: "Gas Stove Repair",        price: "₹299" },
                { icon: "🔩", title: "Regulator Replacement",   price: "₹249" },
                { icon: "🪛",  title: "Pipeline Repair",        price: "₹399" },
                { icon: "🏠", title: "Full Gas Line Check",     price: "₹499" },
            ],
            workers: [
                { name: "Arvind Chauhan",   exp: "9 yrs", jobs: 380, rating: 4.9, avatar: "👷" },
                { name: "Mukesh Prajapati", exp: "6 yrs", jobs: 260, rating: 4.8, avatar: "🧑‍🔧" },
                { name: "Dinesh Rathod",    exp: "5 yrs", jobs: 190, rating: 4.7, avatar: "👨‍🔧" },
            ]
        },
        {
            id: 10, name: "Pest Control", icon: "🐜", category: "Pest Control",
            price: 799, rating: 4.8, eta: "30 min",
            desc: "Cockroach, termite, rodent, mosquito, bed bug treatment",
            subServices: [
                { icon: "🪳", title: "Cockroach Treatment",  price: "₹399" },
                { icon: "🐛", title: "Termite Treatment",    price: "₹799" },
                { icon: "🐭", title: "Rodent Control",       price: "₹599" },
                { icon: "🦟", title: "Mosquito Spray",       price: "₹349" },
                { icon: "🛏️", title: "Bed Bug Treatment",    price: "₹699" },
                { icon: "🏠", title: "Full Home Treatment",  price: "₹1299" },
            ],
            workers: [
                { name: "Haresh Rathod", exp: "8 yrs", jobs: 430, rating: 4.9, avatar: "👷" },
                { name: "Yogesh Baria",  exp: "5 yrs", jobs: 280, rating: 4.8, avatar: "🧑‍🔧" },
                { name: "Dipak Vasava",  exp: "6 yrs", jobs: 310, rating: 4.7, avatar: "👨‍🔧" },
            ]
        },
    ];

    let currentCategory = "all";

    // ─── DOM REFS ────────────────────────────────────────────────────
    const cardsGrid    = document.getElementById("serviceCardsGrid");
    const resultsCount = document.getElementById("resultsCount");
    const overlay      = document.getElementById("detailOverlay");
    const detailClose  = document.getElementById("detailClose");

    // ─── RENDER CARDS ────────────────────────────────────────────────
    function renderCards() {
        let filtered = currentCategory === "all"
            ? [...servicesData]
            : servicesData.filter(s => s.category === currentCategory);

        resultsCount.innerText = `Showing ${filtered.length} service${filtered.length !== 1 ? 's' : ''}`;

        if (filtered.length === 0) {
            cardsGrid.innerHTML = `<div class="no-results">😕 No services found.</div>`;
            return;
        }

        cardsGrid.innerHTML = filtered.map(s => `
            <div class="service-card" data-id="${s.id}">
                <div class="card-icon">${s.icon}</div>
                <div class="card-content">
                    <h3 class="card-title">${s.name}</h3>
                    <p class="card-desc">${s.desc.substring(0, 90)}${s.desc.length > 90 ? '...' : ''}</p>
                    <div class="card-footer">
                        <div class="card-price">₹${s.price} <span>/ visit</span></div>
                        <div class="card-rating">⭐ ${s.rating}</div>
                        <button class="book-btn" data-id="${s.id}">View Details →</button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.service-card, .book-btn').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = parseInt(el.closest('[data-id]').getAttribute('data-id'));
                openDetail(id);
            });
        });
    }

    // ─── OPEN DETAIL MODAL ───────────────────────────────────────────
    function openDetail(id) {
        const s = servicesData.find(x => x.id === id);
        if (!s) return;

        document.getElementById('dIcon').textContent   = s.icon;
        document.getElementById('dName').textContent   = s.name;
        document.getElementById('dDesc').textContent   = s.desc;
        document.getElementById('dPrice').textContent  = `💰 Starting ₹${s.price}`;
        document.getElementById('dRating').textContent = `⭐ ${s.rating} Rating`;
        document.getElementById('dEta').textContent    = `⚡ Arrives in ${s.eta}`;

        document.getElementById('dSubServices').innerHTML = s.subServices.map(sub => `
            <div class="sub-card">
                <span class="sub-icon">${sub.icon}</span>
                <div class="sub-info">
                    <div class="sub-title">${sub.title}</div>
                    <div class="sub-price">${sub.price}</div>
                </div>
                <button class="sub-book-btn">Book</button>
            </div>
        `).join('');

        document.getElementById('dWorkers').innerHTML = s.workers.map(w => `
            <div class="worker-card">
                <div class="worker-avatar">${w.avatar}</div>
                <div class="worker-info">
                    <div class="worker-name">${w.name}</div>
                    <div class="worker-meta">
                        <span class="wmeta">⭐ ${w.rating}</span>
                        <span class="wmeta">💼 ${w.exp} exp</span>
                        <span class="wmeta">✅ ${w.jobs} jobs</span>
                    </div>
                </div>
                <button class="worker-book-btn" onclick="alert('Booking with ${w.name}!\\n📞 We will call you within 30 minutes.')">Book Now</button>
            </div>
        `).join('');

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    detailClose.addEventListener('click', closeDetail);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeDetail();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetail();
    });

    // ─── CATEGORY BUTTONS ────────────────────────────────────────────
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderCards();
            closeFilterSidebar();
        });
    });

    // ─── MOBILE FILTER SIDEBAR ───────────────────────────────────────
    const filtersSidebar = document.getElementById('filtersSidebar');
    const filterToggle   = document.getElementById('filterToggle');
    const filterOverlay  = document.getElementById('filterOverlay');
    const sidebarClose   = document.getElementById('sidebarClose');

    function openFilterSidebar() {
        filtersSidebar.classList.add('open');
        filterOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFilterSidebar() {
        filtersSidebar.classList.remove('open');
        filterOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (filterToggle) filterToggle.addEventListener('click', openFilterSidebar);
    if (filterOverlay) filterOverlay.addEventListener('click', closeFilterSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeFilterSidebar);

    // ─── NAVBAR / MOBILE DRAWER ──────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const drawer    = document.getElementById('mobileDrawer');
    const mobileOv  = document.getElementById('mobileOverlay');
    const closeBtn  = document.getElementById('drawerClose');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            drawer.classList.add('open');
            mobileOv.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeDrawer() {
        if (drawer) drawer.classList.remove('open');
        if (mobileOv) mobileOv.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (mobileOv) mobileOv.addEventListener('click', closeDrawer);

    // ─── USER MENU DROPDOWN ──────────────────────────────────────────
    const userMenu     = document.getElementById('userMenu');
    const userTrigger  = document.getElementById('userTrigger');
    const userDropdown = document.getElementById('userDropdown');

    if (userTrigger && userMenu && userDropdown) {
        userTrigger.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = userDropdown.classList.contains('open');
            userMenu.classList.toggle('open', !isOpen);
            userDropdown.classList.toggle('open', !isOpen);
        });

        document.addEventListener('click', function () {
            userMenu.classList.remove('open');
            userDropdown.classList.remove('open');
        });

        userDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                userMenu.classList.remove('open');
                userDropdown.classList.remove('open');
            }
        });
    }

    // ─── SCROLL EFFECT ───────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ─── INITIAL RENDER ──────────────────────────────────────────────
    renderCards();
});