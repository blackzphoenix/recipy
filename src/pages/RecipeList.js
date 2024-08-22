import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { getRecipes } from "../utils/recipeStorage";
import { CircularProgress, Typography, Button, Box } from "@mui/material";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setRecipes(getRecipes());
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1" className="cursor-pointer">
          Your recipes
        </Typography>
        <Button component={Link} to="/add" variant="contained" color="primary">
          Add New Recipe
        </Button>
      </Box>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchTerm && (
        <p className="text-2xl font-bold mb-6">{`Results for '${searchTerm}'`}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
