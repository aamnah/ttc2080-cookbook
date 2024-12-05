import {
  fetchCookbooks,
  fetchCookbookById,
  fetchRecipes,
  fetchRecipeById,
} from "./api";

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
  let cookbooks = await fetchCookbooks();
  let recipes = await fetchRecipes();

  renderCookbooks(cookbooks);
}

run();
