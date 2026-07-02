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
const fuegosContenedor = document.getElementById('fuegos-contenedor');

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
let intervaloFuegos = null
let aviso = true
document.addEventListener('DOMContentLoaded', () => {


});

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
   detenerFuegos();
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
    if(aviso && contador === 7 ){
        alert("Completasta las salas... quedá algo mas acá")
        aviso = false
    } 
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



    // Llamamos a la función fuegos pasando las coordenadas
    encenderFuegos() 

    // Lógica original de envío
    const puntuaciones = []; 
    const llaves = Object.keys(dataEstadios); 
    for (let i = 0; i < llaves.length; i++) {
        puntuaciones.push(dataEstadios[llaves[i]].estrellas);
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



function encenderFuegos() {
    // Si ya están prendidos, no hacer nada
    if (intervaloFuegos) return; 

    fuegosContenedor.style.display = 'block';
    
    // Genera una nueva partícula cada 100ms
    intervaloFuegos = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            crearParticula();
        }
    }, 60);
}


function detenerFuegos() {
    clearInterval(intervaloFuegos);
    intervaloFuegos = null;
    fuegosContenedor.style.display = 'none';
    fuegosContenedor.innerHTML = ''; // Limpiar todo
}


function crearParticula() {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        // Calcular posición relativa a la copa dentro del contenedor
        const rectCopa = copa.getBoundingClientRect();
        const rectMapa = document.querySelector('.map-container').getBoundingClientRect();
        
        const xPos = (rectCopa.left + rectCopa.width / 2) - rectMapa.left;
        const yPos = (rectCopa.top + rectCopa.height / 2) - rectMapa.top;

        particula.style.left = `${xPos}px`;
        particula.style.top = `${yPos}px`;
        
        const colores = ['#2E2D82', '#4A90E2', '#8E7CC3', '#B2EBF2', '#F5F7FA', '#7F8C8D'];
        particula.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        
        particula.style.setProperty('--x', `${x}px`);
        particula.style.setProperty('--y', `${y}px`);
        particula.style.width = `${Math.random() * 8 + 5}px`;
        particula.style.height = particula.style.width;

        fuegosContenedor.appendChild(particula);
        setTimeout(() => particula.remove(), 1500);
    }