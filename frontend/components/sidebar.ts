export default function renderSidebarHtml() {
  let sidebarHtml = `
    <nav class="flex flex-col gap-1">
      <a href="/" class="bg-white shadow-sm px-4 py-3 rounded-lg font-semibold mb-2">Home</a>
      <a href="/collections" class="bg-white shadow-sm px-4 py-3 rounded-lg font-semibold mb-2">Collections</a>
      <a href="/recipes" class="bg-white shadow-sm px-4 py-3 rounded-lg font-semibold mb-2">Recipes</a>
    </nav>
  </div>
  `;
  return sidebarHtml;
}
