// js/modules/promotions.js
export function initPromotions() {
  const promoCards = document.querySelectorAll('.promo-card');
  promoCards.forEach(promo => {
    promo.addEventListener('click', e => {
      if (e.target.tagName === 'A') return; // let link handle it
      const title = promo.querySelector('h3')?.innerText || 'oferta';
      console.log(`[Promotions] Interés en: ${title}`);
    });
  });
}
