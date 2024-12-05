// Endpoints
const apiBaseUrl = "/api";
const apiEndpoint = {
  base: `${apiBaseUrl}/`,
  cookbooks: `${apiBaseUrl}/cookbooks`,
  cookbook: `${apiBaseUrl}/cookbooks/:id`,
  recipes: `${apiBaseUrl}/recipes/`,
  recipe: `${apiBaseUrl}/recipes/:id`,
  tags: `${apiBaseUrl}/tags/`,
  tag: `${apiBaseUrl}/tags/:name`,
};

export { apiEndpoint };
