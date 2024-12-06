import { fetchRecipesByTagName } from "./api";
import { getQueryParam } from "./helpers";
import renderCardHtml from "./components/card";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";

function renderTag(tag, recipes) {
  const container = document.querySelector("#contentContainer");
  let html = `
    <div>
      <h2 class="text-4xl" data-editable>Tag: ${tag}</h2>
      <div class="mt-2 flex flex-wrap gap-4">
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
  sidebarContainer.innerHTML = renderSidebarHtml();
  const headerContainer = document.querySelector("#headerContainer");
  headerContainer.innerHTML = renderHeader();

  const name = getQueryParam(window.location, "name");
  const data = await fetchRecipesByTagName(name);
  console.log(`data: ${data}`);

  document.title = `Tag: ${name}`;
  renderTag(name, data);
}

run();
