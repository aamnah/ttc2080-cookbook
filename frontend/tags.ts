import renderSidebarHtml from "./components/sidebar";

async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
}

run();
