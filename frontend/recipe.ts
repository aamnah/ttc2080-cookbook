import { fetchRecipeById } from "./api";
import { getQueryParam } from "./helpers";
import renderSidebarHtml from "./components/sidebar";
import renderHeader from "./components/header";

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
      <h2 class="text-4xl" data-editable>${title}</h2>
      <div class="mt-2 flex gap-4 items-center">
        <a href="" class="editBtn border border-orange-200 px-2 py-1 rounded">Edit recipe</a>
        <a href="" class="saveBtn hidden bg-orange-200 px-2 py-1 rounded">Save recipe</a>
        <a href="" class="cancelBtn hidden border border-orange-200 px-2 py-1 rounded">Cancel</a>
        <a href="" class="deleteBtn hidden border border-red-200 bg-red-200 px-2 py-1 rounded">Delete</a>
      </div>
      <nav class="flex gap-2 mt-4">
      ${tags
        .map(
          (tag) =>
            `<a href="/tag?name=${tag}" class="bg-slate-300 px-2 py-1 rounded-md">${tag}</a>`
        )
        .join("")}
      </nav>
      <img src="static/demo/placeholder.png" alt="${title}" class="mt-4 rounded-2xl w-80 max-w-96">
      <ul class="mt-4">
            <li>Servings: <span data-editable>${servings}</span></li>

            <li>Prep time: <span data-editable>${
              time && time.prep ? time.prep : ""
            }</span></li>
  
            <li>Cook time: <span data-editable>${
              time && time.cook ? time.cook : ""
            }</span></li>

            <li>Total time: <span data-editable>${
              time && time.total ? time.total : ""
            }</span></li>
      </ul>
      <h3 class="text-2xl mt-4">Ingredients</h3>
      <ul>
        ${ingredients.map((i) => `<li data-editable>${i}</li>`).join("")}
      </ul>
      <h3 class="text-2xl mt-4">Directions</h3>
      ${
        Array.isArray(directions)
          ? `<ul>
        ${directions.map((step) => `<li data-editable>${step}</li>`).join("")}
      </ul>`
          : `<p data-editable>${directions}</p>`
      }

      <div class="mt-12 flex gap-4">
        <a href="" class="editBtn border border-orange-200 px-6 py-4 rounded">Edit</a>
        <a href="" class="saveBtn hidden bg-orange-200 px-6 py-4 rounded">Save</a>
        <a href="" class="cancelBtn hidden border border-orange-200 px-6 py-4 rounded">Cancel</a>
        <a href="" class="deleteBtn hidden border border-red-200 bg-red-200 px-6 py-4 rounded">Delete</a>
      </div>

    </div>
  `;

  container.innerHTML = html;
}

async function run() {
  const sidebarContainer = document.querySelector("#sidebarContainer");
  sidebarContainer.innerHTML = renderSidebarHtml();
  const headerContainer = document.querySelector("#headerContainer");
  headerContainer.innerHTML = renderHeader();

  const id = getQueryParam(location, "id");
  const data = await fetchRecipeById(id);
  console.log(id);

  console.log(`
    id: ${id}
    data: ${data}`);

  // Set page title to recipe name
  document.title = data.title;
  renderRecipe(data);

  const editBtns = document.querySelectorAll(".editBtn");
  const saveBtns = document.querySelectorAll(".saveBtn");
  const cancelBtns = document.querySelectorAll(".cancelBtn");
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  const editableAreas = document.querySelectorAll("[data-editable]");

  // editBtn?.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   editBtn.style.display = "none";
  //   saveBtn.style.display = "block";
  //   cancelBtn.style.display = "block";
  //   deleteBtn.style.display = "block";

  //   editableAreas.forEach((item) => {
  //     item.setAttribute("contenteditable", "true");
  //   });
  // });

  // saveBtn?.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   editBtn.style.display = "block";
  //   saveBtn.style.display = "none";
  //   cancelBtn.style.display = "none";
  //   deleteBtn.style.display = "none";

  //   editableAreas.forEach((item) => {
  //     item.setAttribute("contenteditable", "false");
  //   });
  // });

  // cancelBtn?.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   editBtn.style.display = "block";
  //   saveBtn.style.display = "none";
  //   cancelBtn.style.display = "none";
  //   deleteBtn.style.display = "none";
  //   editableAreas.forEach((item) => {
  //     item.setAttribute("contenteditable", "false");
  //   });
  // });
  editBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      editBtns.forEach((btn) => (btn.style.display = "none"));
      saveBtns.forEach((btn) => (btn.style.display = "block"));
      cancelBtns.forEach((btn) => (btn.style.display = "block"));
      deleteBtns.forEach((btn) => (btn.style.display = "block"));
      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "true");
      });
    });
  });

  cancelBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      editBtns.forEach((btn) => (btn.style.display = "block"));
      saveBtns.forEach((btn) => (btn.style.display = "none"));
      cancelBtns.forEach((btn) => (btn.style.display = "none"));
      deleteBtns.forEach((btn) => (btn.style.display = "none"));

      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "false");
      });
    });
  });

  saveBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      editBtns.forEach((btn) => (btn.style.display = "block"));
      saveBtns.forEach((btn) => (btn.style.display = "none"));
      cancelBtns.forEach((btn) => (btn.style.display = "none"));
      deleteBtns.forEach((btn) => (btn.style.display = "none"));

      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "false");
      });
    });
    // TODO: make a call to the API
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm("Are you sure you want to delete?") === true) {
        alert("got it");
      }

      editBtns.forEach((btn) => (btn.style.display = "block"));
      saveBtns.forEach((btn) => (btn.style.display = "none"));
      cancelBtns.forEach((btn) => (btn.style.display = "none"));
      deleteBtns.forEach((btn) => (btn.style.display = "none"));

      editableAreas.forEach((item) => {
        item.setAttribute("contenteditable", "false");
      });
    });
    // TODO: make a call to the API
  });
}

run();