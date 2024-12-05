import renderSidebarHtml from "./components/sidebar";
import { fetchCookbooks } from "./api";
import renderCard from "./components/card";

function renderCookbooks(cookbooks) {
  const container = document.querySelector("#contentContainer");
  let html = ``;

  cookbooks.map((item) => {
    const { _id, title, image } = item;
    html += renderCard({
      id: _id,
      title,
      link: `recipe?id=${_id}`,
    });
  });

  container.innerHTML = html;
}
async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();

  const data = await fetchCookbooks();

  console.log(`cookbooks: ${data}`);

  renderCookbooks(data);
}

run();
