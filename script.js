const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const btnEnviar = document.getElementById('btn-enviar');
let hotspotActivo = null; // Variable para recordar qué botón se presionó

// Abrir modal
document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        hotspotActivo = hotspot; // Guardamos la referencia
        modalTitle.textContent = hotspot.getAttribute('data-name');
        modal.style.display = 'flex';
    });
});

// Cerrar y guardar
btnEnviar.addEventListener('click', () => {
    const estrellaSeleccionada = document.querySelector('input[name="rate"]:checked');
    const valorEstrellas = estrellaSeleccionada ? estrellaSeleccionada.value : 0;
    
    console.log("Sala:", modalTitle.textContent);
    console.log("Puntuación:", valorEstrellas);
    
    // --- AQUÍ ESTÁ LA MAGIA ---
    if (hotspotActivo) {
        hotspotActivo.classList.add('visto'); // Agrega la clase que apaga las ondas
    }
    
    modal.style.display = 'none';
    
    // Limpieza
    document.querySelectorAll('input[name="rate"]').forEach(r => r.checked = false);
    hotspotActivo = null; // Reseteamos la referencia

    const miDato = window.location.hash.substring(1);
    console.log(miDato)
});

// Cerrar si hacen clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});