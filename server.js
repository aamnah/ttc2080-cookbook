import express from "express";
import cors from "cors";
import mongoose, { Schema } from "mongoose";

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

// Endpoints
const apiBaseUrl = "/api";
const endpoints = {
  base: `${apiBaseUrl}/`,
  collections: `${apiBaseUrl}/collections`,
  collection: `${apiBaseUrl}/collections/:id`,
  recipes: `${apiBaseUrl}/recipes/`,
  recipe: `${apiBaseUrl}/recipes/:id`,
  groceryLists: `${apiBaseUrl}/groceries`,
  groceryList: `${apiBaseUrl}/groceries/:id`,
};

const collectionSchema = new Schema({});
const recipeSchema = new Schema({});
const grocerySchema = new Schema({});

const connectionString =
  // Start API and listen to port 3000
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
