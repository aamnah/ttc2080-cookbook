import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { apiEndpoint } from "./constants.js";

const port = 3000;

const app = express();

app.use(express.json()); // convert json string to json object (from request)
app.use(cors()); // allow requests from different domains and ports

// Database connection setup
const { MONGODB_USER, MONGODB_DATABASE, MONGODB_PASS, MONGODB_CLUSTER } =
  process.env;
const dbConnectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}`;
mongoose.connect(dbConnectionString);
const db = mongoose.connection;

db.on("error", (err) => console.error(`Connection Error: ${err}`));
db.once("open", () => console.log(`Database connection established`));

const cookbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [String],
  thumbnail: String,
});
const Cookbook = mongoose.model("Cookbook", cookbookSchema);

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: {
    created: { type: Date, default: Date.now },
    lastmod: { type: Date, default: Date.now },
  },
  servings: Number,
  time: {
    prep: String,
    cook: String,
    total: String,
  },
  ingredients: [String],
  directions: [String],
  tags: [String],
  cookbooks: [String],
  image: {
    thumbnail: String,
    more: [String],
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);

app.get(apiEndpoint.base, (request, response) => {
  let html = `You have reached the API <br><br> The following endpoints are available: <br>`;
  for (let link in apiEndpoint) {
    html += `${link}: ${apiEndpoint[link]} <br>`;
  }
  response.send(html);
});

// Cookbook: Create
app.post(apiEndpoint.cookbooks, async (request, response) => {
  try {
    const { title, thumbnail } = request.body;
    const newCookbook = new Cookbook({
      title,
      thumbnail,
    });

    const savedCookbook = await newCookbook.save();
    response.json(savedCookbook);
  } catch (err) {
    console.error(`ERROR: Could not create cookbook: ${err}`);
  }
});

// Cookbooks: GET
app.get(apiEndpoint.cookbooks, async (request, response) => {
  try {
    const data = await Cookbook.find();
    console.log(`cookbooks: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get cookbooks: ${err}`);
  }
});

// Cookbook: GET by ID
app.get(apiEndpoint.cookbook, async (request, response) => {
  const { id } = request.params;
  try {
    const data = await Cookbook.findById(id);
    console.log(`cookbook: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get cookbook by id: ${id}\n ${err}`);
  }
});

// Cookbook: DELETE by ID
app.delete(apiEndpoint.cookbook, async (request, response) => {
  const { id } = request.params;
  try {
    const doc = await Cookbook.findById(id);
    if (doc) {
      await doc.deleteOne();
      response.json(await Cookbook.find());
    } else {
      console.error(`ERROR: Cookbook not found, could not delete`);
      response.status(404).end();
    }
  } catch (err) {
    console.error(`ERROR: Failed to delete cookbook by ID: ${id} \n ${err}`);
  }
});

// Recipes: GET
app.get(apiEndpoint.recipes, async (request, response) => {
  try {
    const data = await Recipe.find();
    console.log(`recipes: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get recipes: ${err}`);
  }
});

// Recipe: GET by ID
app.get(apiEndpoint.recipe, async (request, response) => {
  const { id } = request.params;
  try {
    const data = await Recipe.findById(id);
    console.log(`recipe: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get recipe by id: ${id}\n ${err}`);
  }
});

// Recipe: Create
app.post(apiEndpoint.recipes, async (request, response) => {
  try {
    const {
      title,
      servings,
      prepTime,
      cookTime,
      totalTime,
      thumbnail,
      ingredients,
      directions,
      cookbookId,
    } = request.body;
    const newRecipe = new Recipe({
      title,
      servings,
      time: {
        prep: prepTime,
        cook: cookTime,
        total: totalTime,
      },
      image: {
        thumbnail: thumbnail ? thumbnail : "/static/demo/placeholder.png",
      },
      ingredients,
      directions,
      cookbookId, // one recipe should belong to only one collection. belonging to more could be done with tags
    });

    const savedRecipe = await newRecipe.save();
    response.json(savedRecipe);
  } catch (err) {
    console.error(`ERROR: Could not create recipe: ${err}`);
  }
});

// Recipe: Update
app.put(apiEndpoint.recipe, async (request, response) => {
  try {
    const { id } = request.params;
    const {
      title,
      servings,
      time,
      image,
      ingredients,
      directions,
      cookbookId,
    } = request.body;

    const recipe = await Recipe.findById(id);
    if (recipe) {
      const updatedRecipe = await Recipe.updateOne(
        { _id: id },
        {
          title,
          servings,
          time,
          image,
          ingredients,
          directions,
          cookbookId,
          // NOTE: default values are coming from the frontend
        }
      );

      if (updatedRecipe) {
        // console.log(`Updated recipe: ${await Recipe.findById(id)}`);
        response.json(await Recipe.findById(id));
      }
    } else {
      console.error(`ERROR: Recipe not found: ${id} \n ${err}`);
    }
  } catch (err) {
    console.error(`ERROR: Could not update recipe: ${err}`);
  }
});


// Recipe: DELETE by ID
app.delete(apiEndpoint.recipe, async (request, response) => {
  const { id } = request.params;
  try {
    const doc = await Recipe.findById(id);
    if (doc) {
      await doc.deleteOne();
      response.json(await Recipe.find());
    } else {
      console.error(`ERROR: Recipe not found, could not delete`);
      response.status(404).end();
    }
  } catch (err) {
    console.error(`ERROR: Failed to delete recipe by ID: ${id} \n ${err}`);
  }
});

// app.get(apiEndpoint.tags, async (request, response) => {});
// Tag: Get by Name
app.get(apiEndpoint.tag, async (request, response) => {
  const { name } = request.params;
  try {
    const data = await Recipe.find({ tags: name });
    console.log(`tagged recipes: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Failed to get tag by name: ${name} \n ${err}`);
  }
});

// Handle all 404 errors
app.use((request, response, next) => {
  const res = {
    route: request.originalUrl,
    message: "Route not found",
  };
  response
    .status(404)
    .json(res);
});

// Start app and listen to port 3000
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
