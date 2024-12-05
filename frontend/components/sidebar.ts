export default function renderSidebarHtml() {
  let sidebarHtml = `
    <nav class="flex flex-col gap-1">
      <a href="#" class="hover:bg-slate-50 px-4 py-3 rounded-lg">Home</a>
      <a href="/collections" class="hover:bg-slate-50 px-4 py-3 rounded-lg">Collections</a>
      <a href="/recipes" class="hover:bg-slate-50 px-4 py-3 rounded-lg">Recipes</a>
      <a href="/tags" class="hover:bg-slate-50 px-4 py-3 rounded-lg">Tags</a>
    </nav>
  </div>
  `;
  return sidebarHtml;
}
