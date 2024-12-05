import { endpoint } from "./constants";

export async function fetchRecipes() {
  try {
    const response = await fetch(endpoint.recipes);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`ERROR: Could not get recipes: ${err}`);
  }
}

export async function fetchRecipeById(id: string) {
  try {
    const response = await fetch(`${endpoint.recipes}/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`ERROR: Could not get recipe by ID: ${id}\n ${err}`);
  }
}

export async function fetchCookbooks() {
  try {
    const response = await fetch(endpoint.cookbooks);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`ERROR: Could not get cookbooks: ${err}`);
  }
}

export async function fetchCookbookById(id: string) {
  try {
    const response = await fetch(`${endpoint.cookbooks}/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`ERROR: Could not get cookbook by ID: ${id} \n ${err}`);
  }
}
