// === interactive JavaScript (separate file) ===
(function() {
  // ----- smooth scroll + active link + sticky shadow -----
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar ul li a');
  const sections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('skills'),
    document.getElementById('projects'),
    document.getElementById('contact')
  ];

  // smooth scroll with offset
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const hash = link.getAttribute('href').substring(1); // remove #
      let target = document.getElementById(hash);
      if (!target && hash === 'skills') target = document.getElementById('skills');
      if (!target && hash === 'projects') target = document.getElementById('projects');
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // active link on scroll + shadow
  function updateActiveNav() {
    let scrollY = window.scrollY;
    // navbar shadow
    navbar.style.boxShadow = scrollY > 30 ? '0 8px 20px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)';

    let activeFound = false;
    sections.forEach((sec, i) => {
      if (!sec) return;
      const offset = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= offset && scrollY < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[i]) navLinks[i].classList.add('active');
        activeFound = true;
      }
    });
    // if none (very top), activate home
    if (!activeFound && scrollY < 200) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLinks[0]) navLinks[0].classList.add('active');
    }
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ----- SKILL BARS ANIMATION (only once) -----
  const skillSection = document.querySelector('.skills-section');
  const fills = document.querySelectorAll('.fill');
  let animated = false;

  function animateBars() {
    if (animated) return;
    const rect = skillSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 100) {
      fills.forEach(bar => {
        const width = bar.getAttribute('data-width') || bar.style.width; // fallback
        bar.style.width = width;
      });
      animated = true;
    }
  }
  // set initial width to 0% (already from style), but we store target in data-width
  fills.forEach(bar => {
    const computed = bar.style.width; // might be empty
    if (computed && computed !== '0%') {
      // if already set, keep; else store
    } else {
      // get from inline style if present (some may have width hardcoded)
      const inline = bar.getAttribute('data-width');
      if (!inline) {
        // default fallback (from content)
        const parentSkill = bar.closest('.skill');
        if (parentSkill) {
          const percentSpan = parentSkill.querySelector('.skill-title span:last-child');
          if (percentSpan) {
            const val = percentSpan.innerText.replace('%','') + '%';
            bar.setAttribute('data-width', val);
          }
        }
      }
    }
    // ensure width start at 0
    bar.style.width = '0%';
  });

  window.addEventListener('scroll', animateBars);
  animateBars(); // check immediately

  // ----- PROJECT CARD HOVER (already in css, but we keep mouse feedback) -----
  // also manually add interactive feel
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.25s ease, box-shadow 0.3s';
    });
  });

  // ----- CONTACT FORM VALIDATION + interactive highlight -----
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(inp => {
      inp.style.border = '2px solid #d6e4f0'; // reset
      if (inp.value.trim() === '') {
        inp.style.border = '2px solid #e55039';
        valid = false;
      } else {
        inp.style.border = '2px solid #78b159';
      }
    });

    if (valid) {
      alert('✅ Message sent! (demo)');
      form.reset();
      inputs.forEach(i => i.style.border = '2px solid #d6e4f0');
    } else {
      alert('⚠️ Please fill all fields');
    }
  });

  // optional: reset border on focus
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', () => field.style.border = '2px solid #4a90e2');
  });

  // ----- image fallback (if jaya.jpg missing) -----
  const profileImg = document.querySelector('.about-image img');
  if (profileImg) {
    profileImg.onerror = () => {
      profileImg.src = 'https://via.placeholder.com/350x350?text=Jaya+Bhute';
    };
  }

})();
