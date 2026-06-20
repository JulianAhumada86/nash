//https://script.google.com/macros/s/AKfycbwhMeVlciOmaE9OeGthDjdUdYzi6rygNax77WdyL2WMNDYd7IZ1RKSMgQh7bd7PGvY/exec

const URL_API = 'https://script.google.com/macros/s/AKfycbwhMeVlciOmaE9OeGthDjdUdYzi6rygNax77WdyL2WMNDYd7IZ1RKSMgQh7bd7PGvY/exec'; // <--- Pega aquí tu URL

// Función para guardar (POST)
async function registrar() {
    const nombre = document.getElementById('nombreInput').value;
    const res = await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ nombre: nombre })
    });
    const data = await res.json();
    document.getElementById('registroRespuesta').innerText = 
        "¡Registrado con éxito! Tu ID es: " + data.id;
}

// Función para buscar (GET)
async function consultar() {
    const id = document.getElementById('idInput').value;
    const res = await fetch(`${URL_API}?id=${id}`);
    const data = await res.json();
    
    if (data.nombre) {
        document.getElementById('consultaRespuesta').innerText = 
            "La familia asociada al ID " + id + " es: " + data.nombre;
    } else {
        document.getElementById('consultaRespuesta').innerText = "ID no encontrado.";
    }
}