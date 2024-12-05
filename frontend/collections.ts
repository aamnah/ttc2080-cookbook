import renderSidebarHtml from "./components/sidebar";
import { fetchCookbooks } from "./api";
import renderCard from "./components/card";
import renderHeader from "./components/header";
import renderCardNew from "./components/cardNew";

function renderCookbooks(cookbooks) {
  const container = document.querySelector("#contentContainer");
  let html = `
      <div>
      <h2 class="text-4xl" data-editable>Collections</h2>
      <div class="mt-2 flex flex-wrap gap-4">
      ${renderCardNew({
        title: "Add New Collection",
        link: `collections/add`,
        image: `/static/demo/placeholder_add.png`,
      })}
      ${cookbooks
        .map((item) => {
          const { _id, title, image } = item;
          return renderCard({
            id: _id,
            title,
            link: `collection?id=${_id}`,
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
  headerContainer.innerHTML = renderHeader();

  const data = await fetchCookbooks();

  console.log(`cookbooks: ${data}`);

  renderCookbooks(data);
}

run();
