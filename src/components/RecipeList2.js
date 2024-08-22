// src/components/RecipeList.js
import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function RecipeList({ recipes, deleteRecipe, setEditingRecipe }) {
  return (
    <List>
      {recipes.map((recipe) => (
        <ListItem key={recipe.id} className="mb-4 bg-gray-100 rounded">
          <ListItemText
            primary={recipe.title}
            secondary={
              <>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                <br />
                <strong>Steps:</strong> {recipe.steps}
              </>
            }
          />
          <IconButton onClick={() => setEditingRecipe(recipe)} className="mr-2">
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteRecipe(recipe.id)}>
            <Delete />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default RecipeList;
