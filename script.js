//clase para la creacion de array de ingredientes
class Ingredient {
  constructor(name, quantity, measure, price) {
    this.nombre = name;
    this.quantity = quantity;
    this.measure = measure; 
    this.price = price;
    this.Totalprice = this.quantity * this.price; 
  }
};

//clase para la creacion de array de receta, que incluye array de ingredientes
class Recipe {
  constructor(recipeName, method, description, ingredients){
  this.id = recipes.length;  
  this.recipeName = recipeName;
  this.method = method;
  this.description = description;
  this.ingredients = ingredients;
  }
}

//arrays usados
let ingredientsList = []; 
let recipes = [];

//if para que queden los array en localstorage, si no se haace al hacer refresh se borran
if(localStorage.getItem('localRecipes')) {
  recipes = JSON.parse(localStorage.getItem('localRecipes'))
} else {
  localStorage.setItem('localRecipes', JSON.stringify(recipes))
}

let ingredients = document.getElementById('ingredients');
let recipeForm = document.getElementById('recipeForm');
let save = document.getElementById('save');
let show = document.getElementById('show');


//click para agregar nuevos inputs
add.addEventListener('click', (e) => {
  e.preventDefault()

  //se setea un vaalor de un click
  let clicks = parseInt(document.getElementById('total_chq').value)+1;

  //div creados con los inputs correspondientes
  let newInputs = document.createElement("div");
    newInputs.innerHTML = `
      <input type="text" placeholder="Cantidad" id="cantidad${clicks}" name="cantidad${clicks}">
      <input type="text" placeholder="Medida" id="medida${clicks}" name="medida${clicks}">
      <input type="text" placeholder="Ingrediente" id="ingrediente${clicks}" name="ingrediente${clicks}">
      <input type="text" placeholder="Precio" id="precio${clicks}" name="precio${clicks}">
      `
    ingredients.append(newInputs);

    //se iguala con let clicks para que un nuevo click se añada +1
    document.getElementById('total_chq').value = clicks;
})

//click para remover inputs
remove.addEventListener('click', (e) => {
  e.preventDefault()

  let clicks2 = document.getElementById('total_chq').value;

  if (clicks2 >= 1){
    //operario avanzado para remover inputs
    clicks2 > 0 &&
    document.getElementById('quantity'+clicks2).remove();
    document.getElementById('measure'+clicks2).remove();
    document.getElementById('ingredient'+clicks2).remove();
    document.getElementById('price'+clicks2).remove();
    document.getElementById('total_chq').value = clicks2 -1;
  }
})

//submit para pushear los ingredientes al array listaIngredientes y racetas al array recetas
formRecipe.addEventListener('submit', (e) => { 
  e.preventDefault()

  let parentInputs = document.getElementById('ingredients');
  //este length me da la cantidad de hijos que tiene el div, asi usarlo en el for que sigue
  let numberOfChildrens = parentInputs.children.length; 

  for (let i = 0; i <= numberOfChildrens; i++) {
    let ingredient = DOMPurify.sanitize(document.getElementById('ingredient'+[i]).value);
    let quantity = DOMPurify.sanitize(document.getElementById('quantity'+[i]).value);
    let measure = DOMPurify.sanitize(document.getElementById('measure'+[i]).value);
    let price = DOMPurify.sanitize(document.getElementById('price'+[i]).value);

    const recipeIngredient = new Ingredient (ingredient, quantity, measure, price);
    ingredientsList.push(recipeIngredient);
  }
  let recipeName = DOMPurify.sanitize(document.getElementById('recipeName').value);
  let method = DOMPurify.sanitize(document.getElementById('method').value);
  let description = DOMPurify.sanitize(document.getElementById('description').value);
  
  let ingredientsListCopy = [...ingredientsList] 

  if (document.getElementById('recipeName').value === "") {
    //Se utilizó libreria "Sweet alert" para mostrar una alerta de error
    Swal.fire(
      'Error',
      'Por favor ingrese nombre de receta',
      'error'
    )
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
        const recipe = new Recipe (recipeName, method, description, ingredientsListCopy);
        recipes.push(recipe)
        localStorage.setItem('localRecipes', JSON.stringify(recipes));
        getContainDiv();
        formRecipe.reset();
      }
    })
  }
})

function getContainDiv() {

  let modalRecipes = document.getElementById('modalRecipes')
  let localRecipes = JSON.parse(localStorage.getItem('localRecipes'));

  //creacion div container
  const divContainer = document.createElement("div");
  divContainer.className = "row";
  divContainer.id = "divContainer";

    for (let i = 0; i < localRecipes.length; i++) {

      //se crea div que contiene una receta
      const divRecipe = document.createElement("div");
      divRecipe.className = "card border-info mb-3";
      divRecipe.style = "max-width: 20rem;";
      divRecipe.id = "recipeID" + [i]; 
    
      const title = document.createElement("div");
      title.textContent = `${localRecipes[i].recipeName}`;
      title.className = "card-header";
    
      const subTitle = document.createElement ("h3");
      subTitle.textContent = `Descripción`
    
      const paragraph = document.createElement("p");
      paragraph.textContent = `${localRecipes[i].description}`;

      const modalButton = document.createElement("button");
      modalButton.textContent = "Show";
      modalButton.type = "button";
      modalButton.className ="btn btn-primary";
      modalButton.setAttribute ("data-bs-toggle", "modal");
      modalButton.setAttribute ("data-bs-target", "#modalRecipeID" + [i]);

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-lg btn-outline-danger";
      deleteButton.ariaLabel = "Borrar" + `${localRecipes[i].recipeName}`;
      deleteButton.value = `${localRecipes[i].id}`;
      deleteButton.textContent = `Eliminar Receta`;
     

        //se agrega todo junto a los div en orden
      divContainer.appendChild(divRecipe);    
      divRecipe.appendChild(title);
      divRecipe.appendChild(subTitle);
      divRecipe.appendChild(paragraph);
      divRecipe.appendChild(modalButton);
      divRecipe.appendChild(deleteButton);
      
      //crear modal
      let str = `
        <div class="modal fade" id="modalRecipeID${[i]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalRecipeID${[i]}">${localRecipes[i].recipeName}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                  <h6>Ingredientes:</h6>
                  <ul>
                  `
            
      for (let n = 0; n < localRecipes[i].ingredients.length; n++ ) {
        str += `
        <li>${localRecipes[i].ingredients[n].nombre}</li>
        `
      }
      str += `
        </ul>
        <h6>Procedimiento:</h6>
        <p>${localRecipes[i].method}</p>
        </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>`
    
      modalRecipes.innerHTML += str;

    }
    
      const content = document.getElementById('recipeList');
      content.innerHTML = "";
      content.appendChild(divContainer);
}

document.addEventListener("DOMContentLoaded", function(e){
  getContainDiv();
})

//asincronismo archivo JSON
let jsonList = document.getElementById('jsonRecipeList')
let jsonModalList = document.getElementById('jsonModalList')

async function getRecipes() {
  const response = await fetch('recipes.json')
  return await response.json()
}

getRecipes().then(severalRecipes => {
  
  for (let i = 0; i < severalRecipes.length; i++) {
  
    jsonList.innerHTML += `
    <div class="card border-info mb-3" style="max-width: 20rem;">
    <div class="card-header">${severalRecipes[i].name}</div>
    <div class="card-body">
      <h4 class="card-title">Descripción</h4>
      <p class="card-text">${severalRecipes[i].description}</p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recetaJsonModalID${[i]}">Mostrar</button>
    </div>
    </div>
    `

    //modal Json
    let str = `
        <div class="modal fade" id="recetaJsonModalID${[i]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="recetaJsonModalID${[i]}">${severalRecipes[i].name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                  <h6>Ingredientes:</h6>
                  <ul>
                  `
            
      for (let n = 0; n < severalRecipes[i].ingredients.length; n++ ) {
        str += `
        <li>${severalRecipes[i].ingredients[n].name}</li>
        `
      }
      str += `
        </ul>
        <h6>Procedimiento:</h6>
        <p>${severalRecipes[i].procedimiento}</p>
        </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>`
    
      jsonModalList.innerHTML += str;
  }
})


//borrar receta usando boton
const recipeList = document.getElementById('recipeList');

function deleteRecipes(id){
  recipes = recipes.filter(item => item.id !== id);

  //se elimina receta del DOM
  const recipe = document.getElementById('recipeID' + id);
  recipe.parentNode.removeChild(recipe);

  //se actualiza localstorage
  localStorage.setItem('localRecipes', JSON.stringify(recipes));
};

recipeList.addEventListener('click', (e) => {

  if (e.target.matches('.btn.btn-lg.btn-outline-danger')) {
    deleteRecipes(Number(e.target.value))
  };

});


// tratando de hacer barra busqueda
const searchBar = document.getElementById('search');

searchBar.addEventListener('keyup', (e) => {
  
  let localRecipes = JSON.parse(localStorage.getItem('localRecipes'));

  const searchString = e.target.value.toLowerCase();
  const filteredRecipes = localRecipes.filter( item => {

    return item.recipeName.toLowerCase().includes(searchString);

  })
  console.log(filteredRecipes)
  
})
