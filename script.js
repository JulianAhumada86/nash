const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');
const modalTitle = document.getElementById('modal-title');
const btnEnviar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
const copa = document.getElementById('btn-copa')
const btnVoy = document.getElementById('btn-voy')
let hotspotActivo = null; // Variable para recordar qué botón se presionó
var contador = 0
const miDato = window.location.hash.substring(1);
console.log(miDato)
if(miDato==""){
    console.log("No hay dato")
}

// Abrir modal
document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        hotspotActivo = hotspot; // Guardamos la referencia
        modalTitle.textContent = hotspot.getAttribute('data-name');
        modal.style.display = 'flex';
    });
});


function cerrarModal() {
    modal.style.display = 'none';
    document.querySelectorAll('input[name="rate"]').forEach(r => r.checked = false);
    hotspotActivo = null;
}


// Cerrar y guardar
btnEnviar.addEventListener('click', () => {
    const estrellaSeleccionada = document.querySelector('input[name="rate"]:checked');
    const valorEstrellas = estrellaSeleccionada ? estrellaSeleccionada.value : 0;
    
    if (!estrellaSeleccionada) {
        alert("Por favor, selecciona al menos una estrella antes de enviar.");
        return; // Detiene la ejecución si no hay estrellas
    }

    console.log("Sala:", modalTitle.textContent);
    console.log("Puntuación:", valorEstrellas);
    
    // --- AQUÍ ESTÁ LA MAGIA ---
    if (hotspotActivo) {
        hotspotActivo.classList.add('visto'); // Agrega la clase que apaga las ondas
    }
    contador++
    if (contador===7){
        activarFoto()
    }
    modal.style.display = 'none';
    modal2.style.display = 'none';
    
    // Limpieza
    document.querySelectorAll('input[name="rate"]').forEach(r => r.checked = false);
    hotspotActivo = null; // Reseteamos la referencia

    const miDato = window.location.hash.substring(1);
    cerrarModal();
    console.log(miDato)

});

btnCancelar.addEventListener('click', cerrarModal);

copa.addEventListener('click', () => {
    modal2.style.display = 'flex';
})
// Cerrar si hacen clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

function activarFoto(){
    console.log("Activar foto")
    copa.style.display = 'block'

}


btnVoy.addEventListener('click', () => {
    modal2.style.display = 'none';
});