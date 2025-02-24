 // Show Post on scroll
 document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".post");

  const observerOptions = {
      root: null,
      threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const revealPost = (entries, observer) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
          }
      });
  };

  const observer = new IntersectionObserver(revealPost, observerOptions);

  posts.forEach((post) => {
      observer.observe(post);
  });
});


// Custom Cursor .postCursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");

  const postCursorCon = document.createElement("div");
  postCursorCon.classList.add("postCursorCon");

  const postCursor = document.createElement("div");
  postCursor.classList.add("postCursor");

  const postCursorToolTip = document.createElement("div");
  postCursorToolTip.classList.add("postCursorToolTip");

  postCursorCon.appendChild(postCursor);
  postCursorCon.appendChild(postCursorToolTip);

  document.body.appendChild(cursor);
  document.body.appendChild(postCursorCon);

  cursor.style.display = "block";
  postCursorCon.style.display = "none";

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let isHolding = false;

  // Mouse Move Listener
  document.addEventListener("mousemove", (e) => {
      mouseX = e.pageX + 10; // Keep 10px distance
      mouseY = e.pageY + 10;
  });

  // Click Listener (Jump to Mouse Position)
  document.addEventListener("mousedown", () => {
      isHolding = true;
      cursorX = mouseX;
      cursorY = mouseY;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
  });

  document.addEventListener("mouseup", () => {
      isHolding = false;
  });

  // Cursor Animation Loop (Smooth Follow)
  function animateCursor() {
      if (!isHolding) {
          cursorX += (mouseX - cursorX) * 0.1; // Smooth follow
          cursorY += (mouseY - cursorY) * 0.1;
          cursor.style.left = `${cursorX}px`;
          cursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Handle postCursor for video hover
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
      const video = post.querySelector("video");
      if (video) {
          video.addEventListener("mouseenter", () => {
              cursor.style.display = "none";
              postCursorCon.style.display = "flex";
              postCursorToolTip.innerHTML = post.getAttribute("data-text") || "";
          });

          video.addEventListener("mouseleave", () => {
              cursor.style.display = "block";
              postCursorCon.style.display = "none";
          });
      }
  });
});


// Fly In effect when clicking on .top ul li
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".top ul a").forEach(link => {
      link.addEventListener("click", (event) => {
          event.preventDefault();

          const targetId = link.getAttribute("href");
          const targetSection = document.querySelector(targetId); // Select the section

          if (targetSection) {
              // Show section
              targetSection.style.display = "block";

              // Smoothly scroll to the section
              targetSection.scrollIntoView({ behavior: "smooth", block: "center" });
          }
      });
  });
});


// Run video when .cursor is on .post
document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
      const video = post.querySelector("video");

      if (video) {
          post.addEventListener("mouseenter", () => {
              video.play();
          });

          post.addEventListener("mouseleave", () => {
              video.pause();
              video.currentTime = 0; // Reset video when the cursor is not on it
          });
      }
  });
});


// SVG highlight .top ul li
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section, .col"); // Sections to observe
  const navLinks = document.querySelectorAll(".top ul li"); // Navigation links

  function highlightNav() {
      let scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
          const sectionTop = section.offsetTop - 50; // Adjust for header height
          const sectionHeight = section.clientHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              navLinks.forEach((link) => link.classList.remove("show")); // Remove class from all
              navLinks[index]?.classList.add("show"); // Add class to active link
          }
      });
  }

  window.addEventListener("scroll", highlightNav);
  highlightNav(); // Run initially in case user is already scrolled
});


// SVG highlight .minTopUl ul li
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".col"); // Detect only `.col` elements
  const menuItems = document.querySelectorAll(".minTopUl ul li .svg svg");

  function highlightMenu() {
      let scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
          let rect = section.getBoundingClientRect();
          let sectionTop = rect.top + window.scrollY - 100; // Adjust offset
          let sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              menuItems.forEach((item) => (item.style.display = "none"));

              if (menuItems[index]) {
                  menuItems[index].style.display = "block";
              }
          }
      });
  }

  window.addEventListener("scroll", highlightMenu);
  highlightMenu(); // Run on page load
});


// Follow Cursor effect for .top ul li elements
document.addEventListener("DOMContentLoaded", function () {
  // Select only direct children of .top ul
  const topMenuItems = document.querySelectorAll(".top > nav > ul > li");

  topMenuItems.forEach((item) => {
      item.addEventListener("mousemove", (event) => {
          const { clientX, clientY } = event;
          const rect = item.getBoundingClientRect();
          const offsetX = clientX - (rect.left + rect.width / 2);
          const offsetY = clientY - (rect.top + rect.height / 2);

          item.style.transform = `translate(${offsetX * 1.4}px, ${offsetY * 1.4}px)`;
      });

      item.addEventListener("mouseleave", () => {
          item.style.transition = "transform 0.4s ease-out";
          item.style.transform = "translate(0, 0)";
      });
  });
});


// Follow Cursor effect for .introbtn
document.querySelectorAll('.introbtn').forEach(button => {
  button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move the button slightly
      button.style.transform = `translate(${x * 1.4}px, ${y * 1.4}px)`;

      // Move the text inside more
      button.querySelector('span').style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
      button.querySelector('span').style.transform = 'translate(0, 0)';
  });
});


// Show .intro on scroll
document.addEventListener("DOMContentLoaded", function () {
  const introSection = document.querySelector(".intro");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              introSection.classList.add("show");
          }
      });
  }, { threshold: 0.2 });

  observer.observe(introSection);
});


// Show .minTopUl on click
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".minTopUlbtn");
  const menu = document.querySelector(".minTopUl");

  if (menuButton && menu) {
      menuButton.addEventListener("click", () => {
          menu.classList.toggle("show");
      });
  }
});

// Hiding .minTopUl on click
document.querySelector('.minTopUlClosingbtn').addEventListener('click', function () {
  document.querySelector('.minTopUl').classList.remove('show');
});

// Hiding .minTopUl when clicking on the li element links
const links = document.querySelectorAll('.minTopUl ul li a');

links.forEach(link => {
  link.addEventListener('click', () => {
      document.querySelector('.minTopUl').classList.remove('show');
  });
});