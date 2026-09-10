// Dark / Light Theme Toggle with LocalStorage persistence
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// const savedTheme = localStorage.getItem("theme") || 
//   (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const savedTheme = localStorage.getItem("theme") || "light";

html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀" : "◐";
  }
}

// Active link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Interactive Timeline Node Click on Mobile/Touch
const timelineNodes = document.querySelectorAll(".timeline-node");
timelineNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const wasActive = node.classList.contains("active");
    timelineNodes.forEach((n) => n.classList.remove("active"));
    if (!wasActive) {
      node.classList.add("active");
    }
  });
});

// Scroll Reveal with Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.08
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
  observer.observe(el);
});

// Project Detail Modals (Expand on click)
const workCards = document.querySelectorAll(".work-card-aksh[data-modal]");
const modals = document.querySelectorAll(".project-modal");

workCards.forEach((card) => {
  card.addEventListener("click", () => {
    const modalId = card.getAttribute("data-modal");
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

modals.forEach((modal) => {
  const closeBtn = modal.querySelector(".modal-close");
  const backdrop = modal.querySelector(".modal-backdrop");

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((m) => m.classList.remove("active"));
    document.body.style.overflow = "";
  }
});
