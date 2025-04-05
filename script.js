// Wait until document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // --- EXISTING CODE MAINTAINED ---
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll(".nav-links li");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  // Sticky header with smooth transition effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    // Parallax effect on hero section
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      heroContent.style.opacity = 1 - window.scrollY / 600;
    }

    // Show elements when scrolling to them
    revealOnScroll();
  });

  // Mobile menu toggle with smoother animation
  burger.addEventListener("click", function () {
    nav.classList.toggle("active");
    burger.classList.toggle("toggle");

    navLinks.forEach((link, index) => {
      link.style.animation = ""; // Reset dulu

      if (nav.classList.contains("active")) {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
  });

  // Smooth scrolling for all internal links
  document.querySelectorAll('.nav-links li a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll to target
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close menu and remove animations
      nav.classList.remove("active");
      burger.classList.remove("toggle");
      navLinks.forEach((link) => {
        link.style.animation = ""; // Reset animasi
      });
    });
  });

  // --- ELEMENT ANIMATION ON SCROLL ---
  function revealOnScroll() {
    const elements = document.querySelectorAll(
      ".section-title, .about-img, .about-text, .skill-item, .project-card, .contact-info, .contact-form"
    );

    elements.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  // Add CSS class for animation support
  const style = document.createElement("style");
  style.textContent = `
        .section-title, .about-img, .about-text, .skill-item, .project-card, .contact-info, .contact-form {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .section-title.active, .about-img.active, .about-text.active, .skill-item.active, .project-card.active, .contact-info.active, .contact-form.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .skill-item.active .skill-progress {
          animation: skillFill 1.5s ease-out forwards;
        }
        
        .about-img.active img {
          animation: zoomInOut 3s infinite alternate ease-in-out;
        }
        
        @keyframes zoomInOut {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        
        .project-card {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        
        .project-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
        }
        
        .project-card .project-img img {
          transition: transform 0.7s ease;
        }
        
        
        .project-card:hover .project-img img {
          transform: scale(1.15);
        }
        
        .social-link {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .social-link:hover {
          transform: translateY(-8px) rotate(360deg);
        }
  
        /* Enhanced styles for skill bars */
        .skill-item {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.4s ease;
          background: var(--bg-secondary);
          padding: 5px;
        }
        
        .skill-item:hover {
          transform: translateY(-7px);
          box-shadow: 0 10px 25px rgba(109, 93, 252, 0.25);
        }
        
        .skill-bar {
          border-radius: 8px;
          overflow: hidden;
          height: 40px;
          position: relative;
        }
        
        .skill-progress {
          position: relative;
          height: 100%;
          background: linear-gradient(90deg, var(--accent), #8b5cf6);
          border-radius: 8px;
          box-shadow: inset 0 0 10px rgba(255,255,255,0.2);
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .skill-name {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-weight: bold;
          z-index: 1;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        
        .skill-percentage {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-weight: bold;
          z-index: 1;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
        }
        
        .skill-details {
          max-height: 0;
          overflow: hidden;
          background-color: var(--bg-primary);
          transition: max-height 0.5s ease, padding 0.3s ease;
          padding: 0 15px;
          border-radius: 0 0 8px 8px;
          margin-top: 5px;
          color: var(--text-secondary);
        }
        
        .skill-details.active {
          max-height: 200px;
          padding: 20px 15px;
        }
        
        .skill-item.expanded {
          margin-bottom: 45px;
        }
        
        .pulsate {
          animation: pulsate 2s infinite alternate;
        }
        
        @keyframes pulsate {
          0% {
            box-shadow: 0 0 0 0 rgba(109, 93, 252, 0.7);
          }
          100% {
            box-shadow: 0 0 0 15px rgba(109, 93, 252, 0);
          }
        }
        
        .skill-level-indicator {
          display: flex;
          margin-top: 12px;
          justify-content: center;
        }
        
        .level-dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 0 3px;
          transition: all 0.5s ease;
          position: relative;
        }
        
        .level-dot.filled {
          background-color: var(--accent);
          transform: scale(1.2);
        }
        
        .level-dot.filled::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--accent);
          opacity: 0.5;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .skill-logo {
          width: 24px;
          height: 24px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .skill-item:hover .skill-logo {
          transform: rotate(360deg);
        }
        
        .skill-tools {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        
        .skill-tool {
          background-color: rgba(109, 93, 252, 0.1);
          color: var(--accent);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        
        .skill-tool:hover {
          background-color: var(--accent);
          color: white;
          transform: translateY(-3px);
        }
        
        .ripple-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.8s linear;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .skill-details p {
          margin-bottom: 10px;
          line-height: 1.5;
        }
        
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          opacity: 0;
          pointer-events: none;
        }
        
        @keyframes particle-animation {
          0% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: translate(var(--x), var(--y));
          }
        }
      `;
  document.head.appendChild(style);

  // --- SKILL BARS ANIMATION ---
  // Only animate skill bars when they become visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".skill-item").forEach((skill) => {
    observer.observe(skill);
  });

  // --- SPECIAL INTERACTIONS ---
  // Interactive hover effects for project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.querySelector("h3").style.color = "var(--accent)";

      // Add parallax effect on hover
      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();

        // Add parallax effect to the card's content
        const cardImg = this.querySelector(".project-img");
        const cardContent = this.querySelector(".project-content");

        if (cardImg && cardContent) {
          const moveX = (x - rect.width / 2) / 20;
          const moveY = (y - rect.height / 2) / 20;

          cardImg.style.transform = `translate(${moveX * -1}px, ${
            moveY * -1
          }px)`;
          cardContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    });

    card.addEventListener("mouseleave", function () {
      this.querySelector("h3").style.color = "";
      this.style.transform = "";

      // Reset any transformations
      const cardImg = this.querySelector(".project-img");
      const cardContent = this.querySelector(".project-content");

      if (cardImg && cardContent) {
        cardImg.style.transform = "";
        cardContent.style.transform = "";
      }
    });
  });

  // --- ENHANCED CODE FOR INTERACTIVE SKILL BARS ---

  // Get all skill items
  const skillItems = document.querySelectorAll(".skill-item");

  // Skill data with descriptions
  const skillData = {
    "UI Design": {
      description:
        "Creating attractive and functional interfaces with a focus on aesthetics and usability.",
      level: 5, // out of 5
      tools: ["Figma", "Adobe XD", "Sketch"],
    },
    "UX Design": {
      description:
        "Designing user experiences that facilitate interaction and increase satisfaction.",
      level: 4,
      tools: ["Figma", "Maze", "UserTesting"],
    },
    Wireframing: {
      description:
        "Creating visual frameworks for the structure and layout of application interfaces.",
      level: 5,
      tools: ["Figma", "Balsamiq", "Adobe XD"],
    },
    Prototyping: {
      description:
        "Building interactive models to test concepts and user flows.",
      level: 4,
      tools: ["Figma", "Adobe XD", "ProtoPie"],
    },
    "User Research": {
      description:
        "Collecting and analyzing data to understand user needs and behaviors.",
      level: 4,
      tools: ["Hotjar", "Lookback", "UserZoom"],
    },
    Figma: {
      description:
        "All-in-one design platform for team collaboration and prototype creation.",
      level: 5,
      tools: ["Figma", "Figma Plugins"],
    },
    Maze: {
      description:
        "User testing platform to refine digital product experiences.",
      level: 4,
      tools: ["Maze", "Figma Integration"],
    },
  };

  // Function to create particle explosion effect
  function createParticles(element, count) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random position at skill bar
      const x = rect.width * Math.random();
      const y = rect.height * Math.random();

      // Random movement direction
      const moveX = (Math.random() - 0.5) * 100;
      const moveY = (Math.random() - 0.5) * 100;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--x", `${moveX}px`);
      particle.style.setProperty("--y", `${moveY}px`);

      // Random color variations
      const hue = Math.random() * 40 + 230; // Blues to purples
      particle.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;

      element.appendChild(particle);

      // Animate the particle
      particle.style.animation = `particle-animation 1s forwards`;

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }

  // Add interaction to skill bars
  skillItems.forEach((item) => {
    // Get skill name from item text
    const skillNameElement = item.querySelector(".skill-name");
    const skillName = skillNameElement.textContent;

    // Get percentage from percentage text
    const percentageText = item.querySelector(".skill-percentage").textContent;
    const percentage = parseInt(percentageText);

    // Create progress bar according to percentage
    const progressBar = item.querySelector(".skill-progress");
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    // Create ripple container
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "ripple-container";
    item.appendChild(rippleContainer);

    // Create div for skill details
    const skillDetails = document.createElement("div");
    skillDetails.className = "skill-details";

    // Fill skill details from data
    if (skillData[skillName]) {
      const data = skillData[skillName];

      // Level indicator with dots
      const levelIndicator = document.createElement("div");
      levelIndicator.className = "skill-level-indicator";

      for (let i = 1; i <= 5; i++) {
        const dot = document.createElement("div");
        dot.className = i <= data.level ? "level-dot filled" : "level-dot";
        levelIndicator.appendChild(dot);
      }

      // Create tools section
      const toolsSection = document.createElement("div");
      toolsSection.className = "skill-tools";

      data.tools.forEach((tool) => {
        const toolElement = document.createElement("span");
        toolElement.className = "skill-tool";
        toolElement.textContent = tool;
        toolsSection.appendChild(toolElement);
      });

      skillDetails.innerHTML = `
          <p>${data.description}</p>
        `;

      skillDetails.appendChild(toolsSection);
      skillDetails.appendChild(levelIndicator);
    } else {
      skillDetails.innerHTML = `
          <p>Advanced professional expertise in ${skillName}.</p>
          <div class="skill-level-indicator">
            <div class="level-dot filled"></div>
            <div class="level-dot filled"></div>
            <div class="level-dot filled"></div>
            <div class="level-dot filled"></div>
            <div class="level-dot"></div>
          </div>
        `;
    }

    // Add details to item
    item.appendChild(skillDetails);

    // Toggle detail when item is clicked
    item.addEventListener("click", function (e) {
      // Create ripple effect at click position
      const ripple = document.createElement("div");
      ripple.className = "ripple";
      const rect = rippleContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      rippleContainer.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);

      // Toggle active class on details
      const isActive = skillDetails.classList.toggle("active");

      // Toggle expanded class on item
      item.classList.toggle("expanded", isActive);

      // Toggle pulsate effect on progress bar
      progressBar.classList.toggle("pulsate");

      // Create particle explosion for visual feedback
      if (isActive) {
        createParticles(progressBar, 20);

        // Animate the level dots sequentially
        const dots = item.querySelectorAll(".level-dot.filled");
        dots.forEach((dot, index) => {
          setTimeout(() => {
            dot.style.transform = "scale(1.5)";
            setTimeout(() => {
              dot.style.transform = "scale(1.2)";
            }, 300);
          }, index * 150);
        });
      }

      // Close other skill details
      skillItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherDetails = otherItem.querySelector(".skill-details");
          const otherProgressBar = otherItem.querySelector(".skill-progress");

          if (otherDetails) {
            otherDetails.classList.remove("active");
            otherItem.classList.remove("expanded");
          }

          if (otherProgressBar) {
            otherProgressBar.classList.remove("pulsate");
          }
        }
      });
    });

    // Add hover animation for progress bar
    item.addEventListener("mouseenter", function () {
      progressBar.style.transform = "scaleY(1.1)";
      const dots = item.querySelectorAll(".level-dot.filled");

      // Subtle animation on dots when hovering
      dots.forEach((dot, index) => {
        dot.style.transform = `scale(${1.2 + index * 0.05})`;
      });
    });

    item.addEventListener("mouseleave", function () {
      if (!skillDetails.classList.contains("active")) {
        progressBar.style.transform = "scaleY(1)";
      }

      // Reset dots if details aren't active
      if (!skillDetails.classList.contains("active")) {
        const dots = item.querySelectorAll(".level-dot.filled");
        dots.forEach((dot) => {
          dot.style.transform = "scale(1.2)";
        });
      }
    });
  });

  // 3D perspective effect for skill items
  document
    .querySelector(".skills-container")
    .addEventListener("mousemove", function (e) {
      const items = document.querySelectorAll(".skill-item");
      const containerRect = this.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX =
          itemRect.left + itemRect.width / 2 - containerRect.left;
        const itemCenterY =
          itemRect.top + itemRect.height / 2 - containerRect.top;

        const distanceX = mouseX - itemCenterX;
        const distanceY = mouseY - itemCenterY;

        // Calculate distance from mouse
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        // Only affect items close to the mouse
        if (distance < 300) {
          const intensity = 1 - distance / 300; // 0 to 1 based on distance

          // Tilt based on mouse position relative to the item
          const tiltX = distanceY * 0.03 * intensity;
          const tiltY = -distanceX * 0.03 * intensity;

          item.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        } else {
          item.style.transform = "";
        }
      });
    });

  // Reset transforms when mouse leaves skills container
  document
    .querySelector(".skills-container")
    .addEventListener("mouseleave", function () {
      const items = document.querySelectorAll(".skill-item");
      items.forEach((item) => {
        item.style.transform = "";
      });
    });

  // Animation for hero
  const hero = document.querySelector(".hero");
  if (hero) {
    // Parallax effect for hero section
    window.addEventListener("mousemove", function (e) {
      const moveX = (window.innerWidth / 2 - e.clientX) / 30;
      const moveY = (window.innerHeight / 2 - e.clientY) / 30;

      hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    // Text animation in hero section
    const heroTitle = hero.querySelector("h1");
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.innerHTML = "";

      // Text typing effect
      let i = 0;
      const typeEffect = setInterval(() => {
        if (i < text.length) {
          heroTitle.innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(typeEffect);
        }
      }, 100);
    }
  }

  // Initialize animations on first load
  revealOnScroll();

  // Add ripple effect for buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // CSS for ripple effect
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .btn {
          position: relative;
          overflow: hidden;
        }
        
        .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          width: 100px;
          height: 100px;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
  document.head.appendChild(rippleStyle);

  // Animate counting for skill percentages
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = `${value}%`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Get all percentage elements
  const percentageElements = document.querySelectorAll(".skill-percentage");

  // Start counter animation when skills are visible
  const percentageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percentText = entry.target.textContent;
          const percent = parseInt(percentText);
          animateValue(entry.target, 0, percent, 1500);
          percentageObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe all percentage elements
  percentageElements.forEach((el) => {
    percentageObserver.observe(el);
  });

  // Add glowing effect to skills section title
  const skillsTitle = document.querySelector(".skills .section-title");
  if (skillsTitle) {
    const glowStyle = document.createElement("style");
    glowStyle.textContent = `
      .skills .section-title {
        position: relative;
      }
      
      .skills .section-title::before {
        content: "";
        position: absolute;
        top: -20%;
        left: -10%;
        width: 120%;
        height: 140%;
        background: radial-gradient(circle, rgba(109, 93, 252, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
        z-index: -1;
        opacity: 0;
        animation: glow 3s infinite alternate;
      }
      
      @keyframes glow {
        0% {
          opacity: 0.3;
          transform: scale(0.9);
        }
        100% {
          opacity: 0.7;
          transform: scale(1.1);
        }
      }
    `;
    document.head.appendChild(glowStyle);
  }
  // Add this to your existing JavaScript file after the DOMContentLoaded event

  // Create and append canvas for animated background
  const canvas = document.createElement("canvas");
  canvas.id = "background-animation";
  document.body.insertBefore(canvas, document.body.firstChild);

  // Set up canvas and context
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `rgba(109, 93, 252, ${Math.random() * 0.5})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Boundary check
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize particles
  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Connect particles with lines if they're close enough
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(109, 93, 252, ${0.1 - distance / 1500})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Start animation
  animate();

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    // Create ripple effect
    for (let i = 0; i < 3; i++) {
      const particle = new Particle();
      particle.x = mouse.x;
      particle.y = mouse.y;
      particle.speedX = Math.random() * 2 - 1;
      particle.speedY = Math.random() * 2 - 1;
      particle.size = Math.random() * 4 + 2;
      particles.push(particle);

      // Limit particles
      if (particles.length > 200) {
        particles.splice(0, 3);
      }
    }
  });
});
