(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");

  // Light mode is the default on a first visit. A theme is remembered only
  // after the visitor actively changes it with the button.
  const savedTheme = (() => {
    try { return localStorage.getItem("portfolio-theme"); }
    catch (_) { return null; }
  })();

  function applyTheme(theme, save = false) {
    const dark = theme === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(dark));
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      themeToggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", !dark);
      themeIcon.classList.toggle("fa-sun", dark);
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", dark ? "#0c1420" : "#ffffff");

    if (save) {
      try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); }
      catch (_) { /* The site still works when storage is unavailable. */ }
    }
  }

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  function closeMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  menuToggle?.addEventListener("click", () => {
    if (!mainNav) return;
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
