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
  
  // Custom Cursor .posrCursor
  
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
  
