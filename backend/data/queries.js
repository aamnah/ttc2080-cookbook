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



