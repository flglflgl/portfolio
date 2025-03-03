document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".post, .intro").forEach(el => observer.observe(el));

    document.querySelector(".top ul")?.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) return;

        event.preventDefault();
        const targetSection = document.querySelector(link.getAttribute("href"));
        if (targetSection) {
            targetSection.style.display = "block";
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });

    document.querySelectorAll(".post video").forEach(video => {
        const post = video.closest(".post");
        if (!post) return;

        post.addEventListener("mouseenter", () => video.play());
        post.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    const sections = document.querySelectorAll("section, .col");
    const navLinks = document.querySelectorAll(".top ul li");
    const menuItems = document.querySelectorAll(".minTopUl ul li .svg svg");

    const highlightNav = () => {
        let scrollPosition = window.scrollY;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop + 40;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => link.classList.remove("show"));
                navLinks[index]?.classList.add("show");
            }
        });

        sections.forEach((section, index) => {
            let rect = section.getBoundingClientRect();
            let sectionTop = rect.top + window.scrollY - 100;
            let sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                menuItems.forEach((item) => (item.style.display = "none"));
                menuItems[index]?.style.display = "block";
            }
        });
    };

    window.addEventListener("scroll", highlightNav);
    highlightNav();

    const applyCursorEffect = (selector, scale) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.addEventListener("mousemove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * scale;
                const y = (e.clientY - rect.top - rect.height / 2) * scale;

                el.style.transform = `translate(${x}px, ${y}px)`;
                const svg = el.querySelector(".svg");
                if (svg) svg.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
            });

            el.addEventListener("mouseleave", () => {
                el.style.transform = "";
                const svg = el.querySelector(".svg");
                if (svg) svg.style.transform = "";
            });
        });
    };

    applyCursorEffect(".top > nav > ul > li", 0.2);
    applyCursorEffect(".buttonGroup button", 0.5);

    const minTopUl = document.querySelector(".minTopUl");
    document.querySelector(".minTopUlbtn")?.addEventListener("click", () => {
        minTopUl?.classList.toggle("show");
    });

    document.querySelector(".minTopUlClosingbtn")?.addEventListener("click", () => {
        minTopUl?.classList.remove("show");
    });

    document.querySelector(".minTopUl ul")?.addEventListener("click", (e) => {
        if (e.target.matches("a")) {
            minTopUl?.classList.remove("show");
        }
    });

    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    const postCursorCon = document.createElement("div");
    postCursorCon.classList.add("postCursorCon");

    const postCursor = document.createElement("div");
    postCursor.classList.add("postCursor");

    const postCursorToolTip = document.createElement("span");
    postCursorToolTip.classList.add("postCursorToolTip");

    postCursorCon.append(postCursorToolTip, postCursor);
    document.body.appendChild(postCursorCon);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const smoothFactor = 0.1;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX + 20;
        mouseY = e.clientY + 20;
    });

    document.addEventListener("mousedown", () => {
        cursor.style.transform = "scale(1.3)";
    });

    document.addEventListener("mouseup", () => {
        cursor.style.transform = "scale(1)";
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * smoothFactor;
        cursorY += (mouseY - cursorY) * smoothFactor;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        postCursorCon.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    document.querySelectorAll(".post video").forEach(video => {
        video.addEventListener("mouseenter", () => {
            cursor.style.display = "none";
            postCursorCon.style.display = "flex";
            postCursorCon.style.opacity = "1";
            postCursorToolTip.textContent = video.closest(".post")?.dataset.text || "View Video";
        });

        video.addEventListener("mouseleave", () => {
            cursor.style.display = "block";
            postCursorCon.style.opacity = "0";
            setTimeout(() => postCursorCon.style.display = "none", 200);
        });
    });
});
