export function getIdFromPath(path): string {
  const parts = path.split("/");
  const id = parts[parts.length - 1];
  console.log(id);
  return id;
}
