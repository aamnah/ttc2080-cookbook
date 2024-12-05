import { fetchRecipeById } from "./api";
import { getIdFromPath } from "./helpers";

const { pathname } = window.location;

document.onload = async () => {
  const id = getIdFromPath(pathname);
  const data = await fetchRecipeById(id);
  console.log(getIdFromPath(pathname));
};
