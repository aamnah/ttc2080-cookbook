export default function renderCard({
  id = "",
  link = "",
  title = "",
  image = "/static/demo/placeholder.png",
}) {
  let html = ``;

  html += `<a href="${link}" data-id="${id}">
      <div class="bg-slate-50 w-32 min-h-44 flex flex-col rounded-xl text-center">
        <img src="${image}" alt="${title}" class="rounded"/>
        <p>${title}</p>
      </div>
    </a>`;

  return html;
}
