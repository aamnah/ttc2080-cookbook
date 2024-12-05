db.cookbooks.updateMany(
  { statuses: "inactive" }, // Find documents where "statuses" array contains "inactive"
  { $set: { "statuses.$[]": "active" } } // Update all matching array elements
);

// WARNING!! Update ALL elements in the array
db.cookbooks.updateMany(
  { items: "Homemade Pizza" },
  { $set: { "items.$[]": "6750d37b5237ce325c1c9a30" } }
);

// Update specific fields in array
db.cookbooks.updateMany(
  { "items.item": "Homemade Pizza" }, // Find documents where an element in "items" has "Homemade Pizza"
  { $set: { "items.$[elem].item": "6750d37b5237ce325c1c9a30" } }, // Update specific matching element
  {
    arrayFilters: [{ "elem.item": "Homemade Pizza" }], // Apply filter to match specific array elements, make sure only items with "Homemade Pizza" are updated
  }
);

db.cookbooks.updateMany(
  { "items.item": "Homemade Pizza" },
  { $set: { "items.$[elem].item": "6750d37b5237ce325c1c9a30" } },
  {
    arrayFilters: [{ "elem.item": "Homemade Pizza" }],
  }
);

db.cookbooks.updateMany(
  { "items.item": "Caprese Salad" },
  { $set: { "items.$[elem].item": "6750d37b5237ce325c1c9a34" } },
  {
    arrayFilters: [{ "elem.item": "Caprese Salad" }],
  }
);

// insertMany only works if the collection exists
db.recipes.insertMany([
  {
    title: "Spaghetti Carbonara",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "20 mins", total: "30 mins" },
    ingredients: [
      "200g spaghetti",
      "2 large eggs",
      "100g pancetta",
      "50g grated Parmesan",
      "1 garlic clove, minced",
      "Black pepper, to taste",
      "Salt, to taste",
    ],
    directions:
      "Boil spaghetti. Fry pancetta. Mix eggs and cheese. Combine pasta with pancetta and egg mixture.",
    tags: ["Italian", "Pasta", "Quick", "Dinner"],
    image: {
      thumbnail: "carbonara_thumb.jpg",
      more: ["carbonara_step1.jpg", "carbonara_step2.jpg"],
    },
  },
  {
    title: "Chicken Curry",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "15 mins", cook: "30 mins", total: "45 mins" },
    ingredients: [
      "500g chicken breast, diced",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "1 tbsp curry powder",
      "1 tsp turmeric",
      "400ml coconut milk",
      "1 tbsp oil",
      "Salt, to taste",
    ],
    directions:
      "Sauté onion and garlic. Add chicken and spices. Simmer with coconut milk.",
    tags: ["Indian", "Curry", "Spicy", "Gluten-Free"],
    image: {
      thumbnail: "chicken_curry_thumb.jpg",
      more: ["curry_step1.jpg", "curry_step2.jpg"],
    },
  },
  {
    title: "Vegetable Stir Fry",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 3,
    time: { prep: "10 mins", cook: "10 mins", total: "20 mins" },
    ingredients: [
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "200g broccoli florets",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 garlic cloves, minced",
      "Salt, to taste",
    ],
    directions:
      "Heat oil, stir-fry vegetables until tender. Add soy sauce and garlic.",
    tags: ["Asian", "Vegan", "Quick", "Healthy"],
    image: {
      thumbnail: "stirfry_thumb.jpg",
      more: ["stirfry_step1.jpg", "stirfry_step2.jpg"],
    },
  },
  {
    title: "Pancakes",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 2,
    time: { prep: "5 mins", cook: "15 mins", total: "20 mins" },
    ingredients: [
      "1 cup flour",
      "1 cup milk",
      "1 egg",
      "2 tbsp sugar",
      "1 tsp baking powder",
      "Pinch of salt",
      "Butter for cooking",
    ],
    directions:
      "Mix dry and wet ingredients separately, combine, and cook on a greased skillet.",
    tags: ["Breakfast", "Quick", "Sweet", "Comfort Food"],
    image: {
      thumbnail: "pancakes_thumb.jpg",
      more: ["pancakes_step1.jpg", "pancakes_step2.jpg"],
    },
  },
  {
    title: "Classic Caesar Salad",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "0 mins", total: "10 mins" },
    ingredients: [
      "1 romaine lettuce head, chopped",
      "1/2 cup croutons",
      "1/4 cup Parmesan cheese, grated",
      "Caesar dressing",
      "Salt and pepper, to taste",
    ],
    directions:
      "Toss lettuce, croutons, and Parmesan with dressing. Season to taste.",
    tags: ["Salad", "Healthy", "Quick", "Vegetarian"],
    image: {
      thumbnail: "caesar_thumb.jpg",
      more: ["caesar_step1.jpg", "caesar_step2.jpg"],
    },
  },

  {
    title: "Beef Tacos",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "20 mins", total: "30 mins" },
    ingredients: [
      "500g ground beef",
      "1 onion, chopped",
      "2 tbsp taco seasoning",
      "8 taco shells",
      "1 cup lettuce, shredded",
      "1 cup cheese, shredded",
      "Sour cream (optional)",
    ],
    directions:
      "Cook beef with onion and taco seasoning. Assemble tacos with toppings.",
    tags: ["Mexican", "Quick", "Dinner", "Spicy"],
    image: {
      thumbnail: "beef_tacos_thumb.jpg",
      more: ["tacos_step1.jpg", "tacos_step2.jpg"],
    },
  },
  {
    title: "Vegetarian Chili",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 6,
    time: { prep: "15 mins", cook: "40 mins", total: "55 mins" },
    ingredients: [
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "1 red bell pepper, chopped",
      "2 cans kidney beans",
      "2 cans diced tomatoes",
      "1 tbsp chili powder",
      "1 tsp cumin",
      "1 tbsp olive oil",
      "Salt and pepper to taste",
    ],
    directions:
      "Sauté vegetables, add beans, tomatoes, and spices. Simmer until thick.",
    tags: ["Vegetarian", "Vegan", "Spicy", "Comfort Food"],
    image: {
      thumbnail: "vegetarian_chili_thumb.jpg",
      more: ["chili_step1.jpg", "chili_step2.jpg"],
    },
  },
  {
    title: "Garlic Butter Shrimp",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "5 mins", cook: "10 mins", total: "15 mins" },
    ingredients: [
      "500g shrimp, peeled and deveined",
      "4 garlic cloves, minced",
      "2 tbsp butter",
      "1 tbsp olive oil",
      "Juice of 1 lemon",
      "Salt and pepper to taste",
      "Fresh parsley, chopped",
    ],
    directions:
      "Heat butter and oil, cook garlic and shrimp. Add lemon juice and parsley.",
    tags: ["Seafood", "Quick", "Gluten-Free", "Dinner"],
    image: {
      thumbnail: "garlic_shrimp_thumb.jpg",
      more: ["shrimp_step1.jpg", "shrimp_step2.jpg"],
    },
  },
  {
    title: "Chocolate Chip Cookies",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 12,
    time: { prep: "10 mins", cook: "15 mins", total: "25 mins" },
    ingredients: [
      "2 1/4 cups flour",
      "1 cup butter, softened",
      "1 cup sugar",
      "1 cup brown sugar",
      "2 large eggs",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
      "2 cups chocolate chips",
    ],
    directions:
      "Cream butter and sugars, add eggs and vanilla. Mix dry ingredients, combine, and bake.",
    tags: ["Dessert", "Sweet", "Comfort Food", "Snack"],
    image: {
      thumbnail: "chocolate_chip_cookies_thumb.jpg",
      more: ["cookies_step1.jpg", "cookies_step2.jpg"],
    },
  },
  {
    title: "Lemon Herb Chicken",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "25 mins", total: "35 mins" },
    ingredients: [
      "4 chicken breasts",
      "2 tbsp olive oil",
      "Juice of 2 lemons",
      "2 garlic cloves, minced",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    directions:
      "Marinate chicken in lemon and herbs. Cook in a skillet until golden brown.",
    tags: ["Healthy", "Dinner", "Low-Carb", "Gluten-Free"],
    image: {
      thumbnail: "lemon_chicken_thumb.jpg",
      more: ["chicken_step1.jpg", "chicken_step2.jpg"],
    },
  },
  {
    title: "Greek Salad",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "0 mins", total: "10 mins" },
    ingredients: [
      "3 tomatoes, diced",
      "1 cucumber, sliced",
      "1/2 red onion, sliced",
      "1/2 cup kalamata olives",
      "1/4 cup feta cheese, crumbled",
      "2 tbsp olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp oregano",
    ],
    directions:
      "Combine vegetables in a bowl, drizzle with olive oil and vinegar. Sprinkle with oregano and feta.",
    tags: ["Salad", "Healthy", "Vegetarian", "Quick"],
    image: {
      thumbnail: "greek_salad_thumb.jpg",
      more: ["salad_step1.jpg", "salad_step2.jpg"],
    },
  },
  {
    title: "Banana Bread",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 8,
    time: { prep: "10 mins", cook: "60 mins", total: "70 mins" },
    ingredients: [
      "2 ripe bananas, mashed",
      "1/2 cup butter, melted",
      "1 cup sugar",
      "2 eggs",
      "1 1/2 cups flour",
      "1 tsp baking soda",
      "1 tsp vanilla extract",
      "Pinch of salt",
    ],
    directions:
      "Mix wet ingredients. Add dry ingredients and stir until combined. Bake at 180°C for 60 mins.",
    tags: ["Dessert", "Sweet", "Comfort Food", "Snack"],
    image: {
      thumbnail: "banana_bread_thumb.jpg",
      more: ["bread_step1.jpg", "bread_step2.jpg"],
    },
  },
  {
    title: "Homemade Pizza",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "15 mins", cook: "20 mins", total: "35 mins" },
    ingredients: [
      "1 pizza dough",
      "1/2 cup pizza sauce",
      "1 1/2 cups mozzarella cheese, shredded",
      "Toppings: pepperoni, bell peppers, olives (optional)",
    ],
    directions:
      "Spread sauce on dough. Add cheese and toppings. Bake at 220°C for 20 mins.",
    tags: ["Italian", "Pizza", "Comfort Food", "Dinner"],
    image: {
      thumbnail: "pizza_thumb.jpg",
      more: ["pizza_step1.jpg", "pizza_step2.jpg"],
    },
  },
  {
    title: "Avocado Toast",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 2,
    time: { prep: "5 mins", cook: "0 mins", total: "5 mins" },
    ingredients: [
      "2 slices of bread, toasted",
      "1 ripe avocado, mashed",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
    ],
    directions:
      "Spread mashed avocado on toast. Sprinkle with salt, pepper, and red pepper flakes.",
    tags: ["Breakfast", "Healthy", "Quick", "Vegan"],
    image: {
      thumbnail: "avocado_toast_thumb.jpg",
      more: ["avocado_step1.jpg", "avocado_step2.jpg"],
    },
  },
  {
    title: "Baked Salmon",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "5 mins", cook: "15 mins", total: "20 mins" },
    ingredients: [
      "4 salmon fillets",
      "2 tbsp olive oil",
      "Juice of 1 lemon",
      "1 garlic clove, minced",
      "Salt and pepper to taste",
      "Fresh dill for garnish",
    ],
    directions:
      "Place salmon on baking sheet. Drizzle with olive oil, lemon, garlic, and bake at 200°C for 15 mins.",
    tags: ["Seafood", "Healthy", "Quick", "Gluten-Free"],
    image: {
      thumbnail: "baked_salmon_thumb.jpg",
      more: ["salmon_step1.jpg", "salmon_step2.jpg"],
    },
  },
  {
    title: "Stuffed Bell Peppers",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "15 mins", cook: "30 mins", total: "45 mins" },
    ingredients: [
      "4 bell peppers, halved and seeded",
      "1 cup cooked rice",
      "500g ground beef",
      "1 onion, diced",
      "1 cup tomato sauce",
      "1 tsp garlic powder",
      "Salt and pepper to taste",
      "1 cup shredded cheese",
    ],
    directions:
      "Cook beef and onions, mix with rice and tomato sauce. Stuff into peppers, top with cheese, bake at 180°C for 30 mins.",
    tags: ["Dinner", "Comfort Food", "Gluten-Free"],
    image: {
      thumbnail: "stuffed_peppers_thumb.jpg",
      more: ["peppers_step1.jpg", "peppers_step2.jpg"],
    },
  },
  {
    title: "Caprese Salad",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 2,
    time: { prep: "5 mins", cook: "0 mins", total: "5 mins" },
    ingredients: [
      "2 large tomatoes, sliced",
      "200g fresh mozzarella, sliced",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Balsamic glaze",
      "Salt and pepper to taste",
    ],
    directions:
      "Layer tomatoes, mozzarella, and basil. Drizzle with olive oil and balsamic glaze. Season with salt and pepper.",
    tags: ["Italian", "Vegetarian", "Quick", "Healthy"],
    image: {
      thumbnail: "caprese_salad_thumb.jpg",
      more: ["caprese_step1.jpg", "caprese_step2.jpg"],
    },
  },
  {
    title: "Pumpkin Soup",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "25 mins", total: "35 mins" },
    ingredients: [
      "1 kg pumpkin, peeled and chopped",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "3 cups vegetable broth",
      "1/2 cup heavy cream",
      "Salt and pepper to taste",
      "2 tbsp olive oil",
    ],
    directions:
      "Sauté onions and garlic, add pumpkin and broth. Simmer until soft, blend, and stir in cream.",
    tags: ["Soup", "Comfort Food", "Vegetarian"],
    image: {
      thumbnail: "pumpkin_soup_thumb.jpg",
      more: ["soup_step1.jpg", "soup_step2.jpg"],
    },
  },
  {
    title: "Grilled Cheese Sandwich",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 2,
    time: { prep: "5 mins", cook: "5 mins", total: "10 mins" },
    ingredients: [
      "4 slices of bread",
      "2 tbsp butter",
      "4 slices cheddar cheese",
    ],
    directions:
      "Butter bread, place cheese between slices, cook on skillet until golden brown and cheese melts.",
    tags: ["Sandwich", "Quick", "Comfort Food"],
    image: {
      thumbnail: "grilled_cheese_thumb.jpg",
      more: ["grilled_cheese_step1.jpg", "grilled_cheese_step2.jpg"],
    },
  },
  {
    title: "Fruit Smoothie",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 2,
    time: { prep: "5 mins", cook: "0 mins", total: "5 mins" },
    ingredients: [
      "1 banana",
      "1 cup frozen berries",
      "1 cup milk or plant-based milk",
      "1 tbsp honey (optional)",
    ],
    directions: "Blend all ingredients until smooth. Serve immediately.",
    tags: ["Drink", "Healthy", "Quick", "Vegan"],
    image: {
      thumbnail: "fruit_smoothie_thumb.jpg",
      more: ["smoothie_step1.jpg", "smoothie_step2.jpg"],
    },
  },
  {
    title: "Chicken Alfredo Pasta",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "20 mins", total: "30 mins" },
    ingredients: [
      "300g fettuccine",
      "2 chicken breasts, sliced",
      "2 tbsp olive oil",
      "3 garlic cloves, minced",
      "1 cup heavy cream",
      "1/2 cup Parmesan cheese, grated",
      "Salt and pepper to taste",
      "Parsley for garnish",
    ],
    directions:
      "Cook pasta, sauté chicken and garlic. Add cream, cheese, and combine with pasta.",
    tags: ["Italian", "Pasta", "Comfort Food", "Dinner"],
    image: {
      thumbnail: "chicken_alfredo_thumb.jpg",
      more: ["alfredo_step1.jpg", "alfredo_step2.jpg"],
    },
  },
  {
    title: "Vegetable Stir-fry",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "10 mins", cook: "10 mins", total: "20 mins" },
    ingredients: [
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 carrot, julienned",
      "1 broccoli head, cut into florets",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 garlic cloves, minced",
      "1 tsp ginger, grated",
    ],
    directions:
      "Sauté garlic and ginger. Add vegetables, stir-fry with soy sauce and sesame oil.",
    tags: ["Vegetarian", "Healthy", "Quick", "Vegan"],
    image: {
      thumbnail: "veg_stirfry_thumb.jpg",
      more: ["stirfry_step1.jpg", "stirfry_step2.jpg"],
    },
  },
  {
    title: "Classic Pancakes",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "5 mins", cook: "10 mins", total: "15 mins" },
    ingredients: [
      "1 1/2 cups flour",
      "3 1/2 tsp baking powder",
      "1 tsp salt",
      "1 tbsp sugar",
      "1 1/4 cups milk",
      "1 egg",
      "3 tbsp butter, melted",
    ],
    directions:
      "Mix dry and wet ingredients separately, combine and cook pancakes on a griddle until golden.",
    tags: ["Breakfast", "Sweet", "Quick"],
    image: {
      thumbnail: "pancakes_thumb.jpg",
      more: ["pancakes_step1.jpg", "pancakes_step2.jpg"],
    },
  },
  {
    title: "Spaghetti Carbonara",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 4,
    time: { prep: "5 mins", cook: "15 mins", total: "20 mins" },
    ingredients: [
      "300g spaghetti",
      "100g pancetta or bacon",
      "2 eggs",
      "1/2 cup Parmesan cheese, grated",
      "2 garlic cloves, minced",
      "Salt and pepper to taste",
    ],
    directions:
      "Cook spaghetti, sauté pancetta and garlic. Mix eggs and cheese, toss with pasta.",
    tags: ["Italian", "Pasta", "Quick", "Dinner"],
    image: {
      thumbnail: "carbonara_thumb.jpg",
      more: ["carbonara_step1.jpg", "carbonara_step2.jpg"],
    },
  },
  {
    title: "Chocolate Brownies",
    date: {
      created: "2024-12-05T00:00:00.000Z",
      lastmod: "2024-12-05T00:00:00.000Z",
    },
    servings: 8,
    time: { prep: "10 mins", cook: "25 mins", total: "35 mins" },
    ingredients: [
      "1/2 cup butter, melted",
      "1 cup sugar",
      "2 eggs",
      "1/3 cup cocoa powder",
      "1/2 cup flour",
      "1/4 tsp salt",
      "1/4 tsp baking powder",
    ],
    directions:
      "Mix wet and dry ingredients separately, combine and bake at 175°C for 25 mins.",
    tags: ["Dessert", "Sweet", "Chocolate"],
    image: {
      thumbnail: "brownies_thumb.jpg",
      more: ["brownies_step1.jpg", "brownies_step2.jpg"],
    },
  },
]);

db.cookbooks.insertMany([
  {
    title: "Italian",
    thumbnail: "cookbook-placeholder.png",
    items: [
      "Homemade Pizza",
      "Spaghetti Carbonara",
      "Chicken Alfredo Pasta",
      "Caprese Salad",
    ],
  },
  {
    title: "Healthy",
    thumbnail: "cookbook-placeholder.png",
    items: [
      "Greek Salad",
      "Vegetable Stir-fry",
      "Fruit Smoothie",
      "Avocado Toast",
      "Baked Salmon",
    ],
  },
  {
    title: "Comfort Food",
    thumbnail: "cookbook-placeholder.png",
    items: [
      "Stuffed Bell Peppers",
      "Grilled Cheese Sandwich",
      "Classic Pancakes",
      "Banana Bread",
      "Chocolate Brownies",
    ],
  },
  {
    title: "Desserts",
    thumbnail: "cookbook-placeholder.png",
    items: ["Chocolate Brownies", "Banana Bread"],
  },
  {
    title: "Quick & Easy",
    thumbnail: "cookbook-placeholder.png",
    items: [
      "Grilled Cheese Sandwich",
      "Avocado Toast",
      "Fruit Smoothie",
      "Caprese Salad",
      "Greek Salad",
    ],
  },
  {
    title: "Asian",
    thumbnail: "cookbook-placeholder.png",
    items: ["Vegetable Stir-fry"],
  },
  {
    title: "Soups",
    thumbnail: "cookbook-placeholder.png",
    items: ["Pumpkin Soup"],
  },
  {
    title: "Seafood",
    thumbnail: "cookbook-placeholder.png",
    items: ["Baked Salmon"],
  },
  {
    title: "Breakfast",
    thumbnail: "cookbook-placeholder.png",
    items: ["Classic Pancakes", "Avocado Toast", "Fruit Smoothie"],
  },
  {
    title: "Dinner",
    thumbnail: "cookbook-placeholder.png",
    items: [
      "Chicken Alfredo Pasta",
      "Stuffed Bell Peppers",
      "Spaghetti Carbonara",
    ],
  },
]);
