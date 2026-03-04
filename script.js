/* ============================================
   Wedding Invitation - Novaarota & Rika
   JavaScript: Countdown + Scroll Animations
   ============================================ */

(function () {
  'use strict';

  // ---- COUNTDOWN TIMER ----
  // Target: March 15, 2026 at 09:00 WIB (UTC+7)
  const weddingDate = new Date('2026-03-15T09:00:00+07:00');

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  function padZero(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';

      const msg = document.querySelector('.countdown-message');
      if (msg) {
        msg.textContent = '🎉 Hari bahagia telah tiba! Tuhan memberkati. 🎉';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = padZero(days);
    cdHours.textContent = padZero(hours);
    cdMinutes.textContent = padZero(minutes);
    cdSeconds.textContent = padZero(seconds);
  }

  // Run immediately, then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- SCROLL FADE-IN ANIMATION ----
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- SMOOTH SCROLL (for any internal links) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
