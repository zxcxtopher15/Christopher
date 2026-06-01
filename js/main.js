/* =========================================================
   John Christopher Olalia — Portfolio interactions
   ========================================================= */
(function () {
	"use strict";

	/* ---------- Year ---------- */
	var yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	/* ---------- Typing effect ---------- */
	var typed = document.getElementById("typed");
	if (typed) {
		var roles = [
			"web systems.",
			"Android apps.",
			"Java software.",
			"clean code.",
			"real solutions.",
		];
		var rIdx = 0, cIdx = 0, deleting = false;

		function tick() {
			var word = roles[rIdx];
			typed.textContent = word.substring(0, cIdx);

			if (!deleting && cIdx < word.length) {
				cIdx++;
				setTimeout(tick, 90);
			} else if (!deleting && cIdx === word.length) {
				deleting = true;
				setTimeout(tick, 1600);
			} else if (deleting && cIdx > 0) {
				cIdx--;
				setTimeout(tick, 45);
			} else {
				deleting = false;
				rIdx = (rIdx + 1) % roles.length;
				setTimeout(tick, 350);
			}
		}
		tick();
	}

	/* ---------- Nav scroll state + back-to-top ---------- */
	var nav = document.getElementById("nav");
	var toTop = document.getElementById("to-top");

	function onScroll() {
		var y = window.scrollY;
		if (nav) nav.classList.toggle("scrolled", y > 24);
		if (toTop) toTop.classList.toggle("show", y > 600);
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	if (toTop) {
		toTop.addEventListener("click", function () {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	/* ---------- Mobile menu ---------- */
	var menuBtn = document.getElementById("menu-btn");
	var mobileMenu = document.getElementById("mobile-menu");
	if (menuBtn && mobileMenu) {
		menuBtn.addEventListener("click", function () {
			mobileMenu.classList.toggle("hidden");
			var icon = menuBtn.querySelector("i");
			icon.className = mobileMenu.classList.contains("hidden")
				? "fa-solid fa-bars"
				: "fa-solid fa-xmark";
		});
		mobileMenu.querySelectorAll(".mobile-link").forEach(function (link) {
			link.addEventListener("click", function () {
				mobileMenu.classList.add("hidden");
				menuBtn.querySelector("i").className = "fa-solid fa-bars";
			});
		});
	}

	/* ---------- Active nav link via IntersectionObserver ---------- */
	var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
	var sections = navLinks
		.map(function (l) { return document.querySelector(l.getAttribute("href")); })
		.filter(Boolean);

	if ("IntersectionObserver" in window && sections.length) {
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) {
					var id = "#" + e.target.id;
					navLinks.forEach(function (l) {
						l.classList.toggle("active", l.getAttribute("href") === id);
					});
				}
			});
		}, { rootMargin: "-45% 0px -50% 0px" });
		sections.forEach(function (s) { spy.observe(s); });
	}

	/* ---------- Reveal on scroll ---------- */
	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		var revObs = new IntersectionObserver(function (entries, obs) {
			entries.forEach(function (e) {
				if (e.isIntersecting) {
					e.target.classList.add("visible");
					obs.unobserve(e.target);
				}
			});
		}, { threshold: 0.12 });
		reveals.forEach(function (el) { revObs.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add("visible"); });
	}

	/* ---------- Project modals ---------- */
	var openTriggers = document.querySelectorAll("[data-modal]");
	var lastFocused = null;

	function openModal(id) {
		var modal = document.getElementById(id);
		if (!modal) return;
		lastFocused = document.activeElement;
		modal.classList.add("open");
		document.body.style.overflow = "hidden";
		var closeBtn = modal.querySelector(".modal-close");
		if (closeBtn) closeBtn.focus();
	}

	function closeModal(modal) {
		modal.classList.remove("open");
		document.body.style.overflow = "";
		if (lastFocused) lastFocused.focus();
	}

	openTriggers.forEach(function (btn) {
		btn.addEventListener("click", function () {
			openModal(btn.getAttribute("data-modal"));
		});
	});

	document.querySelectorAll(".modal").forEach(function (modal) {
		modal.querySelectorAll("[data-close]").forEach(function (el) {
			el.addEventListener("click", function () { closeModal(modal); });
		});
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			var open = document.querySelector(".modal.open");
			if (open) closeModal(open);
		}
	});
})();
