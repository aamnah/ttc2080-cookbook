import { fetchRecipes } from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderCard from "./components/card";

function renderRecipes(recipes) {
  const container = document.querySelector("#contentContainer");
  let html = ``;

  recipes.map((item) => {
    const { _id, title, image } = item;
    html += renderCard({
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

  const data = await fetchRecipes();
  console.log(`data: ${data}`);

  renderRecipes(data);
}
run();
