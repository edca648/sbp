// js/modules/gallery.js
export function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      console.log(`[Gallery] Imagen ${index + 1} — lightbox pendiente`);
    });
  });
}
