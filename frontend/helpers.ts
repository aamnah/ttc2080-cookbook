export function getIdFromUrlPath(path): string {
  const parts = path.split("/");
  const id = parts[parts.length - 1];
  console.log(id);
  return id;
}

export function getQueryParam(location, param: string): string {
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  let value = "";

  if (urlParams.has(param)) {
    value = urlParams.get(param);
    console.log(`${param}: ${value}`);
    return value;
  } else {
    console.error(`ERROR: The param ${param} was not found`);
  }
}
