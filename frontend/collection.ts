import { getQueryParam } from "./helpers";
import {
  fetchCookbookById,
  fetchRecipeById,
  fetchRecipesByName,
  fetchRecipesByCollectionId,
} from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";
import renderCard from "./components/card";
import renderCardBtn from "./components/cardNew";

function renderCookbook(id, cookbookTitle, recipes) {
  const container = document.querySelector("#contentContainer");
  let html = `
  <div>
    <h2 class="text-4xl">${cookbookTitle}</h2>
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

  console.log(`cookbook.items sent to render: ${recipes}`);

  container.innerHTML = html;
}
async function run() {
  initialRender();
  const id = getQueryParam(window.location, "id");

  const data = await fetchCookbookById(id);
  // TODO: Show all the recipes in the cookbook

  console.log(`cookbook: ${data}`);
  document.title = data.title;

  let recipes = [];
  for (let entry of data.items) {
    console.log(`ID or Name: ${entry}`);
    const recipeById = await fetchRecipeById(entry); // [{}] for each recipe, one recipe is {}
    const recipesByName = await fetchRecipesByName(entry); // [{}, {}, {}]
    console.log(
      `
    fetchRecipesByName(${entry}): ${recipesByName};
    fetchRecipeById(${entry}): ${recipeById};
    `
    );

    if (recipeById && !("error" in recipeById)) {
      console.dir(
        `Found recipe by ID: ${recipeById}. Type of recipeById: ${typeof recipeById}`
      );
      recipes.push(recipeById);
    } else if (recipesByName) {
      if (!("error" in recipesByName)) {
        // Many recipes can be returned by a name
        // data will be [{}, {}]
        console.log(`Found recipes by Name: ${recipesByName}`);
        recipes = recipes.concat(recipesByName);
      }
    }
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

// async function testEndpoints() {
//   console.log(
//     `
//     fetchRecipesByName('pasta'): ${await fetchRecipesByName("pasta")};
//     fetchRecipeById('6752eca5fabf10ff02ca4484'): ${await fetchRecipeById(
//       "6752eca5fabf10ff02ca4484"
//     )};
//     fetchRecipesByCollectionId('6752ec52fabf10ff02ca447a'): ${await fetchRecipesByCollectionId(
//       "6752ec52fabf10ff02ca447a"
//     )};
// }
//   `
//   );
// }
// testEndpoints();
