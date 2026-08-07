/* ============================================================
   TEMA 15: Nav fixed tipo headroom.js — oculta al bajar, muestra al subir
   ============================================================ */
(function () {
  const nav = document.getElementById('nav');
  let ultimoScroll = window.scrollY;
  let ticking = false;

  function alScroll() {
    const actual = window.scrollY;

    if (actual > ultimoScroll && actual > 120) {
      nav.classList.add('oculto');   // bajando -> ocultar
    } else {
      nav.classList.remove('oculto'); // subiendo -> mostrar
    }

    ultimoScroll = actual;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(alScroll);
      ticking = true;
    }
  });
})();

/* ============================================================
   TEMA 22: Reveal on scroll con IntersectionObserver
   TEMA 23: respeta prefers-reduced-motion (no anima si el usuario lo pide)
   ============================================================ */
(function () {
  const prefiereReducirMovimiento = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const elementos = document.querySelectorAll('[data-revelar]');

  if (prefiereReducirMovimiento) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elementos.forEach((el) => observador.observe(el));
})();

/* ============================================================
   Scroll suave para los enlaces de la navegación
   ============================================================ */
document.querySelectorAll('.navegacion__lista a').forEach((enlace) => {
  enlace.addEventListener('click', (evento) => {
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (!destino) return;
    evento.preventDefault();
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
