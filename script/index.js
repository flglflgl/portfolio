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
  
    // Cursor Position
    document.addEventListener("mousemove", (e) => {
      const offsetX = 20;
      const offsetY = 10;
  
      cursor.style.left = `${e.pageX + offsetX}px`;
      cursor.style.top = `${e.pageY + offsetY}px`;
      postCursorCon.style.left = `${e.pageX + offsetX}px`;
      postCursorCon.style.top = `${e.pageY + offsetY}px`;
    });
  
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
      post.addEventListener("mouseover", () => {
        cursor.style.display = "none";
        postCursorCon.style.display = "flex";
  
        postCursorToolTip.innerHTML = post.getAttribute("data-text") || "";
      });
  
      post.addEventListener("mouseout", () => {
        cursor.style.display = "block";
        postCursorCon.style.display = "none";
      });
    });
  });


  // Flyin effect when clicking on .top ul li
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".top ul a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            
            const targetId = link.getAttribute("href"); // Get href attribute (e.g., #skills)
            const targetSection = document.querySelector(targetId); // Select the section
            
            if (targetSection) {
                // Ensure the section is visible
                targetSection.style.display = "block";
                
                // Smoothly scroll to the section and center it
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
                video.currentTime = 0; // Reset video when leaving
            });
        }
    });
});

// Remove Fix Position from .bottom on Scroll

document.addEventListener("DOMContentLoaded", function () {
  const bottom = document.querySelector(".bottom");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      bottom.style.position = "relative";
      bottom.style.bottom = "-100px"; // Moves it out of view
    } else {
      bottom.style.position = "sticky";
      bottom.style.bottom = "0";
    }
  });
});

// Follow Cursor effect for .top ul li elements
document.addEventListener("DOMContentLoaded", function () {
  const topMenuItems = document.querySelectorAll(".top ul li");

  topMenuItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const rect = item.getBoundingClientRect();
      const offsetX = clientX - (rect.left + rect.width / 2);
      const offsetY = clientY - (rect.top + rect.height / 2);

      item.style.transform = `translate(${offsetX * 4.9}px, ${offsetY * 4.9}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transition = "transform 0.4s ease-out";
      item.style.transform = "translate(0, 0)";
    });
  });
});
