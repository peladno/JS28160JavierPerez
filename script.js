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

//clase para laa creacion de array de receta, que incluye array de ingredientes
class Receta {
  constructor(nombreReceta, procedimiento, ingredientes){
  this.id = recetas.length;  
  this.nombreReceta = nombreReceta;
  this.procedimiento = procedimiento;
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
    let ingrediente = document.getElementById('ingrediente'+[i]).value
    let cantidad = document.getElementById('cantidad'+[i]).value
    let medida = document.getElementById('medida'+[i]).value
    let precio = document.getElementById('precio'+[i]).value

    const ingredienteReceta = new Ingrediente (ingrediente, cantidad, medida, precio);
    listaIngredientes.push(ingredienteReceta);
  }
  let nombreReceta = document.getElementById('nombreReceta').value
  let procedimiento = document.getElementById('procedimiento').value
  
  let copiaListaingredientes = [...listaIngredientes] 

  if (document.getElementById('nombreReceta').value === "") {
    alerta.innerHTML += `*Por favor ingrese nombre de receta`
    document.getElementById('alerta').style.color = "red";
  } else {
    const receta = new Receta (nombreReceta, procedimiento, copiaListaingredientes);
    recetas.push(receta)
    localStorage.setItem('recetasLocales', JSON.stringify(recetas));
  }
  formReceta.reset()
})

//click para mostrar la ultima receta ingresada
mostrar.addEventListener('click', () => {

  let recetasLocales = JSON.parse(localStorage.getItem('recetasLocales'))
  let ultimaReceta = recetas[recetasLocales.length-1];
  
  let ingredientesUltimaReceta = ultimaReceta.ingredientes;
  let nombreUltimaReceta = ultimaReceta.nombreReceta;
  let procedimientoUltimaReceta = ultimaReceta.procedimiento;
  
  //funcion para sumar costos de ingredientes usados
  let valorTotal = ingredientesUltimaReceta.reduce((valorAcc, item) => { 
    return valorAcc + item.precioTotal;
  }, 0); 


  tituloRecetaCompleta.innerHTML += `${nombreUltimaReceta}`
  listaIngredientesFinal.innerHTML += `<h3>Ingredientes:</h3>`
  procedimientoReceta.innerHTML += `<h3>Procedimiento:</h3>
  ${procedimientoUltimaReceta}<br>
  <br>
  El costo total de la receta es de $${valorTotal}
  `
  //Recorre ingredientes parseados y los deja como lista
  ingredientesUltimaReceta.forEach(ingrediente => { 
    listaIngredientesFinal.innerHTML += `
      <li>${ingrediente.cantidad} ${ingrediente.unidadDeMedida} de ${ingrediente.nombre}</li>`
  })

})
