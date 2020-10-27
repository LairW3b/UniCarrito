//Variables para el btn Carrito
const btnCarrito = document.querySelector('#iconoCarrito');
const verCarrito = document.querySelector('#verCarrito');

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#btnVaciar');
const listaCursos =document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventos();
function cargarEventos(){
    btnCarrito.addEventListener('click', MostrarOcultar);
    //agragarCurso
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //resetear arreglo
        limpiarHTML(); //Eliminar html
    })

}


//FUNCIONES PARA AGREGAR AL CARRITO
function agregarCurso(e){
    if(e.target.classList.contains('btnAgregar')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('cerrar')) {
        const cursoId = e.target.getAttribute('data-id');
        //eliminar de arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}

//LEER INFORMACION DEL CURSO
function leerDatosCurso(curso){
    //creando objeto del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.precioDescuento').textContent,
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1 
    }
    
    //Revisa si un elemento ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
         //AGREGAR ELEMENTO AL ARREGLO DEL CARRITO
    articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//rellenar carrito en el HTML
function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();
    //recorriendo el carrito
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src=${curso.imagen} width='50px'>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="cerrar" data-id="${curso.id}">x</a>
            </td>
        `;
        //agregar el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }  
}

//Funciones para MOSTRAR Y OCULTAR EL CARRITO
function MostrarCarrito(){
    verCarrito.style.display = 'block';
}
function OcultarCarrito(){
    verCarrito.style.display = 'none';
}
function MostrarOcultar(){
    if(verCarrito.style.display == 'none'){
        MostrarCarrito();
    }else{
        OcultarCarrito();
    }
}