// Endpoints
const apiBaseUrl = "/api";
const apiEndpoint = {
  base: `${apiBaseUrl}/`,
  cookbooks: `${apiBaseUrl}/cookbooks`,
  cookbook: `${apiBaseUrl}/cookbooks/:id`,
  recipes: `${apiBaseUrl}/recipes/`,
  recipe: `${apiBaseUrl}/recipes/:id`,
  groceryLists: `${apiBaseUrl}/groceries`,
  groceryList: `${apiBaseUrl}/groceries/:id`,
};

export { apiEndpoint };
