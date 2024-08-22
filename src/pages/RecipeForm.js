import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, addRecipe, updateRecipe } from "../utils/recipeStorage";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import Snackbar from "../components/Snackbar";

function RecipeForm({ isEditing = false }) {
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [""],
    steps: [""],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const fetchedRecipe = getRecipeById(parseInt(id));
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    let savedRecipe;
    if (isEditing) {
      savedRecipe = updateRecipe({ ...recipe, updatedAt: now });
      setSnackbar({
        open: true,
        message: "Recipe updated successfully!",
        severity: "success",
      });
    } else {
      savedRecipe = addRecipe({ ...recipe, createdAt: now, updatedAt: now });
      setSnackbar({
        open: true,
        message: "Recipe added successfully!",
        severity: "success",
      });
    }
    if (savedRecipe) {
      setTimeout(() => navigate(`/recipe/${savedRecipe.id}`), 2000);
    }
  };

  const handleChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleListChange = (field, index, value) => {
    const newList = [...recipe[field]];
    newList[index] = value;
    setRecipe({ ...recipe, [field]: newList });
  };

  const addListItem = (field) => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ""] });
  };

  if (isEditing && !recipe) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditing ? "Edit Recipe" : "Add Recipe"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={recipe.title}
          onChange={(e) => handleChange("title", e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows="2"
          value={recipe.description}
          onChange={(e) => handleChange("description", e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Image URL"
          value={recipe.image}
          onChange={(e) => handleChange("image", e.target.value)}
          margin="normal"
          required
        />
        <div className="mt-4">
          <div className="flex justify-between">
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <Button onClick={() => addListItem("ingredients")} color="primary">
              + Add Ingredient
            </Button>
          </div>
          {recipe.ingredients.map((ingredient, index) => (
            <TextField
              key={index}
              fullWidth
              value={ingredient}
              onChange={(e) =>
                handleListChange("ingredients", index, e.target.value)
              }
              placeholder={`Ingredient ${index + 1}`}
              margin="normal"
              required
            />
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <Typography variant="h6" gutterBottom>
              Steps
            </Typography>
            <Button onClick={() => addListItem("steps")} color="primary">
              + Add Step
            </Button>
          </div>
          {recipe.steps.map((step, index) => (
            <TextField
              key={index}
              fullWidth
              multiline
              rows={2}
              value={step}
              onChange={(e) => handleListChange("steps", index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              margin="normal"
              required
            />
          ))}
        </div>
        <Box display="flex" justifyContent="flex-start" gap={2} mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color={isEditing ? "warning" : "primary"}
            className={isEditing ? "!bg-yellow-500" : ""}
          >
            {isEditing ? "Update Recipe" : "Add Recipe"}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Container>
  );
}

export default RecipeForm;
