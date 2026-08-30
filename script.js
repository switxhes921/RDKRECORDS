document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  window.setTimeout(() => loader.classList.add("is-done"), 800);

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open navigation");
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const timer = document.querySelector(".drop-timer");
  const target = timer?.dataset.target || "2026-12-01T00:00:00-05:00";
  const updateTimer = () => {
    const diff = new Date(target).getTime() - Date.now();
    const safe = Math.max(0, diff);
    const sec = Math.floor(safe / 1000);
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value).padStart(2, "0");
    };
    set("days", Math.floor(sec / 86400));
    set("hours", Math.floor((sec % 86400) / 3600));
    set("minutes", Math.floor((sec % 3600) / 60));
    set("seconds", sec % 60);
  };
  updateTimer();
  window.setInterval(updateTimer, 1000);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
