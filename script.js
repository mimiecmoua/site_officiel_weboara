const projects = [
  {
    tag: 'IA OCR • Budget',
    title: 'BudgetScan',
    image: './img/budgetscan_sit_off.jpg',
    description: `Projet en phase de recherche et développement.`,
    link: null
  },
  {
    tag: 'Bien-être • UX',
    title: 'DigZen',
    image: './img/digzen_site.png',
    description: `DigZen est une application conçue pour encourager une alimentation plus consciente. Grâce à un chronomètre guidé et des messages d'accompagnement, elle aide les utilisateurs à ralentir le rythme des repas, à prendre le temps de manger et à retrouver une relation plus sereine avec l'alimentation.`,
    link: 'https://digzen.netlify.app/'
  },
  {
    tag: 'IA embarquée • cartographie sémantique',
    title: 'Nautilus exploration',
    image: './img/nautilus_sit_off.png',
    description: 'Le projet Nautilus est une carte interactive du voyage imaginé par Jules Verne, enrichie par une IA qui analyse les textes originaux pour générer un “journal de bord vivant”. Elle extrait et structure les événements, espèces et atmosphères du récit pour proposer une lecture immersive et intelligente de l’œuvre.',
    link: 'https://the-nautilus-exploration.netlify.app/'
  },
  {
    tag: 'Sass • analyse prospection',
    title: 'IA qui analyse le BtoB',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    description: 'Projet en phase de recherche et développement. Une application IA qui analyse un site web d’entreprise et transforme son contenu en une description claire et compréhensible, en identifiant son secteur, son modèle économique et sa position dans la chaîne de valeur.',
    link: null
  },
  {
    tag: 'Application • consommateur / entreprise',
    title: 'Comprendre la chaîne de production.',
    image: './img/ED.WO.png',
    description: 'Projet en phase de recherche et développement.  ',
    link: null
  }
];

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalTag = document.getElementById('modal-tag');
const modalDescription = document.getElementById('modal-description');
const modalMedia = document.getElementById('modal-media');
const modalLink = document.getElementById('modal-link');
const closeBtn = document.getElementById('modal-close');

function openProject(index) {
  const project = projects[index];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalTag.textContent = project.tag;
  modalDescription.textContent = project.description;
  modalMedia.style.backgroundImage = `url('${project.image}')`;
  modalLink.href = project.link;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
  const index = Number(card.dataset.project);

  card.addEventListener('click', () => openProject(index));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(index);
    }
  });
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

const themeButton = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

root.setAttribute('data-theme', theme);

themeButton.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
});

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

const parallaxCards = document.querySelectorAll('.project-card');

window.addEventListener('scroll', () => {
  const viewportHeight = window.innerHeight;

  parallaxCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const visual = card.querySelector('.project-visual');
    const offset = ((rect.top + rect.height / 2) - viewportHeight / 2) * -0.04;

    if (visual) {
      visual.style.transform = `translateY(${offset}px) scale(1.08)`;
    }

    card.style.transform = `translateY(${Math.sin((window.scrollY * 0.002) + index) * 4}px)`;
  });
}, { passive: true });