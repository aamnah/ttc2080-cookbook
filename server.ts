import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { endpoint } from "./src/constants.js";

const port = 3000;

const app = express();

app.use(express.json()); // convert json string to json object (from request)
app.use(cors()); // allow requests from different domains and ports
// Define the directory where your static files (including HTML) are located
app.use(express.static(path.join(__dirname, "public")));

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
  directions: String,
  tags: [String],
  image: {
    thumbnail: String,
    more: [String],
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);

// const grocerySchema = new mongoose.Schema({
//   items: [String],
// });

// Cookbooks: GET
app.get(endpoint.cookbooks, async (request, response) => {
  try {
    const data = await Cookbook.find();
    console.log(`cookbooks: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get cookbooks: ${err}`);
  }
});

// Cookbook: GET by ID
app.get(endpoint.cookbook, async (request, response) => {
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
app.delete(endpoint.cookbook, async (request, response) => {
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
app.get(endpoint.recipes, async (request, response) => {
  try {
    const data = await Recipe.find();
    console.log(`recipes: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get recipes: ${err}`);
  }
});

// Recipe: GET by ID
app.get(endpoint.recipe, async (request, response) => {
  const { id } = request.params;
  try {
    const data = await Recipe.findById(id);
    console.log(`recipes: ${data}`);
    response.json(data);
  } catch (err) {
    console.error(`ERROR: Could not get recipe by id: ${id}\n ${err}`);
  }
});

// Recipe: DELETE by ID
app.delete(endpoint.recipe, async (request, response) => {
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

// Start app and listen to port 3000
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
