/**
 * Personal Portfolio Website - JavaScript
 * Custom tailored for Maheswari Somashekar
 * Features:
 * - Theme Switcher (Dark/Light mode with localStorage)
 * - Mobile Menu Navigation
 * - Dynamic Typewriter Effect
 * - Scroll Header & Active Navigation Highlighting
 * - Project Filter System
 * - Interactive Project Preview Modal
 * - Client-Side Contact Form Validation
 * - Back to Top Button
 * - Dynamic Copyright Year
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initTypewriter();
  initScrollEffects();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initResumeDownload();
  initFooterYear();
});

/* ===================================================================
   1. THEME SWITCHER (Dark / Light with localStorage)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.body.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }
}

/* ===================================================================
   2. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Open menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Close menu with X button
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show-menu')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
      }
    }
  });
}

/* ===================================================================
   3. TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Passionate Tech Enthusiast',
    'Deterministic Developer',
    'B.E. Student @ NIE Mysuru',
    'Java & DSA Explorer',
    'Full-Stack Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   4. SCROLL EFFECTS (Header shadow, Active link, Back to Top)
   =================================================================== */
function initScrollEffects() {
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header styling on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active link highlighting
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  // Scroll to top smooth click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ===================================================================
   5. PROJECT FILTER SYSTEM
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedFilter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (selectedFilter === 'all' || category === selectedFilter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   6. INTERACTIVE PROJECT PREVIEW MODAL
   =================================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const previewButtons = document.querySelectorAll('.preview-modal-btn');

  // Real project details from GitHub: maheswarisomashekar-code
  const projectsData = {
    'birdshub': {
      title: 'BirdsHub - Nature & Avian Platform',
      badge: 'Interactive Web Platform',
      description: 'BirdsHub is a comprehensive online haven for bird enthusiasts, nature researchers, and wildlife photographers. The project provides an interactive directory of bird species, ecological facts, habitat conservation insights, and an intuitive photo showcase designed with modern UI standards.',
      features: [
        'Curated bird species database with classification & habitat information',
        'Intuitive card grid layout optimized for mobile and desktop screens',
        'Clean responsive navigation with category filtering',
        'Clean, modular code structure adhering to modern HTML5/CSS3'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git & GitHub'],
      github: 'https://github.com/maheswarisomashekar-code/birdshub'
    },
    'kannadavaividhya': {
      title: 'Kannada Vaividhya - Cultural Heritage Portal',
      badge: 'Cultural Web Application',
      description: 'Kannada Vaividhya is an evocative digital portal developed to honor and showcase the richness of Karnataka’s language, culture, traditions, and literary history. It blends visual elegance with accessible navigation to provide visitors with an educational and immersive experience.',
      features: [
        'Rich multimedia content presentation celebrating regional literature and arts',
        'Cross-browser responsive styling built using modern CSS and Bootstrap',
        'Semantic HTML layout designed for high readability and cultural aesthetics',
        'Seamlessly integrated navigation with smooth scrolling sections'
      ],
      tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'GitHub'],
      github: 'https://github.com/maheswarisomashekar-code/kannadavaividhya'
    },
    'reviewpulse': {
      title: 'ReviewPulse - Feedback & Insights System',
      badge: 'Data & Sentiment Platform',
      description: 'ReviewPulse is an interactive feedback management web application designed to collect, categorize, and analyze user reviews and product sentiment. It bridges user feedback with actionable insights through structured rating cards and summary visualizations.',
      features: [
        'Interactive review submission form with instant DOM feedback',
        'Structured breakdown of positive, neutral, and critical sentiment ratings',
        'Backend and database schema integration using Node.js & MySQL logic',
        'Clean, modern dashboard cards with responsive UI layout'
      ],
      tech: ['JavaScript (ES6+)', 'Node.js', 'MySQL', 'CSS3 Grid', 'REST Workflow'],
      github: 'https://github.com/maheswarisomashekar-code/reviewpulse'
    },
    'navigator': {
      title: 'College Process Navigator (Group Project)',
      badge: 'Campus Workflow Solution',
      description: 'Developed collaboratively as a team project, College Process Navigator resolves campus friction by offering students an organized roadmap for administrative approvals, examination clearances, departmental forms, and semester milestones at NIE Mysuru.',
      features: [
        'Step-by-step workflow navigation for campus administrative clearances',
        'Collaborative development utilizing Git and GitHub version control',
        'Categorized academic directories for fast resource discovery',
        'User-friendly design prioritizing accessibility on mobile devices'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Git Collaborative Workflow', 'UI/UX'],
      github: 'https://github.com/maheswarisomashekar-code'
    }
  };

  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <span class="section-tag" style="margin-bottom: 0.5rem;">${project.badge}</span>
      <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main);">${project.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">${project.description}</p>
      
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">Key Highlights:</h4>
      <ul style="list-style: disc; padding-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
        ${project.features.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
      </ul>

      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">Technologies Used:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
        ${project.tech.map(t => `<span class="tag" style="background: var(--primary-light); color: var(--primary); border: none;">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
          <i class="fa-brands fa-github"></i>
          <span>View on GitHub</span>
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   7. CONTACT FORM VALIDATION & INTERACTIVITY
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(input, errorElementId, show) {
    const errorEl = document.getElementById(errorElementId);
    if (show) {
      input.classList.add('error');
      if (errorEl) errorEl.classList.add('visible');
    } else {
      input.classList.remove('error');
      if (errorEl) errorEl.classList.remove('visible');
    }
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
      setFieldError(nameInput, 'name-error', false);
    }
  });

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) {
      setFieldError(emailInput, 'email-error', false);
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) {
      setFieldError(messageInput, 'message-error', false);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    if (nameVal.length === 0) {
      setFieldError(nameInput, 'name-error', true);
      isValid = false;
    } else {
      setFieldError(nameInput, 'name-error', false);
    }

    if (!validateEmail(emailVal)) {
      setFieldError(emailInput, 'email-error', true);
      isValid = false;
    } else {
      setFieldError(emailInput, 'email-error', false);
    }

    if (messageVal.length < 10) {
      setFieldError(messageInput, 'message-error', true);
      isValid = false;
    } else {
      setFieldError(messageInput, 'message-error', false);
    }

    if (!isValid) {
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields properly.';
      }
      return;
    }

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${nameVal}</strong>! Your message has been sent to Maheswari.`;
      }

      form.reset();

      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }
      }, 6000);
    }, 1200);
  });
}

/* ===================================================================
   8. RESUME DOWNLOAD ACTION
   =================================================================== */
function initResumeDownload() {
  const downloadBtn = document.getElementById('download-cv-btn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', (e) => {
    // If resume.pdf is in the project folder, let browser download it directly
    fetch('resume.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.open('resume.pdf', '_blank');
        } else {
          downloadFallbackResume();
        }
      })
      .catch(() => {
        downloadFallbackResume();
      });
    e.preventDefault();
  });

  function downloadFallbackResume() {
    const resumeText = `MAHESWARI
Passionate Tech Enthusiast & Deterministic Developer
Mysuru, Karnataka, India
Email: maheswarisomashekar@gmail.com
GitHub: https://github.com/maheswarisomashekar-code

==================================================
EDUCATION:
==================================================
Bachelor of Engineering (B.E.) | 2024 - 2028
The National Institute of Engineering (NIE), Mysuru
Overall CGPA: 9.4 / 10

==================================================
TECHNICAL SKILLS:
==================================================
- Programming Languages: Java (Core & OOP), JavaScript (ES6+)
- Data Structures & Algorithms (DSA in progress)
- Frontend Development: HTML5, CSS3, Bootstrap 5, Responsive Design
- Backend & Databases: Node.js, MySQL
- Cloud & Developer Tools: AWS (Basics), Git, GitHub, VS Code

==================================================
FEATURED PROJECTS:
==================================================
1. BirdsHub
   - Nature & avian platform featuring bird species directory and community guides.
   - Tech: HTML5, CSS3, JavaScript, Git & GitHub.
   - GitHub: https://github.com/maheswarisomashekar-code/birdshub

2. Kannada Vaividhya
   - Cultural and informational web portal celebrating Karnataka's heritage and literature.
   - Tech: HTML5, CSS3, Bootstrap, JavaScript.
   - GitHub: https://github.com/maheswarisomashekar-code/kannadavaividhya

3. ReviewPulse
   - Dynamic feedback and review monitoring system with sentiment breakdown.
   - Tech: JavaScript, Node.js, MySQL, CSS3.
   - GitHub: https://github.com/maheswarisomashekar-code/reviewpulse

4. College Process Navigator (Group Project)
   - Collaborative student roadmap streamlining campus clearances and administrative steps.
   - Tech: HTML5, CSS3, JavaScript, Git Collaboration.
   - GitHub: https://github.com/maheswarisomashekar-code
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Maheswari_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

/* ===================================================================
   9. COPYRIGHT DYNAMIC YEAR
   =================================================================== */
function initFooterYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
