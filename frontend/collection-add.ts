import { createCollection } from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";

function renderView() {
  const container = document.querySelector("#contentContainer");
  let html = `
  <div>
    <h2 class="text-4xl">Create a new collection</h2>
    <div class="mt-2 flex flex-wrap flex-col gap-4">
      <div class="block">
        <label for="collectionTitle">Title</label> <br>
        <input type="text" name="collectionTitle" id="collectionTitle" placeholder="" class="block w-full rounded border-2 border-orange-200 px-2 py-2 text-lg"/>
      </div>
      <p id="statusText" class="font-semibold"></p>
      
      <div class="mt-4 flex gap-4">
        <a href="" class="bg-orange-200 px-6 py-4 rounded" id="addCollection">Save</a>
        <a href="" class="border border-orange-200 px-6 py-4 rounded" id="cancelBtn">Cancel</a>
      </div>
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

  renderView();

  const addCollectionBtn = document.querySelector("#addCollection");
  const collectionTitleInput = document.querySelector("input#collectionTitle");
  const statusTextContainer = document.querySelector("#statusText");

  addCollectionBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    let statusText = "";
    try {
      const title = collectionTitleInput.value;
      const thumbnail = "/static/demo/placeholder.png";
      createCollection({ title, thumbnail });
      statusText = `<span class="text-green-500">Successfully created new collection.</span>`;
      statusTextContainer.innerHTML = statusText;
    } catch (err) {
      statusText = `<span class="text-green-500">Could not create collection. ${err}</span>`;
      console.error(statusText);
      statusTextContainer.innerHTML = statusText;
    }
  });

  // Cancel button
  document.querySelector("#cancelBtn").addEventListener("click", (event) => {
    event.preventDefault();
    history.back();
  });
}

run();
