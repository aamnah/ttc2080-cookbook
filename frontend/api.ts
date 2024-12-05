const apiBaseUrl = "http://localhost:3000/api";

export async function fetchRecipes() {
  try {
    const response = await fetch(`${apiBaseUrl}/recipes`);
    console.log(`response: ${response}`);
    const data = await response.json();
    console.log(`data: ${data}`);

    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get recipes: ${err}`);
  }
}

export async function fetchRecipeById(id: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/recipes/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get recipe by ID: ${id}\n ${err}`);
  }
}

export async function fetchCookbooks() {
  try {
    const response = await fetch(`${apiBaseUrl}/cookbooks`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get cookbooks: ${err}`);
  }
}

export async function fetchCookbookById(id: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/cookbooks/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get cookbook by ID: ${id} \n ${err}`);
  }
}
