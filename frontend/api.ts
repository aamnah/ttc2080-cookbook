const apiBaseUrl = "http://localhost:3000/api";

export async function fetchRecipes() {
  try {
    const response = await fetch(`${apiBaseUrl}/recipes`);
    console.log(`response: ${response}`);
    const data = await response.json();
    console.log(`data: ${data}`);

    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get recipes: ${err}`);
  }
}

export async function fetchRecipeById(id: string) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/recipes/${encodeURIComponent(id)}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get recipe by ID: ${id}\n ${err}`);
    return [];
  }
}

export async function fetchRecipesByName(name: string) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/recipes?name=${encodeURIComponent(name)}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Failed to get recipe by name: ${name} \n ${err}`);
  }
}

export async function fetchRecipesByTagName(name: string) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/tags?name=${encodeURIComponent(name)}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Failed to get tag by name: ${name} \n ${err}`);
  }
}

export async function fetchRecipesByCollectionId(cookbookId: string) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/recipes?cookbookId=${encodeURIComponent(cookbookId)}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(
      `API ERROR: Failed to get recipes by collection id: ${cookbookId} \n ${err}`
    );
  }
}

export async function fetchCookbooks() {
  try {
    const response = await fetch(`${apiBaseUrl}/cookbooks`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get cookbooks: ${err}`);
  }
}

export async function fetchCookbookById(id: string) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/cookbooks/${encodeURIComponent(id)}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Could not get cookbook by ID: ${id} \n ${err}`);
  }
}

export async function createCollection(
  collection: { title: string; thumbnail: string } = {
    title: "",
    thumbnail: "",
  }
) {
  try {
    const body = {
      title: collection.title,
      thumbnail: collection.thumbnail,
    };
    const response = await fetch(`${apiBaseUrl}/cookbooks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(
        `API ERROR: Response not okay. Failed to create collection: \n ${response}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Failed to create collection: ${err} \n ${err}`);
  }
}

export async function createRecipe(recipe: {
  title: string;
  thumbnail?: string;
  servings?: number;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  ingredients: string[];
  directions: string[];
  cookbookId?: string;
}) {
  try {
    const body = {
      title: recipe.title,
      servings: recipe.servings ?? 1, // ?? is the Nullish coalescing operator (??) return right if lef is null or undefined
      time: {
        prep: recipe.prepTime ?? "",
        cook: recipe.cookTime ?? "",
        total: recipe.totalTime ?? "",
      },
      image: {
        thumbnail: recipe.thumbnail ?? "/static/demo/placeholder.png",
      },
      ingredients: recipe.ingredients ?? [],
      directions: recipe.directions ?? [],
      cookbookId: recipe.cookbookId ?? "",
    };

    const response = await fetch(`${apiBaseUrl}/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(
        `API ERROR: Response not okay. Failed to create recipe: \n ${response}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Failed to create recipe: ${err} \n ${err}`);
  }
}

export async function updateRecipeById(
  id: string,
  recipe: {
    title: string;
    thumbnail?: string;
    servings?: number;
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    ingredients: string[];
    directions: string[];
    cookbookId?: string;
  }
) {
  try {
    const body = {
      title: recipe.title,
      servings: recipe.servings ?? 1, // ?? is the Nullish coalescing operator (??) return right if lef is null or undefined
      time: {
        prep: recipe.prepTime ?? "",
        cook: recipe.cookTime ?? "",
        total: recipe.totalTime ?? "",
      },
      image: {
        thumbnail: recipe.thumbnail ?? "/static/demo/placeholder.png",
      },
      ingredients: recipe.ingredients ?? [],
      directions: recipe.directions ?? [],
      cookbookId: recipe.cookbookId ?? "",
    };

    const response = await fetch(
      `${apiBaseUrl}/recipes/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      console.error(
        `API ERROR: Response not okay. Failed to update recipe: \n ${response}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API ERROR: Failed to update recipe by ID: ${id} \n ${err}`);
  }
}

export async function deleteRecipeById(id: string) {
  try {
    const data = await fetch(
      `${apiBaseUrl}/recipes/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      }
    );
  } catch (err) {
    console.error(`API ERROR: Failed to delete recipe by ID: ${id} \n ${err}`);
  }
}