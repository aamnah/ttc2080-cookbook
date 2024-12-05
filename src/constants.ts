// Endpoints
const apiBaseUrl = "/api";
const endpoint = {
  base: `${apiBaseUrl}/`,
  cookbooks: `${apiBaseUrl}/cookbooks`,
  cookbook: `${apiBaseUrl}/cookbooks/:id`,
  recipes: `${apiBaseUrl}/recipes/`,
  recipe: `${apiBaseUrl}/recipes/:id`,
  groceryLists: `${apiBaseUrl}/groceries`,
  groceryList: `${apiBaseUrl}/groceries/:id`,
};

export { endpoint };
