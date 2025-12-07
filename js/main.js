// Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {
  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or external link
      if (href === "#" || href.startsWith("http")) return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Service Cards Hover Effect Enhancement
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Testimonial Auto Rotation
  let testimonialIndex = 0;
  const testimonials = document.querySelectorAll(".testimonial-card");

  function rotateTestimonials() {
    testimonials.forEach((card) => {
      card.style.opacity = "0.6";
      card.style.transform = "scale(0.95)";
    });

    testimonialIndex = (testimonialIndex + 1) % testimonials.length;

    testimonials[testimonialIndex].style.opacity = "1";
    testimonials[testimonialIndex].style.transform = "scale(1)";
  }

  // Uncomment to enable auto rotation
  // setInterval(rotateTestimonials, 5000);

  // Form Validation for Contact Page
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = this.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("is-invalid");
        } else {
          field.classList.remove("is-invalid");
        }
      });

      if (isValid) {
        // Show success message
        const submitBtn = this.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          alert("Thank you! Your message has been sent successfully.");
          this.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }

  // Counter Animation for Stats
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateStats() {
    if (animated || !isElementInViewport(document.querySelector(".hero-stats")))
      return;

    animated = true;
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + "+";
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + "+";
        }
      }, 30);
    });
  }

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  window.addEventListener("scroll", animateStats);

  // Initialize stats animation on load if already in viewport
  animateStats();

  // Lazy Loading Images
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // Back to Top Button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopBtn.className = "btn btn-primary back-to-top";
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
    `;
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "flex";
      backToTopBtn.style.alignItems = "center";
      backToTopBtn.style.justifyContent = "center";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
