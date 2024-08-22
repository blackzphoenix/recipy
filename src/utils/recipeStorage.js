const STORAGE_KEY = "recipes";

export const getRecipes = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const getRecipeById = (id) => {
  const recipes = getRecipes();
  return recipes.find((recipe) => recipe.id === parseInt(id));
};

export const addRecipe = (recipe) => {
  const recipes = getRecipes();
  const now = new Date().toISOString();
  const newRecipe = {
    ...recipe,
    id: Date.now(),
    createdAt: now,
    updatedAt: now,
  };
  recipes.push(newRecipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  return newRecipe;
};

export const updateRecipe = (updatedRecipe) => {
  const recipes = getRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
  if (index !== -1) {
    recipes[index] = { ...updatedRecipe, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return recipes[index];
  }
  return null;
};

export const deleteRecipe = (id) => {
  const recipes = getRecipes();
  const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
};
