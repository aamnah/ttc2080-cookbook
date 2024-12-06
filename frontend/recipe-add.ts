import { createRecipe } from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";
import renderSpinner from "./components/spinner";

function renderView() {
  const container = document.querySelector("#contentContainer");
  let html = `
  <div>
    <h2 class="text-4xl">Add a new recipe</h2>
    <div class="mt-2 flex flex-wrap flex-col gap-4">
      <div class="block">
        <label for="recipeTitle">Title</label> <br>
        <input type="text" name="recipeTitle" id="recipeTitle" placeholder="" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
      </div>
      
      <div class="flex gap-8">
        <div class="block">
          <label for="servingsCount">Servings</label> <br>
          <input type="text" name="servingsCount" id="servingsCount" placeholder="0" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
        </div>
        <div class="block">
          <label for="prepTime">Prep Time</label> <br>
          <input type="text" name="prepTime" id="prepTime" placeholder="0 mins" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
        </div>
        <div class="block">
          <label for="cookTime">Cooking Time</label> <br>
          <input type="text" name="cookTime" id="cookTime" placeholder="0 mins" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
        </div>
        <div class="block">
          <label for="totalTime">Total time</label> <br>
          <input type="text" name="totalTime" id="totalTime" placeholder="0 mins" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
        </div>
      </div>

      <div>
      <h3 class="text-2xl">Ingredients</h3>
        <div class="block">
          <label for="ingredientInput">Enter an item and hit Enter</label> <br>
          <div class="flex gap-2">
            <input type="text" name="ingredientInput" id="ingredientInput" placeholder="2 carrots" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
            <a class="bg-orange-100 py-2 px-4 rounded flex justify-center items-center text-center border border-orange-200 cursor-pointer">+</a>  
        </div>
        <ul id="ingredientsList" class="mt-4">
        </ul>
      </div>

      <div class="mt-4">
      <h3 class="text-2xl">Directions</h3>
        <div class="block">
          <label for="directionInput">Enter a step and hit Enter</label> <br>
          <div class="flex gap-2">
            <input type="text" name="directionInput" id="directionInput" placeholder="peel the carrots" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
            <a class="bg-orange-100 py-2 px-4 rounded flex justify-center items-center text-center border border-orange-200 cursor-pointer">+</a>
          </div>
        </div>
        <ul id="directionsList" class="mt-4">
        </ul>
      </div>      

      <p id="statusText" class="font-semibold"></p>
      
      <div class="mt-12 flex gap-4">
        <a href="" class="bg-orange-200 px-6 py-4 rounded" id="saveBtn">Save</a>
        <a href="" class="border border-orange-200 px-6 py-4 rounded" id="cancelBtn">Cancel</a>
      </div>
    </div>
  </div>
  `;

  container.innerHTML = html;
}

function initialRender() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();

  const headerContainer = document.querySelector("#headerContainer");
  headerContainer.innerHTML = renderHeader();
}

function gatherRequestBody(cookbookId) {
  // TODO: if a recipe is being added from a collection, pass the collection ID with the request
  const containerElement = {
    title: document.querySelector("input#recipeTitle"),
    servings: document.querySelector("input#servingsCount"),
    prepTime: document.querySelector("input#prepTime"),
    cookTime: document.querySelector("input#cookTime"),
    totalTime: document.querySelector("input#totalTime"),
    ingredients: document.querySelectorAll(".ingredientItem"),
    directions: document.querySelectorAll(".directionStep"),
  };
  const values = {};
  for (let elem in containerElement) {
    values[elem] = containerElement[elem].value;
  }
  const ingredients = [],
    directions = [];

  containerElement.ingredients.forEach((item) => {
    ingredients.push(item.innerText);
  });
  values.ingredients = ingredients;

  containerElement.directions.forEach((item) => {
    directions.push(item.innerText);
  });
  values.directions = directions;

  values.servings = parseInt(values.servings);

  // console.log(values.title);
  return values;
}

async function handleEvents() {
  // Add ingredients
  const ingredientInput = document.querySelector("input#ingredientInput");
  const ingredientsContainer = document.querySelector("#ingredientsList");
  ingredientInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let value = ingredientInput.value;
      ingredientsContainer.innerHTML += `<li class="ingredientItem" contenteditable="true">${value}</li>`;
      ingredientInput.value = "";
    }
  });

  // Direction steps
  const directionInput = document.querySelector("input#directionInput");
  const directionsContianer = document.querySelector("#directionsList");
  directionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let value = event.target.value;
      directionsContianer.innerHTML += `<li class="directionStep" contenteditable="true">${value}</li>`;
      event.target.value = "";
    }
  });

  // Save button
  const saveBtn = document.querySelector("#saveBtn");
  const statusTextContainer = document.querySelector("#statusText");
  saveBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    let statusText = "";
    try {
      createRecipe(gatherRequestBody());
      statusText = `<span class="text-green-500">Successfully created new recipe. Redirecting to Recipes listing page ${renderSpinner()}</span>`;
      statusTextContainer.innerHTML = statusText;
      window.setTimeout(() => {
        window.location.href = "/recipes";
      }, 5000);
    } catch (err) {
      statusText = `<span class="text-red-500">Could not create recipe. ${err}</span>`;
      console.error(statusText);
      statusTextContainer.innerHTML = statusText;
    }
    console.log(gatherRequestBody());
  });

  // Cancel button
  document.querySelector("#cancelBtn").addEventListener("click", (event) => {
    event.preventDefault();
    history.back();
  });
}

async function run() {
  initialRender();
  renderView();
  handleEvents();
}

run();