//clase para la creacion de array de ingredientes
class Ingrediente {
  constructor(nombre, cantidad, unidadDeMedida, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.unidadDeMedida = unidadDeMedida; 
    this.precio = precio;
    this.precioTotal = this.cantidad * this.precio; 
  }
};

//clase para la creacion de array de receta, que incluye array de ingredientes
class Receta {
  constructor(nombreReceta, procedimiento, descripcion, ingredientes){
  this.id = recetas.length;  
  this.nombreReceta = nombreReceta;
  this.procedimiento = procedimiento;
  this.descripcion = descripcion;
  this.ingredientes = ingredientes;
  }
}

//arrays usados
let listaIngredientes = []; 
let recetas = [];

//if para que queden los array en localstorage, si no se haace al hacer refresh se borran
if(localStorage.getItem('recetasLocales')) {
  recetas = JSON.parse(localStorage.getItem('recetasLocales'))
} else {
  localStorage.setItem('recetasLocales', JSON.stringify(recetas))
}

let ingredientes = document.getElementById('ingredientes');
let formReceta = document.getElementById('formReceta');
let guardar = document.getElementById('guardar');
let mostrar = document.getElementById('mostrar');


//click para agregar nuevos inputs
ingresar.addEventListener('click', (e) => {
  e.preventDefault()

  //se setea un vaalor de un click
  let clicks = parseInt(document.getElementById('total_chq').value)+1;

  //div creados con los inputs correspondientes
  let inputsNuevos = document.createElement("div");
    inputsNuevos.innerHTML = `
      <input type="text" placeholder="Cantidad" id="cantidad${clicks}" name="cantidad${clicks}">
      <input type="text" placeholder="Medida" id="medida${clicks}" name="medida${clicks}">
      <input type="text" placeholder="Ingrediente" id="ingrediente${clicks}" name="ingrediente${clicks}">
      <input type="text" placeholder="Precio" id="precio${clicks}" name="precio${clicks}">
      `
    ingredientes.append(inputsNuevos);

    //se iguala con let clicks para que un nuevo click se añada +1
    document.getElementById('total_chq').value = clicks;

})

//click para remover inputs
eliminar.addEventListener('click', (e) => {
  e.preventDefault()

  let clicks2 = document.getElementById('total_chq').value;

  //operario avanzado para remover inputs
  clicks2 > 0 &&
    document.getElementById('cantidad'+clicks2).remove();
    document.getElementById('medida'+clicks2).remove();
    document.getElementById('ingrediente'+clicks2).remove();
    document.getElementById('precio'+clicks2).remove();
    document.getElementById('total_chq').value = clicks2 -1;
  
})

//submit para pushear los ingredientes al array listaIngredientes y racetas al array recetas
formReceta.addEventListener('submit', (e) => { 
  e.preventDefault()

  let padreInputs = document.getElementById('ingredientes');
  //este length me da la cantidad de hijos que tiene el div, asi usarlo en el for que sigue
  let cantidadHijos = padreInputs.children.length; 

  for (let i = 0; i <= cantidadHijos; i++) {
    let ingrediente = DOMPurify.sanitize(document.getElementById('ingrediente'+[i]).value);
    let cantidad = DOMPurify.sanitize(document.getElementById('cantidad'+[i]).value);
    let medida = DOMPurify.sanitize(document.getElementById('medida'+[i]).value);
    let precio = DOMPurify.sanitize(document.getElementById('precio'+[i]).value);

    const ingredienteReceta = new Ingrediente (ingrediente, cantidad, medida, precio);
    listaIngredientes.push(ingredienteReceta);
  }
  let nombreReceta = DOMPurify.sanitize(document.getElementById('nombreReceta').value);
  let procedimiento = DOMPurify.sanitize(document.getElementById('procedimiento').value);
  let descripcion = DOMPurify.sanitize(document.getElementById('descripcion').value);
  
  let copiaListaingredientes = [...listaIngredientes] 

  if (document.getElementById('nombreReceta').value === "") {
    //Se utilizó libreria "Sweet alert" para mostrar una alerta de error
    Swal.fire(
      'Error',
      'Por favor ingrese nombre de receta',
      'error'
    )
    document.getElementById('alerta').style.color = "red";
  } else {
    //Se utilizó libreria "Sweet alert" para mostrar una alerta de guardado
    Swal.fire({
      title: '¿Desea guardar receta?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Guardado',
          'Su receta fue guardada!.',
          'success'
        )
        const receta = new Receta (nombreReceta, procedimiento, descripcion, copiaListaingredientes);
        recetas.push(receta)
        localStorage.setItem('recetasLocales', JSON.stringify(recetas));
        getContainDiv();
        modales();
      }
    })
  }
})

function getContainDiv() {

  let modalRecetas = document.getElementById('modalRecetas')
  let recetasLocales = JSON.parse(localStorage.getItem('recetasLocales'));
  //creacion div container
  const divContainer = document.createElement("div");
  divContainer.className = "row";

    for (let i = 0; i < recetasLocales.length; i++) {

      //se crea div que contiene una receta
      const divReceta = document.createElement("div");
      divReceta.className = "card border-info mb-3";
      divReceta.style = "max-width: 20rem;";
      divReceta.id = "recetaID" + [i]; 
    
      const titulo = document.createElement("div");
      titulo.textContent = `${recetasLocales[i].nombreReceta}`;
      titulo.className = "card-header";
    
      const subTitulo = document.createElement ("h3");
      subTitulo.textContent = `Descripción`
    
      const parrafo = document.createElement("p");
      parrafo.textContent = `${recetasLocales[i].descripcion}`;

      const botonModal = document.createElement("button");
      botonModal.textContent = "Mostrar";
      botonModal.type = "button";
      botonModal.className ="btn btn-primary";
      botonModal.setAttribute ("data-bs-toggle", "modal");
      botonModal.setAttribute ("data-bs-target", "#recetaModalID" + [i]);

        //se agrega todo junto a los div en orden
      divContainer.appendChild(divReceta);    
      divReceta.appendChild(titulo);
      divReceta.appendChild(subTitulo);
      divReceta.appendChild(parrafo);
      divReceta.appendChild(botonModal);

      let str = `
        <div class="modal fade" id="recetaModalID${[i]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="recetaModalID${[i]}">${recetasLocales[i].nombreReceta}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                  Ingredientes:
                  <ul>
                  `
            
      for (let n = 0; n < recetasLocales[i].ingredientes.length; n++ ) {
        str += `
        <li>${recetasLocales[i].ingredientes[n].nombre}</li>
        `
      }
      str += `
        </ul>
        <p>${recetasLocales[i].procedimiento}</p>
        </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>`
    
      modalRecetas.innerHTML += str;
    }
    
      const content = document.getElementById('listaRecetas');
      content.innerHTML = "";
      content.appendChild(divContainer);

}
    document.addEventListener("DOMContentLoaded", function(e){
      getContainDiv();
    })

//asincronismo 
let listaJson = document.getElementById('listaRecetasJSON')

async function obtenerRecetas() {
  const response = await fetch('recetas.json')
  return await response.json()
}

obtenerRecetas().then(recetasVarias => {
  
  for (let i = 0; i < recetasVarias.length; i++) {
  
    listaJson.innerHTML += `
    <div class="card border-info mb-3" style="max-width: 20rem;">
    <div class="card-header">${recetasVarias[i].nombre}</div>
    <div class="card-body">
      <h4 class="card-title">Descripción</h4>
      <p class="card-text">${recetasVarias[i].descripcion}</p>
      <button type="button" id="botonModal"class="btn btn-primary">Mostrar</button>
    </div>
  </div>
  `
  }
})
