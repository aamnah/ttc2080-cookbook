import { fetchRecipeById } from "./api";
import { getQueryParam } from "./helpers";
import renderSidebarHtml from "./components/sidebar";

const location = window.location;
const sampleData = {
  id: "6750d37b5237ce325c1c9a37",
};

function renderRecipe(recipe) {
  const container = document.querySelector("#contentContainer");
  const {
    title,
    date,
    time,
    image,
    _id,
    servings,
    ingredients,
    directions,
    tags,
  } = recipe;
  // TODO: If cook time or any other time is 0, do NOT show it
  const html = `
    <div data-id="${_id}">
      <h2 class="text-4xl">${title}</h2>
      <nav class="flex gap-2 mt-2">
      ${tags
        .map(
          (tag) =>
            `<a href="#" class="bg-slate-300 px-2 py-1 rounded-md">${tag}</a>`
        )
        .join("")}
      </nav>
      <img src="static/demo/placeholder.png" alt="${title}" class="mt-2 rounded-2xl w-80 max-w-96">
      <ul>
        <li>Servings: ${servings}</li>     
        <li>Prep time: ${time.prep}</li>
        <li>Cook time: ${time.cook}</li>
        <li>Total time: ${time.total}</li>        
      </ul>
      <h3 class="text-2xl mt-2">Ingredients</h3>
      <ul>
        ${ingredients.map((i) => `<li>${i}</li>`).join("")}
      </ul>
      <h3 class="text-2xl mt-2">Directions</h3>
      <p>${directions}</p>

    </div>
  `;

  container.innerHTML = html;
}

async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();

  const id = getQueryParam(location, "id");
  const data = await fetchRecipeById(id);
  console.log(id);

  console.log(`
    id: ${id}
    data: ${data}`);

  // Set page title to recipe name
  document.title = data.title;
  renderRecipe(data);
}

run();

/*
{
"date": {
"created": "2024-12-05T00:00:00.000Z",
"lastmod": "2024-12-05T00:00:00.000Z"
},
"time": {
"prep": "5 mins",
"cook": "0 mins",
"total": "5 mins"
},
"image": {
"thumbnail": "fruit_smoothie_thumb.jpg",
"more": [
"smoothie_step1.jpg",
"smoothie_step2.jpg"
]
},
"_id": "6750d37b5237ce325c1c9a37",
"title": "Fruit Smoothie",
"servings": 2,
"ingredients": [
"1 banana",
"1 cup frozen berries",
"1 cup milk or plant-based milk",
"1 tbsp honey (optional)"
],
"directions": "Blend all ingredients until smooth. Serve immediately.",
"tags": [
"Drink",
"Healthy",
"Quick",
"Vegan"
]
}
*/