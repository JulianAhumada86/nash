const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');
const modalTitle = document.getElementById('modal-title');
const btnEnviar = document.getElementById('btn-enviar');
const modalInfo = document.getElementById('modal-info');
const btnCancelar = document.getElementById('btn-cancelar');
const copa = document.getElementById('btn-copa')
const btnListo = document.getElementById('btn-listo');
const btnVoy = document.getElementById('btn-voy')
const cabecera = document.getElementById('cabecera')
const dataEstadios = {
    "btn-3A": { nombre: "Maracaná del Fondo del Mar", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/3A.png", estrellas: 0 },
    "btn-3B": { nombre: "Soccer City de la Selva", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/3B.png", estrellas: 0 },
    "btn-4A":{ nombre: "Monumental de los Dinosaurios", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/4A.png", estrellas: 0 },
    "btn-4B": { nombre: "Azteca de los Superhéroes", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/4B.png", estrellas: 0 },
    "btn-5A": { nombre: "Yokohama del Espacio", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/5A.png", estrellas: 0 },
    "btn-1er": { nombre: "Lusail de Ciudad Robot", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/1er.png", estrellas: 0 },
    "btn-2do":{ nombre: "Wembley de las Olimpiadas", mensaje: "¡Ya podes retirar tu figurita!", img: "salas/2do.png", estrellas: 0 },

    };


let hotspotActivo = null; // Variable para recordar qué botón se presionó
var contador = 0



// Abrir primer modal
document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        hotspotActivo = hotspot;
        if (hotspot.classList.contains('visto')) {
            // Si ya fue votado, mostramos directamente la info
            mostrarModalInfo();
        } else {
            // Si no fue votado, mostramos el modal de votación
            document.getElementById('modal-title').textContent = hotspot.getAttribute('data-name');
            modal.style.display = 'flex';
        }
    });
});

function cerrarModal() {
    modal.style.display = 'none';
    document.querySelectorAll('input[name="rate"]').forEach(r => r.checked = false);
    hotspotActivo = null;
}


// Cerrar y guardar
btnEnviar.addEventListener('click', () => {
    const radio = document.querySelector('input[name="rate"]:checked');
    if (!radio) return alert("Selecciona una estrella");

    const id = hotspotActivo.id;
    dataEstadios[id].estrellas = radio.value;
    hotspotActivo.classList.add('visto');
    
    // Configurar y mostrar modal info
    document.getElementById('info-title').textContent = dataEstadios[id].nombre;
    document.getElementById('info-message').textContent = dataEstadios[id].mensaje;
    document.getElementById('info-img').src = dataEstadios[id].img;
    document.getElementById('info-stars').textContent = "⭐".repeat(dataEstadios[id].estrellas);
    
    modal.style.display = 'none';
    modalInfo.style.display = 'flex';
    
    // Lógica del contador
    contador++;
    if (contador === 7) activarFoto();
});

btnCancelar.addEventListener('click', cerrarModal);

copa.addEventListener('click', () => {
    modal2.style.display = 'flex';
})
// Cerrar si hacen clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});




btnVoy.addEventListener('click', () => {
    modal2.style.display = 'none';
});

btnListo.addEventListener('click', () => {
    modalInfo.style.display = 'none';
    document.querySelectorAll('input[name="rate"]').forEach(r => r.checked = false);
});



function mostrarModalInfo() {
    const id = hotspotActivo.id;
    const datos = dataEstadios[id]; // Asegúrate de tener los datos cargados aquí
    
    document.getElementById('info-title').textContent = datos.nombre;
    document.getElementById('info-message').textContent = datos.mensaje;
    document.getElementById('info-img').src = datos.img;
    document.getElementById('info-stars').textContent = "⭐".repeat(datos.estrellas);
    
    modalInfo.style.display = 'flex';
}


cabecera.addEventListener('click', () => {
    activarFoto()
}); 

function activarFoto(){
    console.log("Activar foto")
    copa.style.display = 'block'

    const puntuaciones =[] 
    const llaves = Object.keys(dataEstadios); 

    // Ahora recorremos las llaves
    for (let i = 0; i < llaves.length; i++) {
        const id = llaves[i]; // Esto será "btn-5A", "btn-1er", etc.
        puntuaciones.push(dataEstadios[id].estrellas);
    }

    enviar(puntuaciones)
}

//https://script.google.com/macros/s/AKfycbz_6B-zC_0yMu2fQxXfg8pbZlBA_r8SXudengeCNwua1Xpm6fwVVPaVIlorT7keXp4F/exec

// Asegúrate de que esta es la URL de tu LATEST DEPLOYMENT


function enviar(datos) {
    const URL = 'https://script.google.com/macros/s/AKfycbxRnwNOmZowWLEvkoCaHN-xyZBKlPrOnB9OZO4q1v6rcrE2q0FUFYsTyFOzKUPq0mtW/exec';
    fetch(URL,{
    method:"POST",
    headers:{
        "Content-Type":"text/plain"
    },
    body:JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => console.log("Éxito:", data))
    .catch(err => console.error("Error definitivo:", err));
}