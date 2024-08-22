import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <Box className="p-4">
        <Typography
          variant="h4"
          component="h2"
          className="text-gray-600"
          gutterBottom
        >
          {recipe.title}
        </Typography>
        <Typography
          variant="body"
          component="h2"
          className="text-gray-600"
          gutterBottom
        >
          {recipe.description}
        </Typography>

        <Typography className="text-gray-600" mt={2}>
          Submitted {moment(recipe.createdAt).fromNow()}
        </Typography>
        <Typography className="text-gray-600">
          Updated {moment(recipe.updatedAt).fromNow()}
        </Typography>
      </Box>
    </Link>
  );
}

export default RecipeCard;
