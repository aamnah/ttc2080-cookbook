import { fetchRecipes } from "./api";

async function run() {
  const data = await fetchRecipes();
  console.log(`data: ${data}`);
}
run();
