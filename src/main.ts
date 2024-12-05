import {
  fetchCookbooks,
  fetchCookbookById,
  fetchRecipes,
  fetchRecipeById,
} from "./api";

const listingContainer = document.querySelector("#listingContainer");

function renderCookbooks(cookbooks) {
  cookbooks.map((book) => {
    let html = `${book.name}`;

    listingContainer.innerHTML += html;
  });
}

document.onload = async () => {
  let cookbooks = await fetchCookbooks();
  let recipes = await fetchRecipes();

  renderCookbooks(cookbooks);
};
