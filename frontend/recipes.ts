import { fetchRecipes } from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderCardHtml from "./components/card";
import renderHeaderHtml from "./components/header";
import renderCardBtn from "./components/cardNew";

function renderRecipes(recipes) {
  const container = document.querySelector("#contentContainer");
  let html = `
    <div>
      <h2 class="text-4xl" data-editable>Recipes</h2>
      <div class="mt-2 flex flex-wrap gap-4">
      ${renderCardBtn({
        title: "Add New Recipe",
        link: `recipe-add`,
        image: `/static/demo/placeholder_add.png`,
      })}
      ${recipes
        .map((item) => {
          const { _id, title, image } = item;
          return renderCardHtml({
            id: _id,
            link: `recipe?id=${_id}`,
            title,
          });
        })
        .join("")}
      </div>
    </div>
    `;

  container.innerHTML = html;
}

async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  const headerContainer = document.querySelector("#headerContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
  headerContainer.innerHTML = renderHeaderHtml();

  const data = await fetchRecipes();
  console.log(`data: ${data}`);

  renderRecipes(data);
}
run();
