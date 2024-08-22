import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeById, deleteRecipe } from "../utils/recipeStorage";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Box,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationModal from "../components/ConfirmationModal";
import Snackbar from "../components/Snackbar";
import moment from "moment";

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedRecipe = getRecipeById(parseInt(id));
    setRecipe(fetchedRecipe);
  }, [id]);

  const handleDelete = () => {
    setOpenModal(true);
  };

  const confirmDelete = () => {
    deleteRecipe(parseInt(id));
    setOpenModal(false);
    setSnackbar({
      open: true,
      message: "Recipe deleted successfully!",
      severity: "success",
    });
    setTimeout(() => navigate("/"), 2000);
  };

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {recipe.title}
          </Typography>
          <Box mb={2}>
            <Chip
              label={`Created: ${moment(recipe.createdAt).fromNow()}`}
              color="primary"
              size="small"
              sx={{ mr: 1, mb: 1 }}
              className="cursor-pointer"
            />
            <Chip
              label={`Updated: ${moment(recipe.updatedAt).fromNow()}`}
              color="secondary"
              size="small"
              sx={{ mb: 1 }}
              className="cursor-pointer"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              component={Link}
              to={`/edit/${recipe.id}`}
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} gap={2}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Typography variant="h6" mt={2} gutterBottom>
          Ingredients
        </Typography>
        <div className="flex gap-2" dense>
          {recipe.ingredients.map((ingredient, index) => (
            <div>{`${ingredient},`} </div>
          ))}
        </div>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Preparation Steps
            </Typography>
            <List>
              {recipe.steps.map((step, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Step ${index + 1}`}
                    secondary={step}
                    secondaryTypographyProps={{ component: "div" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this recipe?"
      />
      <Snackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Paper>
  );
}

export default RecipeDetail;
