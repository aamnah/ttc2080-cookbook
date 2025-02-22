export default function renderCard({
  id = "",
  link = "",
  title = "",
  image = "/static/demo/placeholder.png",
}) {
  let html = ``;

  html += `<a href="${link}" data-id="${id}">
      <div class="bg-white w-32 min-h-44 flex flex-col rounded-xl text-center shadow-md">
        <img src="${image}" alt="${title}" class="rounded"/>
        <p class="p-2">${title}</p>
      </div>
    </a>`;

  return html;
}
