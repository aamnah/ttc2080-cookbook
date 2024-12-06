import { fetchRecipeById, deleteRecipeById, updateRecipeById } from "./api";
import { getQueryParam } from "./helpers";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";

const sampleData = {
  id: "6750d37b5237ce325c1c9a37",
};

async function renderRecipe(recipe) {
  const container = document.querySelector("#contentContainer");
  const {
    title,
    date,
    time,
    image,
    _id,
    servings,
    ingredients,
    directions,
    tags,
  } = recipe;
  // TODO: If cook time or any other time is 0, do NOT show it
  const html = `
    <div data-id="${_id}">
      <h2 id="recipeTitle" class="text-4xl" data-editable>${
        title ?? "Undefined"
      }</h2>
      <div class="mt-2 flex gap-4 items-center">
        <a href="" class="editBtn border border-orange-200 px-2 py-1 rounded">Edit recipe</a>
        <a href="" class="saveBtn hidden bg-orange-200 px-2 py-1 rounded">Save recipe</a>
        <a href="" class="cancelBtn hidden border border-orange-200 px-2 py-1 rounded">Cancel</a>
        <a href="" class="deleteBtn hidden border border-red-200 bg-red-200 px-2 py-1 rounded">Delete</a>
      </div>
      <nav class="flex gap-2 mt-4">
      ${
        tags
          ? tags
              .map(
                (tag) =>
                  `<a href="/tag?name=${tag}" class="bg-slate-300 px-2 py-1 rounded-md">${tag}</a>`
              )
              .join("")
          : ""
      }
      </nav>
      <img src="static/demo/placeholder.png" alt="${
        title ?? ""
      }" class="mt-4 rounded-2xl w-80 max-w-96">
      <ul class="mt-4">
            <li id="servingsCount" class="mt-2">Servings: <span data-editable class="inline-block min-w-32">${
              servings ?? ""
            }</span></li>

            <li class="mt-2">Prep time: <span data-editable id="prepTime" class="inline-block min-w-32">${
              time && time.prep ? time.prep : ""
            }</span></li>
  
            <li class="mt-2">Cook time: <span data-editable id="cookTime" class="inline-block min-w-32">${
              time && time.cook ? time.cook : ""
            }</span></li>

            <li class="mt-2">Total time: <span data-editable id="totalTime" class="inline-block min-w-32">${
              time && time.total ? time.total : ""
            }</span></li>
      </ul>
      <h3 class="text-2xl mt-6">Ingredients</h3>
      <ul>
        ${
          ingredients
            ? ingredients
                .map(
                  (i) =>
                    `<li data-editable class="ingredientItem mt-2">${i}</li>`
                )
                .join("")
            : ""
        }
      </ul>
      <h3 class="text-2xl mt-6">Directions</h3>
      ${
        directions
          ? Array.isArray(directions)
            ? `<ul>
        ${directions
          .map(
            (step) =>
              `<li data-editable class="directionStep mt-2">${step}</li>`
          )
          .join("")}
      </ul>`
            : `<p data-editable>${directions}</p>`
          : ""
      }

    </div>

      <div class="mt-12 flex justify-between">
        <div class="flex gap-4">
        <a href="" class="editBtn border border-orange-200 px-6 py-4 rounded">Edit</a>
        <a href="" class="saveBtn hidden bg-orange-200 px-6 py-4 rounded">Save</a>
        <a href="" class="cancelBtn hidden border border-orange-200 px-6 py-4 rounded">Cancel</a>
        </div>
        <a href="" class="deleteBtn hidden border border-red-200 bg-red-200 px-6 py-4 rounded flex no-wrap gap-1"><img src="/static/icon-trash.png">Delete</a>
      </div>

      <p id="statusText" class="font-semibold"></p>
  `;

  container.innerHTML = html;
  return true;
}

function gatherRequestBody() {
  const containerElement = {
    title: document.querySelector("#recipeTitle"),
    servings: document.querySelector("#servingsCount"),
    prepTime: document.querySelector("#prepTime"),
    cookTime: document.querySelector("#cookTime"),
    totalTime: document.querySelector("#totalTime"),
    ingredients: document.querySelectorAll(".ingredientItem"),
    directions: document.querySelectorAll(".directionStep"),
  };
  const values = {};
  for (let elem in containerElement) {
    values[elem] = containerElement[elem].innerText;
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

  // console.log(`Values from the editable areas are: ${values}`);
  return values;
}

function initialRender() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
  const headerContainer = document.querySelector("#headerContainer");
  headerContainer.innerHTML = renderHeader();
}

async function handleEvents(recipeId, data) {
  const statusTextContainer = document.querySelector("#statusText");
  let statusText;

  const editBtns = document.querySelectorAll(".editBtn");
  const saveBtns = document.querySelectorAll(".saveBtn");
  const cancelBtns = document.querySelectorAll(".cancelBtn");
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  const editableAreas = document.querySelectorAll("[data-editable]");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      editBtns.forEach((btn) => (btn.style.display = "none"));
      saveBtns.forEach((btn) => (btn.style.display = "flex"));
      cancelBtns.forEach((btn) => (btn.style.display = "flex"));
      deleteBtns.forEach((btn) => (btn.style.display = "flex"));
      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "true");
      });
    });
  });

  cancelBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      editBtns.forEach((btn) => (btn.style.display = "block"));
      saveBtns.forEach((btn) => (btn.style.display = "none"));
      cancelBtns.forEach((btn) => (btn.style.display = "none"));
      deleteBtns.forEach((btn) => (btn.style.display = "none"));

      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "false");
      });
      // TODO: revert changes back to original recipe
      renderRecipe(data);
    });
  });

  saveBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      editBtns.forEach((btn) => (btn.style.display = "block"));
      saveBtns.forEach((btn) => (btn.style.display = "none"));
      cancelBtns.forEach((btn) => (btn.style.display = "none"));
      deleteBtns.forEach((btn) => (btn.style.display = "none"));

      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "false");
      });
      // console.log(`Updated values are: ${gatherRequestBody()}`);

      // Call API to UPDATE recipe
      try {
        const updatedRecipe = await updateRecipeById(
          recipeId,
          gatherRequestBody()
        );

        if (updatedRecipe) {
          console.log("updated recipe", updatedRecipe);
          const done = await renderRecipe(updatedRecipe);
          const statusTextContainer = document.querySelector("#statusText");

          if (done) {
            statusText = `<span class="text-green-500">Successfully updated recipe.</span>`;
            statusTextContainer.innerHTML = statusText;
          }
        } else {
          console.error(`ERROR: Could not update recipe by ID: ${recipeId}`);
          statusText = `<span class="text-red-500">Could not update recipe.</span>`;
        }
        statusTextContainer.innerHTML = statusText;
        console.log(
          `1. statusText: ${statusText} \n statusTextContainer.innerHTML: ${statusTextContainer.innerHTML}`
        );
        window.setTimeout(() => {
          // Clear status message after 10 seconds
          statusTextContainer.innerHTML = "";
        }, 10000);
      } catch (err) {
        console.error(
          `ERROR: Something went wrong while updating the recipe by ID: ${recipeId} \n ${err}`
        );

        statusText = `<span class="text-red-500">Something went wrong while updating the recipe.</span>`;
        statusTextContainer.innerHTML = statusText;
        console.log(
          `2. statusText: ${statusText} \n statusTextContainer.innerHTML: ${statusTextContainer.innerHTML}`
        );
        window.setTimeout(() => {
          // Clear status message after 10 seconds
          statusTextContainer.innerHTML = "";
        }, 10000);
      }
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm("Are you sure you want to delete?") === true) {
        try {
          // Call API to DELETE recipe
          deleteRecipeById(recipeId);
          window.location.href = "/recipes";
        } catch (err) {
          console.error(`ERROR: Could not delete recipe by ID: ${recipeId}`);
        }
      }

      editBtns.forEach((btn) => (btn.style.display = "block"));
      saveBtns.forEach((btn) => (btn.style.display = "none"));
      cancelBtns.forEach((btn) => (btn.style.display = "none"));
      deleteBtns.forEach((btn) => (btn.style.display = "none"));

      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "false");
      });
    });
  });
}

async function run() {
  initialRender();
  const recipeId = getQueryParam(window.location, "id");
  const data = await fetchRecipeById(recipeId);

  console.log(`
    recipe id: ${recipeId}
    data: ${data}`);

  // Set page title to recipe name
  document.title = data.title;
  renderRecipe(data);
  handleEvents(recipeId, data);
}

run();
