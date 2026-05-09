// js/main.js — Entry point
import { initModal } from './modules/modal.js';
import { initServices } from './modules/services.js';
import { initGallery } from './modules/gallery.js';
import { initPromotions } from './modules/promotions.js';

/* ── Smooth scroll ── */
function initSmoothScroll() {
  const modalBtnIds = new Set([
    'navReservaBtn','heroReservaBtn','bookingReservaBtn',
    'mobileReservaBtn','promoReservaBtn1','promoReservaBtn2'
  ]);
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (modalBtnIds.has(link.id)) return;
    const hash = link.getAttribute('href');
    if (hash && hash !== '#') {
      link.addEventListener('click', e => {
        const target = document.querySelector(hash);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
      });
    }
  });
}

/* ── Hamburger menu ── */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function toggle(open) {
    btn.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => toggle(!btn.classList.contains('is-open')));

  // Close on mobile link click
  menu.querySelectorAll('.mob-link').forEach(link => {
    if (!link.id.includes('Reserva')) {
      link.addEventListener('click', () => toggle(false));
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (btn.classList.contains('is-open') && !btn.contains(e.target) && !menu.contains(e.target)) {
      toggle(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.classList.contains('is-open')) toggle(false);
  });
}

/* ── Navbar scroll effect ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Hero subtle zoom on load ── */
function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (bg) requestAnimationFrame(() => bg.classList.add('zoomed'));
}

/* ── Active nav link on scroll ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links    = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initHamburger();
  initNavbar();
  initHeroBg();
  initScrollSpy();
  initModal();
  initServices();
  initGallery();
  initPromotions();
});
