import { fetchRecipesByTag } from "./api";
import { getQueryParam } from "./helpers";
import renderCardHtml from "./components/card";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";

function renderRecipes(recipes) {
  const container = document.querySelector("#contentContainer");
  let html = ``;

  recipes.map((item) => {
    const { _id, title, image } = item;
    html += renderCardHtml({
      id: _id,
      link: `recipe?id=${_id}`,
      title,
    });
  });

  container.innerHTML = html;
}
async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
  const headerContainer = document.querySelector("#headerContainer");
  headerContainer.innerHTML = renderHeader();

  const name = getQueryParam(location, "id");
  const data = await fetchRecipesByTag(name);
  console.log(`data: ${data}`);

  document.title = data.title;
  renderRecipes(data);
}

run();
