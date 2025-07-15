// Seleccionamos el formulario, el input de texto y la lista donde se mostrarán las tareas
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

//Array para guardar las tareas
let tareas = [];

//Revisar si hay tareas guardadas en LS
document.addEventListener('DOMContentLoaded', () => {
    const tareasguardadas = localStorage.getItem('tareas')
    if (tareasguardadas){
        tareas = JSON.parse(tareasguardadas); //Se convierte el texto a array
        tareas.forEach(tarea => renderTarea(tarea));//Se muestran las tareas
    }
});

//Funcion para renderizar la tarea con un el boton para eliminarla
function renderTarea(texto){
    const li = document.createElement('li');
    li.textContent = texto;

    // Fondo aleatorio para la tarea
    const imagenAleatoria = imagenesFondo[Math.floor(Math.random() * imagenesFondo.length)];
    li.style.backgroundImage = `url('${imagenAleatoria}')`;
    li.style.backgroundSize = 'cover';
    li.style.backgroundPosition = 'center';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';

    btnEliminar.addEventListener('click', () => {
        tareas = tareas.filter(t => t !== texto);
        guardarEnLocalStorage();
        li.remove();
    });

    li.appendChild(btnEliminar);
    list.appendChild(li);
}

//Funcion para guardar el array en el LS
function guardarEnLocalStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
    //Se convierte el array a texto (JSON) para almacenarlo
}

//Cuando se envie el formulario agregar esa nueva tarea
form.addEventListener('submit', function (e) {
    e.preventDefault(); //Evitar recargar la pagina

    const texto = input.value.trim();//Obtiene el texto de la tarea
    if (texto == '') return;//No se agregan vacios

    tareas.push(texto); //agregamos el array
    guardarEnLocalStorage(); //se guarda el nuevo array
    renderTarea(texto); // se muestra la tarea
    input.value = ''; //se limpia el campo de entrada
});

const imagenesFondo = [
  'img/junjito2.jpg',
  'img/junjito3.jpg',
  'img/junjito4.jpg',
  'img/junjito5.jpg',
  'img/junjito6.jpg',
  'img/junjito7.jpg',
  'img/junjito8.jpg'
]


