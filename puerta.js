const URL_API = 'TU_URL_AQUI'; 
let contador = 0;

function agregarFila() {
    if (contador < 7) {
        contador++;
        const div = document.createElement('div');
        div.className = 'niño-fila';
        div.innerHTML = `
            <input type="text" class="nombre-niño" placeholder="Nombre del niño ${contador}">
            <select class="sala-niño">
                <option value="">Seleccionar Salita</option>
                <option value="Roja">Salita Roja</option>
                <option value="Azul">Salita Azul</option>
                <option value="Verde">Salita Verde</option>
            </select>
        `;
        document.getElementById('contenedor-niños').appendChild(div);
    }
    if (contador === 7) document.getElementById('btn-mas').style.display = 'none';
}

async function registrar() {
    const familia = document.getElementById('familia').value;
    const listaNiños = Array.from(document.querySelectorAll('.niño-fila')).map(fila => ({
        nombre: fila.querySelector('.nombre-niño').value,
        sala: fila.querySelector('.sala-niño').value
    })).filter(n => n.nombre && n.sala);

    if (!familia || listaNiños.length === 0) {
        alert("Completa el nombre de familia y al menos un niño.");
        return;
    }

    document.getElementById('mensaje').innerText = "Enviando...";

    try {
        await fetch(URL_API, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ familia, niños: listaNiños })
        });
        document.getElementById('mensaje').innerText = "¡Registro enviado con éxito!";
    } catch (e) {
        document.getElementById('mensaje').innerText = "Error de conexión.";
    }
}


//const URL_API = 'https://script.google.com/macros/s/AKfycbwhMeVlciOmaE9OeGthDjdUdYzi6rygNax77WdyL2WMNDYd7IZ1RKSMgQh7bd7PGvY/exec'; // <--- NO OLVIDES PEGAR TU URL AQUÍ