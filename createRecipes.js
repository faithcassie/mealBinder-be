const fs = require("fs");
const csv = require("csvtojson");

const createRecipes = async () => {
  try {
    let newData = (await csv().fromFile("recipeData.csv")).slice(0, 49);

    let recipes = JSON.parse(fs.readFileSync("recipes.json"));
    newData = new Set(
      newData.map((e, index) => ({
        id: index + 1,
        title: e.Title,
        ingredients: e.Ingredients.split(",").map((ingredient) =>
          ingredient.trim()
        ),
        instructions: e.Instructions.replace(/\s+/g, " "),
        url: `http://localhost:8000/images/${e.Image_Name}.jpg`,
      }))
    );
    newData = Array.from(newData);
    recipes.data = newData;
    fs.writeFileSync("recipes.json", JSON.stringify(recipes), "utf-8");
    console.log("Mock data created successfully.");
  } catch (error) {
    console.log("Error creating mock data", error);
  }
};

createRecipes();
