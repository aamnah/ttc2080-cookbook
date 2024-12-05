import {
  fetchCookbooks,
  fetchCookbookById,
  fetchRecipes,
  fetchRecipeById,
} from "./api";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";

const listingContainer = document.querySelector("#listingContainer");

function renderCookbooks(cookbooks) {
  console.log(cookbooks);
  cookbooks.map((book) => {
    console.log(book);
    let html = `${book.name}`;

    listingContainer.innerHTML += html;
  });
}

async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  const headerContainer = document.querySelector("#headerContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
  headerContainer.innerHTML = renderHeader();

  let cookbooks = await fetchCookbooks();
  let recipes = await fetchRecipes();

  renderCookbooks(cookbooks);
}

run();
