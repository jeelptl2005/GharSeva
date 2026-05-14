// hero.js — GharSeva Hero Section
// Place in: static/js/hero.js  |  Load BEFORE script.js

(function () {

    const SERVICES = [
        { name: "Plumber",          icon: "🔧", cat: "Plumbing",    price: "₹199+", time: "20",  rating: "4.9" },
        { name: "Electrician",      icon: "⚡", cat: "Electrical",  price: "₹249+", time: "25",  rating: "4.8" },
        { name: "Home Cleaning",    icon: "🧹", cat: "Cleaning",    price: "₹399+", time: "30",  rating: "4.9" },
        { name: "Carpenter",        icon: "🛠️", cat: "Carpentry",   price: "₹299+", time: "35",  rating: "4.7" },
        { name: "Painter",          icon: "🎨", cat: "Painting",    price: "₹499+", time: "40",  rating: "4.8" },
        { name: "AC Repair",        icon: "❄️", cat: "AC",          price: "₹349+", time: "20",  rating: "4.9" },
        { name: "Security",         icon: "🔒", cat: "Security",    price: "₹599+", time: "45",  rating: "4.7" },
        { name: "Laundry",          icon: "🧺", cat: "Laundry",     price: "₹149+", time: "15",  rating: "4.6" },
        { name: "Appliance Repair", icon: "📺", cat: "Appliances",  price: "₹279+", time: "30",  rating: "4.8" },
        { name: "Pest Control",     icon: "🐜", cat: "Pest",        price: "₹449+", time: "30",  rating: "4.7" }
    ];

    document.addEventListener("DOMContentLoaded", function () {
        initHeroSearch();
    });

    function initHeroSearch() {
        const input    = document.getElementById("hsSearchInput");
        const clearBtn = document.getElementById("hsClearBtn");
        const sugBox   = document.getElementById("hsSuggestions");
        const bookBtn  = document.getElementById("hsBookBtn");

        if (!input) return;

        // Global — chips use this
        window.hsSetSearch = function (name) {
            input.value = name;
            clearBtn.classList.add("visible");
            renderSuggestions(name);
            input.focus();
        };

        input.addEventListener("input", function () {
            clearBtn.classList.toggle("visible", !!input.value.trim());
            renderSuggestions(input.value.trim());
        });

        input.addEventListener("focus", function () {
            if (input.value.trim()) renderSuggestions(input.value.trim());
        });

        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") doSearch();
        });

        clearBtn.addEventListener("click", function () {
            input.value = "";
            clearBtn.classList.remove("visible");
            hideSuggestions();
            input.focus();
        });

        document.addEventListener("click", function (e) {
            if (!e.target.closest("#hsSearchWrap") && !e.target.closest("#hsSuggestions")) {
                hideSuggestions();
            }
        });

        bookBtn.addEventListener("click", doSearch);

        function doSearch() {
            const q = input.value.trim();
            if (!q) {
                const wrap = input.closest(".hs-search-wrap");
                wrap.classList.add("hs-shake");
                setTimeout(() => wrap.classList.remove("hs-shake"), 500);
                input.focus();
                return;
            }
            // Redirect to service page with search query
            window.location.href = "/service?q=" + encodeURIComponent(q);
        }

        function findService(q) {
            const lq = q.toLowerCase();
            return SERVICES.find(s => s.name.toLowerCase() === lq || s.cat.toLowerCase() === lq)
                || SERVICES.find(s => s.name.toLowerCase().includes(lq) || s.cat.toLowerCase().includes(lq))
                || null;
        }

        function renderSuggestions(q) {
            if (!q) { hideSuggestions(); return; }
            const lq = q.toLowerCase();
            const results = SERVICES.filter(s =>
                s.name.toLowerCase().includes(lq) || s.cat.toLowerCase().includes(lq)
            ).slice(0, 6);

            if (!results.length) { hideSuggestions(); return; }

            sugBox.innerHTML = results.map(s => `
                <div class="hs-sug-item" data-name="${s.name}">
                    <span class="hs-sug-emoji">${s.icon}</span>
                    <div class="hs-sug-info">
                        <div class="hs-sug-name">${s.name}</div>
                        <div class="hs-sug-cat">${s.cat} &bull; &#11088; ${s.rating}</div>
                    </div>
                    <span class="hs-sug-price">${s.price}</span>
                </div>
            `).join("");

            sugBox.querySelectorAll(".hs-sug-item").forEach(item => {
                item.addEventListener("click", function () {
                    hideSuggestions();
                    window.location.href = "/service?q=" + encodeURIComponent(item.dataset.name);
                });
            });

            sugBox.classList.add("open");
        }

        function hideSuggestions() {
            sugBox.classList.remove("open");
        }
    }

})();