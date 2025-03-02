document.addEventListener("DOMContentLoaded", () => {
    setupScrollObserver();
    setupNavigation();
    setupCustomCursor();
});

// Show Post on Scroll
function setupScrollObserver() {
    const posts = document.querySelectorAll(".post");

    if (!posts.length) return;

    const observerOptions = {
        root: null,
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    posts.forEach((post) => observer.observe(post));
}

// Fly-In Effect when Clicking on Li Elements
function setupNavigation() {
    const links = document.querySelectorAll(".top ul a");

    if (!links.length) return;

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

// Custom Cursor Effect
function setupCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");

    if (!cursor) return;

    document.addEventListener("mousemove", (event) => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });

    document.addEventListener("mousedown", () => cursor.classList.add("active"));
    document.addEventListener("mouseup", () => cursor.classList.remove("active"));
}
