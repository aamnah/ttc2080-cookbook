export default function renderCardBtn({
  id = "",
  link = "",
  title = "Add New",
  image = "/static/demo/placeholder.png",
}) {
  let html = ``;

  html += `<a href="${link}" class="">
      <div class=" min-h-16 flex flex-wrap items-center w-32 border-2 border-orange-200 rounded-xl p-2 hover:bg-orange-200 mb-2">
        <img src="${image}" alt="${title}" class="rounded w-8 h-8 inline-flex"/>
        <span class="p-2 font-semibold">${title}</span>
      </div>
    </a>`;

  return html;
}
