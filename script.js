const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) {
        document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
        active.classList.add("active");
      }
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll(".preview-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    showToast("Preview only — submissions are not connected or saved yet.");
  });
});

document.getElementById("loginButton").addEventListener("click", () => {
  showToast("Roblox login will be enabled after secure authentication is configured.");
});

// The player count is intentionally not fabricated. Connect a trusted backend endpoint here.
document.getElementById("playerStatus").textContent = "AWAITING SECURE PLAYER-COUNT CONNECTION";
