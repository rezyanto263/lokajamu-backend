const express = require('express');
const multer = require('multer');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { getRecipeById, addRecipe, searchAllRecipes, editRecipe, deleteRecipe } = require('../controllers/recipeController');
const { addRecipeValidation, editRecipeValidation } = require('../validations/recipeValidation');


const router = express.Router();
const upload = multer({ dest: '/tmp/uploads/', limits: { fileSize: 1024 * 1024 * 10 } });

router.get('/:id', getRecipeById);
router.get('/', searchAllRecipes);
router.post('/', upload.single('image'), validateMiddleware(addRecipeValidation), addRecipe);
router.put('/:id', upload.single('image'), validateMiddleware(editRecipeValidation), editRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;