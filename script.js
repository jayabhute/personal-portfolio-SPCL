
/* ===============================
   SMOOTH SCROLL (Navbar Fix)
================================ */
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    let targetId = link.getAttribute('href').replace('#', '').toLowerCase();

    // Fix mismatched IDs
    if (targetId === 'home') targetId = 'home';
    if (targetId === 'projects') targetId = 'project';
    if (targetId === 'skills') targetId = 'skills-section';

    let target =
      document.getElementById(targetId) ||
      document.querySelector(`.${targetId}`) ||
      document.querySelector('section');

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

/* ===============================
   ACTIVE NAV LINK ON SCROLL
================================ */
const sections = document.querySelectorAll('header, section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id') || section.className;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').toLowerCase().includes(current)) {
      link.classList.add('active');
    }
  });
});

/* ===============================
   STICKY NAVBAR SHADOW
================================ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow =
    window.scrollY > 30 ? '0 4px 10px rgba(0,0,0,0.2)' : 'none';
});

 ===============================
   SKILLS BAR ANIMATION
================================ */
const skillsSection = document.querySelector('.skills-section');
const skillBars = document.querySelectorAll('.fill');
let skillsDone = false;

window.addEventListener('scroll', () => {
  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight / 1.2;

  if (sectionTop < screenHeight && !skillsDone) {
    skillBars.forEach(bar => {
      const finalWidth = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1.5s ease';
        bar.style.width = finalWidth;
      }, 100);
    });
    skillsDone = true;
  }
});



/* ===============================
   PROJECT CARD HOVER EFFECT
================================ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.transition = '0.3s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});
