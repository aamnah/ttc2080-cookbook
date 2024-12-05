export default function renderCardNew({
  id = "",
  link = "",
  title = "Add New",
  image = "/static/demo/placeholder.png",
}) {
  let html = ``;

  html += `<a href="${link}">
      <div class="border-2 border-orange-200 w-32 min-h-44 flex flex-col rounded-xl text-center">
        <img src="${image}" alt="${title}" class="rounded"/>
        <p class="p-2">${title}</p>
      </div>
    </a>`;

  return html;
}
