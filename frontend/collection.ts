import { getQueryParam } from "./helpers";
import { fetchCookbookById, fetchRecipeById } from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";
import renderCard from "./components/card";
import renderCardBtn from "./components/cardNew";

function renderCookbook(id, title, recipes) {
  const container = document.querySelector("#contentContainer");
  let html = `
  <div>
    <h2 class="text-4xl">${title}</h2>
    <div class="mt-2 flex flex-wrap gap-4">
    ${renderCardBtn({
      title: "Add New Recipe",
      link: `recipe-add?collectionId=${id}`,
      image: `/static/demo/placeholder_add.png`,
    })}
    ${
      recipes.length > 1
        ? recipes
            .map((recipe) => {
              const { _id, title, image } = recipe;
              return renderCard({
                id: _id,
                title,
                link: `recipe?id=${_id}`,
                // image: thumbnail,
              });
            })
            .join("")
        : `<p>This collection has no recipes at the moment. Feel free to add one.</p>`
    }
    </div>
  </div>
  `;

  console.log(`cookbook.items: ${recipes}`);

  container.innerHTML = html;
}
async function run() {
  initialRender();
  const id = getQueryParam(window.location, "id");

  const data = await fetchCookbookById(id);
  // TODO: Show all the recipes in the cookbook

  console.log(`cookbook: ${data}`);
  document.title = data.title;

  const recipes = [];
  for (let recipeId of data.items) {
    console.log(`recipeId: ${recipeId}`);
    fetchRecipeById(recipeId).then(() => {
      console.log(`recipe: ${recipe.title}`);
      recipes.push(recipe);
    });
  }

  console.log(`recipes: ${recipes}`);
  renderCookbook(id, data.title, recipes);
}

run();

function initialRender() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
  const headerContainer = document.querySelector("#headerContainer");
  headerContainer.innerHTML = renderHeader();
}