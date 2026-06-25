/* =========================================================================
   AKBAR TIKKA SHOP — SCRIPT
   --------------------------------------------------------------------
   Plain vanilla JS, no dependencies. Organised into clearly labelled
   sections so a beginner can find and edit what they need.
   ========================================================================= */

(function () {
  "use strict";

  /* =======================================================================
     0. CONFIG — EDIT THESE VALUES FOR YOUR RESTAURANT
     ======================================================================= */
  const CONFIG = {
    // REPLACE with the real WhatsApp business number.
    // Format: country code + number, digits only, no +, no spaces.
    whatsappNumber: "923126285603",
    orderIdPrefix: "AKB",
  };

  /* =======================================================================
     1. MENU DATA
     --------------------------------------------------------------------
     ⚠ REPLACE THIS DATA with your real menu. Each item needs:
       id (unique), name, category, price (number, in Rs.), desc, img
     Categories shown in the filter bar are generated automatically
     from whatever category strings you use here.
     ======================================================================= */
  const MENU_DATA = [
    // ---- Chicken Tikka ----
    { id: "ct1", category: "Chicken Tikka", name: "Chicken Tikka (Full)", price: 850, desc: "Charcoal-grilled chicken leg piece, our signature marinade.", img: "https://placehold.co/600x450/2B2118/E2B45C?text=Chicken+Tikka" },
    { id: "ct2", category: "Chicken Tikka", name: "Chicken Tikka (Half)", price: 450, desc: "Half portion of our signature charcoal chicken tikka.", img: "https://placehold.co/600x450/2B2118/E2B45C?text=Chicken+Tikka" },
    { id: "ct3", category: "Chicken Tikka", name: "Chicken Boti (per kg)", price: 1100, desc: "Boneless chicken boti skewers, smoky and tender.", img: "https://placehold.co/600x450/2B2118/E2B45C?text=Chicken+Boti" },

    // ---- Malai Boti ----
    { id: "mb1", category: "Malai Boti", name: "Malai Boti (per kg)", price: 1400, desc: "Creamy, mildly spiced boneless chicken — a customer favourite.", img: "https://placehold.co/600x450/3B2E22/F0962E?text=Malai+Boti" },
    { id: "mb2", category: "Malai Boti", name: "Malai Boti (Half kg)", price: 750, desc: "Half kg portion of our signature malai boti.", img: "https://placehold.co/600x450/3B2E22/F0962E?text=Malai+Boti" },

    // ---- Seekh Kabab ----
    { id: "sk1", category: "Seekh Kabab", name: "Beef Seekh Kabab (4 pc)", price: 480, desc: "Hand-skewered minced beef kabab, grilled over charcoal.", img: "https://placehold.co/600x450/2B2118/B3231A?text=Seekh+Kabab" },
    { id: "sk2", category: "Seekh Kabab", name: "Chicken Seekh Kabab (4 pc)", price: 420, desc: "Juicy minced chicken kabab with house spices.", img: "https://placehold.co/600x450/2B2118/B3231A?text=Seekh+Kabab" },

    // ---- Chicken Karahi ----
    { id: "kk1", category: "Chicken Karahi", name: "Chicken Karahi (Half kg)", price: 950, desc: "Traditional tomato-based karahi, cooked to order.", img: "https://placehold.co/600x450/7E160F/FBF4E8?text=Chicken+Karahi" },
    { id: "kk2", category: "Chicken Karahi", name: "Chicken Karahi (Full kg)", price: 1750, desc: "Full kg of our classic chicken karahi.", img: "https://placehold.co/600x450/7E160F/FBF4E8?text=Chicken+Karahi" },

    // ---- Beef Items ----
    { id: "bf1", category: "Beef Items", name: "Beef Chapli Kabab (2 pc)", price: 420, desc: "Spiced flat beef kabab, Peshawari style.", img: "https://placehold.co/600x450/231A12/D9730D?text=Beef+Chapli" },
    { id: "bf2", category: "Beef Items", name: "Beef Boti (per kg)", price: 1500, desc: "Tender charcoal-grilled beef boti skewers.", img: "https://placehold.co/600x450/231A12/D9730D?text=Beef+Boti" },

    // ---- BBQ Platters ----
    { id: "pl1", category: "BBQ Platters", name: "Mixed Grill Platter", price: 1899, desc: "Chicken tikka, seekh kabab, malai boti &amp; naan for 2-3 people.", img: "https://placehold.co/600x450/150F0C/C9972F?text=BBQ+Platter" },
    { id: "pl2", category: "BBQ Platters", name: "Family BBQ Platter", price: 3499, desc: "A generous mix of all our grills, serves 4-5 people.", img: "https://placehold.co/600x450/150F0C/C9972F?text=BBQ+Platter" },

    // ---- Family Deals ----
    { id: "fd1", category: "Family Deals", name: "Family Deal 1", price: 2699, desc: "1kg chicken tikka, 0.5kg seekh kabab, 4 naan, raita &amp; drink.", img: "https://placehold.co/600x450/B3231A/FBF4E8?text=Family+Deal" },
    { id: "fd2", category: "Family Deals", name: "Family Deal 2", price: 3999, desc: "Mixed grill, karahi, naan &amp; drinks for 5-6 people.", img: "https://placehold.co/600x450/B3231A/FBF4E8?text=Family+Deal" },

    // ---- Drinks ----
    { id: "dr1", category: "Drinks", name: "Soft Drink (Regular)", price: 100, desc: "Chilled regular bottle.", img: "https://placehold.co/600x450/0F0C0A/D9730D?text=Drink" },
    { id: "dr2", category: "Drinks", name: "Soft Drink (1.5L)", price: 220, desc: "Large bottle, great for sharing.", img: "https://placehold.co/600x450/0F0C0A/D9730D?text=Drink" },
    { id: "dr3", category: "Drinks", name: "Fresh Lemonade", price: 150, desc: "House-made fresh lemonade.", img: "https://placehold.co/600x450/0F0C0A/D9730D?text=Lemonade" },

    // ---- Desserts ----
    { id: "ds1", category: "Desserts", name: "Gajar Halwa", price: 180, desc: "Warm carrot halwa, served with a scoop of khoya.", img: "https://placehold.co/600x450/C9972F/231A12?text=Dessert" },
    { id: "ds2", category: "Desserts", name: "Kheer", price: 160, desc: "Traditional rice pudding, chilled and creamy.", img: "https://placehold.co/600x450/C9972F/231A12?text=Dessert" },
  ];
  // ⚠ ADD MORE ITEMS by copying an object above and giving it a unique id.

  /* =======================================================================
     2. STATE
     ======================================================================= */
  let cart = [];               // [{id, name, price, qty}]
  let activeCategory = "All";
  let searchTerm = "";
  let galleryImages = [];      // populated on load for lightbox nav
  let currentLightboxIndex = 0;

  /* =======================================================================
     3. DOM READY
     ======================================================================= */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    document.getElementById("footerYear").textContent = new Date().getFullYear();

    setupTheme();
    setupNav();
    setupHeroEmbers();
    renderMenuCategories();
    renderMenu();
    setupMenuControls();
    setupDealButtons();
    setupCounters();
    setupGalleryAndLightbox();
    setupFAQ();
    setupCart();
    setupCheckoutForm();
    setupReservationForm();
    setupBackToTop();
    setupScrollReveal();
    setupSpecialBanner();
  }

  /* =======================================================================
     4. DARK MODE TOGGLE
     ======================================================================= */
  function setupTheme() {
    const toggle = document.getElementById("themeToggle");
    const saved = localStorage.getItem("akbar-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      toggle.setAttribute("aria-pressed", "true");
    }
    toggle.addEventListener("click", function () {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("akbar-theme", "light");
        toggle.setAttribute("aria-pressed", "false");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("akbar-theme", "dark");
        toggle.setAttribute("aria-pressed", "true");
      }
    });
  }

  /* =======================================================================
     5. NAVIGATION (sticky highlight + mobile hamburger)
     ======================================================================= */
  function setupNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile menu after clicking a link
    menu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Highlight active section on scroll
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const onScroll = throttle(function () {
      let currentId = sections[0] ? sections[0].id : "";
      sections.forEach(function (sec) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120) currentId = sec.id;
      });
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
      });
    }, 150);
    window.addEventListener("scroll", onScroll);

    // Order Now buttons open the cart drawer
    document.getElementById("navOrderBtn").addEventListener("click", openCart);
    document.getElementById("heroOrderBtn").addEventListener("click", openCart);
  }

  /* =======================================================================
     6. HERO EMBER PARTICLES (decorative, lightweight)
     ======================================================================= */
  function setupHeroEmbers() {
    const container = document.getElementById("heroEmbers");
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = window.innerWidth < 700 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const ember = document.createElement("span");
      ember.className = "ember";
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 6;
      const delay = Math.random() * 8;
      const drift = (Math.random() * 60 - 30) + "px";
      ember.style.left = left + "%";
      ember.style.animationDuration = duration + "s";
      ember.style.animationDelay = delay + "s";
      ember.style.setProperty("--drift", drift);
      container.appendChild(ember);
    }
  }

  /* =======================================================================
     7. MENU RENDERING + FILTER + SEARCH
     ======================================================================= */
  function renderMenuCategories() {
    const wrap = document.getElementById("menuCategories");
    const categories = ["All"].concat(
      Array.from(new Set(MENU_DATA.map(function (i) { return i.category; })))
    );
    wrap.innerHTML = categories
      .map(function (cat, idx) {
        return (
          '<button class="menu-cat-btn' + (idx === 0 ? " active" : "") + '" role="tab" aria-selected="' +
          (idx === 0 ? "true" : "false") + '" data-cat="' + escapeHtml(cat) + '">' +
          escapeHtml(cat) + "</button>"
        );
      })
      .join("");

    wrap.addEventListener("click", function (e) {
      const btn = e.target.closest(".menu-cat-btn");
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      wrap.querySelectorAll(".menu-cat-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      renderMenu();
    });
  }

  function setupMenuControls() {
    const search = document.getElementById("menuSearch");
    search.addEventListener("input", debounce(function () {
      searchTerm = search.value.trim().toLowerCase();
      renderMenu();
    }, 200));
  }

  function renderMenu() {
    const grid = document.getElementById("menuGrid");
    const empty = document.getElementById("menuEmpty");

    const filtered = MENU_DATA.filter(function (item) {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.desc.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    grid.innerHTML = filtered
      .map(function (item) {
        return (
          '<article class="menu-card">' +
          '<div class="menu-card__img-wrap"><img src="' + item.img + '" alt="' + escapeHtml(item.name) + '" loading="lazy" width="600" height="450"></div>' +
          '<div class="menu-card__body">' +
          '<h3 class="menu-card__name">' + escapeHtml(item.name) + "</h3>" +
          '<p class="menu-card__desc">' + item.desc + "</p>" +
          '<div class="menu-card__footer">' +
          '<span class="menu-card__price">Rs. ' + item.price.toLocaleString() + "</span>" +
          '<button class="menu-card__add" data-add-item="' + item.id + '" aria-label="Add ' + escapeHtml(item.name) + ' to cart">+</button>' +
          "</div></div></article>"
        );
      })
      .join("");

    grid.querySelectorAll("[data-add-item]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = MENU_DATA.find(function (i) { return i.id === btn.dataset.addItem; });
        if (item) addToCart(item.id, item.name, item.price);
      });
    });

    observeRevealTargets();
  }

  /* =======================================================================
     8. DEAL BUTTONS (Special Deals section)
     ======================================================================= */
  function setupDealButtons() {
    document.querySelectorAll("[data-add-deal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addToCart(
          "deal-" + slugify(btn.dataset.dealName),
          btn.dataset.dealName,
          Number(btn.dataset.dealPrice)
        );
      });
    });
  }

  function setupSpecialBanner() {
    document.querySelectorAll("[data-add-special]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addToCart("today-special", "Malai Boti Platter for Two", 999);
      });
    });
  }

  /* =======================================================================
     9. CART LOGIC
     ======================================================================= */
  function addToCart(id, name, price) {
    const existing = cart.find(function (c) { return c.id === id; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: id, name: name, price: price, qty: 1 });
    }
    renderCart();
    showToast(name + " added to cart");
  }

  function changeQty(id, delta) {
    const item = cart.find(function (c) { return c.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(function (c) { return c.id !== id; });
    }
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(function (c) { return c.id !== id; });
    renderCart();
  }

  function cartTotal() {
    return cart.reduce(function (sum, c) { return sum + c.price * c.qty; }, 0);
  }

  function renderCart() {
    const itemsEl = document.getElementById("cartItems");
    const emptyEl = document.getElementById("cartEmpty");
    const badge = document.getElementById("cartBadge");
    const subtotalEl = document.getElementById("cartSubtotal");
    const totalEl = document.getElementById("cartTotal");

    if (cart.length === 0) {
      itemsEl.innerHTML = "";
      emptyEl.hidden = false;
    } else {
      emptyEl.hidden = true;
      itemsEl.innerHTML = cart
        .map(function (c) {
          return (
            '<li class="cart-item">' +
            '<div><p class="cart-item__name">' + escapeHtml(c.name) + '</p>' +
            '<p class="cart-item__price">Rs. ' + c.price.toLocaleString() + " each</p></div>" +
            '<div class="cart-item__qty">' +
            '<button data-qty-down="' + c.id + '" aria-label="Decrease quantity">−</button>' +
            '<span>' + c.qty + '</span>' +
            '<button data-qty-up="' + c.id + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<button class="cart-item__remove" data-remove="' + c.id + '" aria-label="Remove item">Remove</button>' +
            '</li>'
          );
        })
        .join("");

      itemsEl.querySelectorAll("[data-qty-up]").forEach(function (b) {
        b.addEventListener("click", function () { changeQty(b.dataset.qtyUp, 1); });
      });
      itemsEl.querySelectorAll("[data-qty-down]").forEach(function (b) {
        b.addEventListener("click", function () { changeQty(b.dataset.qtyDown, -1); });
      });
      itemsEl.querySelectorAll("[data-remove]").forEach(function (b) {
        b.addEventListener("click", function () { removeFromCart(b.dataset.remove); });
      });
    }

    const total = cartTotal();
    subtotalEl.textContent = "Rs. " + total.toLocaleString();
    totalEl.textContent = "Rs. " + total.toLocaleString();

    const count = cart.reduce(function (sum, c) { return sum + c.qty; }, 0);
    badge.hidden = count === 0;
    badge.textContent = String(count);
  }

  function setupCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    const openBtn = document.getElementById("cartFab");
    const closeBtn = document.getElementById("cartClose");

    openBtn.addEventListener("click", openCart);
    closeBtn.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeCart();
    });

    renderCart();

    function openCartLocal() {
      drawer.hidden = false;
      overlay.hidden = false;
      requestAnimationFrame(function () { drawer.classList.add("open"); });
    }
    window.__openCartLocal = openCartLocal;
  }

  function openCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    drawer.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add("open"); });
  }
  function closeCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    drawer.classList.remove("open");
    setTimeout(function () {
      drawer.hidden = true;
      overlay.hidden = true;
    }, 300);
  }

  /* =======================================================================
     10. CHECKOUT → WHATSAPP ORDER MESSAGE
     --------------------------------------------------------------------
     This builds a structured order summary and opens WhatsApp with it
     pre-filled. The business owner just needs to set CONFIG.whatsappNumber
     above to their real number.
     ======================================================================= */
  function generateOrderId() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return CONFIG.orderIdPrefix + "-" + year + "-" + random;
  }

  function setupCheckoutForm() {
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (cart.length === 0) {
        showToast("Your cart is empty — add something first!");
        return;
      }

      const name = document.getElementById("custName").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const address = document.getElementById("custAddress").value.trim();
      const notes = document.getElementById("custNotes").value.trim();

      if (!name || !phone || !address) {
        showToast("Please fill in name, phone and address.");
        return;
      }

      const orderId = generateOrderId();
      const now = new Date();
      const dateStr = pad2(now.getDate()) + "/" + pad2(now.getMonth() + 1) + "/" + now.getFullYear();
      const timeStr = pad2(now.getHours()) + ":" + pad2(now.getMinutes());

      const itemLines = cart
        .map(function (c) { return c.qty + "x " + c.name; })
        .join("\n");

      const message =
        "================================\n" +
        "AKBAR TIKKA SHOP ORDER\n" +
        "======================\n\n" +
        "Order ID:\n" + orderId + "\n\n" +
        "Customer Name:\n" + name + "\n\n" +
        "Phone:\n" + phone + "\n\n" +
        "Address:\n" + address + "\n\n" +
        "Items:\n\n" + itemLines + "\n\n" +
        "Total:\nRs. " + cartTotal().toLocaleString() + "\n\n" +
        "Special Instructions:\n" + (notes || "None") + "\n\n" +
        "Date:\n" + dateStr + "\n\n" +
        "Time:\n" + timeStr + "\n" +
        "================================";

      const url = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener");

      // Reset cart + form after sending
      cart = [];
      renderCart();
      form.reset();
      closeCart();
      showToast("Order " + orderId + " sent on WhatsApp!");
    });
  }

  /* =======================================================================
     11. RESERVATION FORM → WHATSAPP MESSAGE
     ======================================================================= */
  function setupReservationForm() {
    const form = document.getElementById("reservationForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("resName").value.trim();
      const phone = document.getElementById("resPhone").value.trim();
      const date = document.getElementById("resDate").value;
      const time = document.getElementById("resTime").value;
      const guests = document.getElementById("resGuests").value;
      const notes = document.getElementById("resNotes").value.trim();

      const message =
        "Table Reservation Request — Akbar Tikka Shop\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time + "\n" +
        "Guests: " + guests + "\n" +
        "Notes: " + (notes || "None");

      const url = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener");
      form.reset();
      showToast("Reservation request sent on WhatsApp!");
    });
  }

  /* =======================================================================
     12. ANIMATED COUNTERS
     ======================================================================= */
  function setupCounters() {
    const counters = document.querySelectorAll(".stat__num");
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = String(target).includes(".");
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* =======================================================================
     13. GALLERY + LIGHTBOX
     ======================================================================= */
  function setupGalleryAndLightbox() {
    const items = Array.from(document.querySelectorAll(".gallery-item img"));
    galleryImages = items.map(function (img) {
      return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
    });

    console.log(items)

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    // DIDN'T DO ANYHTING:
    // items.forEach(function (img, idx) {
    //   img.closest(".gallery-item").addEventListener("click", function () {
    //     openLightbox(idx);
    //     console.log("does it work at the start?")
    //   });
    // });

    function openLightbox(idx) {
      currentLightboxIndex = idx;
      lightbox.hidden = false;
      updateLightboxImage();
    }

    // Fixed blank image at opening
    openLightbox(0)

    function updateLightboxImage() {
      const data = galleryImages[currentLightboxIndex];
      console.log(data)
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt || "";
    }
    closeBtn.addEventListener("click", function () { lightbox.hidden = true; lightbox.style.display = "none" });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.hidden = true;
    });
    prevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    });
    nextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
      updateLightboxImage();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") lightbox.hidden = true;
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });
  }

  /* =======================================================================
     14. FAQ ACCORDION
     ======================================================================= */
  function setupFAQ() {
    document.querySelectorAll(".faq-item__q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".faq-item");
        const answer = item.querySelector(".faq-item__a");
        const isOpen = item.getAttribute("data-open") === "true";

        // Close all others (accordion behaviour)
        document.querySelectorAll(".faq-item").forEach(function (i) {
          i.setAttribute("data-open", "false");
          i.querySelector(".faq-item__a").style.maxHeight = null;
          i.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.setAttribute("data-open", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* =======================================================================
     15. BACK TO TOP BUTTON
     ======================================================================= */
  function setupBackToTop() {
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", throttle(function () {
      btn.hidden = window.scrollY < 500;
    }, 200));
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =======================================================================
     16. SCROLL REVEAL ANIMATIONS
     ======================================================================= */
  let revealObserver;
  function setupScrollReveal() {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(
      ".menu-section .section-head, .gallery .section-head, .about, .faq .section-head, .deal-card, .testimonial-card"
    ).forEach(function (el) {
      el.setAttribute("data-aos", "");
      revealObserver.observe(el);
    });
  }
  function observeRevealTargets() {
    if (!revealObserver) return;
    document.querySelectorAll(".menu-card[data-aos]").forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* =======================================================================
     17. TOAST NOTIFICATIONS
     ======================================================================= */
  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  /* =======================================================================
     18. UTILITIES
     ======================================================================= */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function slugify(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  function pad2(n) { return String(n).padStart(2, "0"); }
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      const args = arguments;
      t = setTimeout(function () { fn.apply(null, args); }, wait);
    };
  }
  function throttle(fn, wait) {
    let last = 0;
    return function () {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(null, arguments);
      }
    };
  }
})();
