// Portfolio Filtering Functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Filter function
  function filterPortfolio(category) {
    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (category === "all" || itemCategory === category) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  }

  // Add click event to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Filter portfolio
      filterPortfolio(filterValue);

      // Update URL hash without scrolling
      history.pushState(null, null, `#${filterValue}`);

      // Show filter message
      showFilterMessage(filterValue);
    });
  });

  // Function to show filter message
  function showFilterMessage(filterValue) {
    // Remove existing message
    const existingMessage = document.querySelector(".filter-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const message = document.createElement("div");
    message.className =
      "filter-message alert alert-info alert-dismissible fade show mt-3";

    let messageText = "";
    switch (filterValue) {
      case "all":
        messageText = "Showing all projects";
        break;
      case "it":
        messageText = "Showing IT Solutions projects";
        break;
      case "consulting":
        messageText = "Showing Strategic Consulting projects";
        break;
      case "leadership":
        messageText = "Showing Leadership Development projects";
        break;
      case "training":
        messageText = "Showing Skills Training projects";
        break;
      case "innovation":
        messageText = "Showing Innovation projects";
        break;
    }

    message.innerHTML = `
            <i class="fas fa-filter me-2"></i>
            ${messageText}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    // Insert message after filter buttons
    const filterSection = document.querySelector(
      ".portfolio-filter-section .container"
    );
    filterSection.appendChild(message);

    // Auto-dismiss message after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        const bsAlert = new bootstrap.Alert(message);
        bsAlert.close();
      }
    }, 5000);
  }

  // Check URL hash on page load
  if (window.location.hash) {
    const hash = window.location.hash.replace("#", "");
    const matchingButton = document.querySelector(
      `.filter-btn[data-filter="${hash}"]`
    );

    if (matchingButton) {
      matchingButton.click();
    }
  }

  // Portfolio item modal initialization
  const portfolioLinks = document.querySelectorAll(".portfolio-link");
  portfolioLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default is handled by Bootstrap
      // You can add additional functionality here if needed

      // Example: Track portfolio view
      const portfolioItem = this.closest(".portfolio-item");
      const portfolioTitle =
        portfolioItem.querySelector(".portfolio-title").textContent;
      console.log(`Portfolio viewed: ${portfolioTitle}`);
    });
  });
});
