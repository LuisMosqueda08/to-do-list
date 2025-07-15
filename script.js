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

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌'

    //Evento para al hacer click en la X eliminar la tarea
    btnEliminar.addEventListener('click', () => {
        tareas = tareas.filter(t => t !== texto);//Se quita la tarea del array
        guardarEnLocalStorage();//Se guarda el nuyevo array
        li.remove();//Se quita el elemento del DOM
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
