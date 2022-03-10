let listaIngredientes = []; 
let recetas = [];

/*
if(localStorage.getItem('ingredientesLocales')) {
  listaIngredientes = JSON.parse(localStorage.getItem('ingredientesLocales'))
} else {
  localStorage.setItem('ingredientesLocales', JSON.stringify(listaIngredientes))
}*/

class Receta {
  constructor(nombreReceta, procedimiento, ingredientes){
  this.id = recetas.length;  
  this.nombreReceta = nombreReceta;
  this.procedimiento = procedimiento;
  this.ingredientes = ingredientes;
  }
}

class Ingrediente {
  constructor(nombre, cantidad, unidadDeMedida, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.unidadDeMedida = unidadDeMedida; 
    this.precio = precio;
    this.precioTotal = this.cantidad * this.precio; 
  }
};

let ingredientes = document.getElementById('ingredientes');
let formReceta = document.getElementById('formReceta');
let guardar = document.getElementById('guardar');
let mostrar = document.getElementById('mostrar');


//click para agregar nuevos inputs
ingresar.addEventListener('click', (e) => {
  e.preventDefault()

  let clicks = parseInt(document.getElementById('total_chq').value)+1;

  let inputsNuevos = document.createElement("div");
    inputsNuevos.innerHTML = `
      <input type="text" placeholder="Cantidad" id="cantidad${clicks}" name="cantidad${clicks}">
      <input type="text" placeholder="Medida" id="medida${clicks}" name="medida${clicks}">
      <input type="text" placeholder="Ingrediente" id="ingrediente${clicks}" name="ingrediente${clicks}">
      <input type="text" placeholder="Precio" id="precio${clicks}" name="precio${clicks}">
      `
    ingredientes.append(inputsNuevos);
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

//submit para pushear los ingredientes al array listaIngredientes
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
    //localStorage.setItem('ingredientesLocales', JSON.stringify(listaIngredientes));
  }
  let nombreReceta = document.getElementById('nombreReceta').value
  let procedimiento = document.getElementById('procedimiento').value
  
  let copiaListaingredientes = [...listaIngredientes] 

  const receta = new Receta (nombreReceta, procedimiento, copiaListaingredientes);
  recetas.push(receta)
})

/*
//click que se usa para mostrar la receta hecha
mostrar.addEventListener('click', () => { 

  //if...else para por lo menos agregar nombre en receta
  if (document.getElementById('nombreReceta').value === "") {
    alerta.innerHTML += `*Por favor ingrese nombre de receta`
    document.getElementById('alerta').style.color = "red";
  } else {
    
    let ingredientesGuardados = JSON.parse(localStorage.getItem('ingredientesLocales'))
    let nombreReceta = document.getElementById('nombreReceta').value
    let procedimiento = document.getElementById('procedimiento').value
    
    //copia del array de ingredientes
    let copiaListaingredientes = [...listaIngredientes] 

    //funcion para sumar costos de ingredientes usados
    let valorTotal = copiaListaingredientes.reduce((valorAcc, item) => { 
      return valorAcc + item.precioTotal;
    }, 0); 

    tituloRecetaCompleta.innerHTML += `${nombreReceta}`
    listaIngredientesFinal.innerHTML += `<h3>Ingredientes:</h3>`
    procedimientoReceta.innerHTML += `<h3>Procedimiento:</h3>
    ${procedimiento}<br>
    <br>
    El costo total de la receta es de $${valorTotal}
    `
    //Recorre ingredientes parseados y los deja como lista
    ingredientesGuardados.forEach(ingrediente => { 
      listaIngredientesFinal.innerHTML += `
        <li>${ingrediente.cantidad} ${ingrediente.unidadDeMedida} de ${ingrediente.nombre}</li>`
    })
    //formateo de receta despues de hacer click
    formReceta.reset()
  }
})
*/

console.log(recetas)