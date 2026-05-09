// js/modules/modal.js
export function initModal() {
  const modal = document.getElementById('citaModal');
  if (!modal) return;

  const openerIds = [
    'navReservaBtn','heroReservaBtn','bookingReservaBtn',
    'mobileReservaBtn','promoReservaBtn1','promoReservaBtn2'
  ];

  const openers = openerIds.map(id => document.getElementById(id)).filter(Boolean);
  const closeBtn   = document.getElementById('closeModalBtn');
  const confirmBtn = document.getElementById('confirmarCitaBtn');

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const f = modal.querySelector('select,input'); if (f) f.focus(); }, 120);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openers.forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const servicio = document.getElementById('servicioSelect')?.value || '';
      const nombre   = document.getElementById('nombreCliente')?.value.trim() || '';
      const telefono = document.getElementById('telefonoCliente')?.value.trim() || '';
      const fecha    = document.getElementById('fechaCita')?.value || '';

      if (!nombre) { alert('💆‍♀️ Por favor ingresa tu nombre para reservar.'); return; }
      if (!fecha)  { alert('📅 Selecciona una fecha para tu cita.'); return; }

      let msg = `✅ ¡Gracias ${nombre}! Solicitud para "${servicio}" el ${fecha}. `;
      msg += telefono ? `Te contactamos al ${telefono}. ` : 'Pronto te contactamos. ';
      msg += '✨ Te esperamos en PAZITA. ✨';
      alert(msg);
      closeModal();

      ['nombreCliente','telefonoCliente','fechaCita'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
      });
      const sel = document.getElementById('servicioSelect');
      if (sel) sel.selectedIndex = 0;
    });
  }
}
