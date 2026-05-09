// js/modules/services.js
export function initServices() {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.service || card.querySelector('h3')?.innerText || 'servicio';
      console.log(`[Services] Click en: ${name}`);
      // Futuro: pre-seleccionar servicio en modal de reserva
    });
  });
}
