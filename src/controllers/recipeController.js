const formatRecipeDatas = require('../utils/formatRecipeDatas');
const path = require('path');
const fs = require('fs');
const bucket = require('../config/googleCloud');
const Recipe = require('../models/recipeModel');
const Tag = require('../models/tagModel');
const Ingredient = require('../models/ingredientModel');
const Step = require('../models/stepModel');
const Tip = require('../models/tipModel');

const getRecipeById = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const [recipeResults] = await Recipe.getById(recipeId);

    if (recipeResults.length === 0) {
      res.status(404).json({
        status: 'fail',
        message: 'Recipe not found'
      });
    } else {
      const [recipe] = formatRecipeDatas(recipeResults);
      res.json({
        status: 'success',
        data: {
          recipe: recipe
        }
      });
    }
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Can not get recipe data' });
  }
};

const searchAllRecipes = async (req, res) => {
  const searchKeyword = req.query.search;

  try {
    const [recipeResults] = !searchKeyword ? await Recipe.getAll() : await Recipe.search(searchKeyword);
    const recipes = formatRecipeDatas(recipeResults);

    res.json({
      status: 'success',
      data: {
        recipes: recipes
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Can not get recipes data' });
  }
};

const addRecipe = async (req, res) => {
  const { name, tags, description, ingredients, steps, prepTime, cookTime, totalTime, servingSize, tips } = req.body;
  const imageFile = req.file;
  const fileName = Date.now() + path.extname(imageFile.originalname);

  try {
    await bucket.upload(imageFile.path, {
      destination: `recipes/${fileName}`,
      metadata: {
        contentType: imageFile.mimetype
      },
      predefinedAcl: 'publicRead'
    });
    fs.unlinkSync(imageFile.path);

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/recipes/${fileName}`;
    const [recipeResults] = await Recipe.add(name, imageUrl, description, prepTime, cookTime, totalTime, servingSize);
    const recipeId = recipeResults.insertId;

    await Ingredient.addBatch(ingredients.map((i) => [recipeId, i.ingredient, i.quantity, i.notes ? i.notes : null]));
    await Step.addBatch(steps.map((s) => [recipeId, s.stepNumber, s.instruction]));

    if (tags) {
      await Tag.addBatch(tags.map((tag) => [tag, recipeId, 'recipes']));
    }

    if (tips) {
      await Tip.addBatch(tips.map((tip) => [recipeId, tip]));
    }

    res.status(201).json({
      status: 'success',
      message: 'Recipe added successfully',
      data: {
        recipeId: recipeId
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Can not add recipe data' });
  }
};

const editRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const [recipeResults] = await Recipe.getById(recipeId);
    const recipe = recipeResults[0];
    const {
      name = recipe.name, tags, description = recipe.description, ingredients, steps,
      prepTime = recipe.prepTime, cookTime = recipe.cookTime, totalTime = recipe.totalTime,
      servingSize = recipe.servingSize, tips
    } = req.body;
    let { imageUrl = recipe.imageUrl } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      await Recipe.edit(name, imageUrl, description, prepTime, cookTime, totalTime, servingSize, recipeId);
    } else {
      const fileName = Date.now() + path.extname(imageFile.originalname);

      const urlParts = new URL(imageUrl);
      const filePath = urlParts.pathname.replace(`/${bucket.name}/`, '');
      await bucket.file(`${filePath}`).delete();

      await bucket.upload(imageFile.path, {
        destination: `recipes/${fileName}`,
        metadata: {
          contentType: imageFile.mimetype
        },
        predefinedAcl: 'publicRead'
      });
      fs.unlinkSync(imageFile.path);

      imageUrl = `https://storage.googleapis.com/${bucket.name}/recipes/${fileName}`;

      await Recipe.edit(name, imageUrl, description, prepTime, cookTime, totalTime, servingSize, recipeId);
    }

    if (tags) {
      await Tag.deleteAll(recipeId, 'recipes');
      await Tag.addBatch(tags.map((tag) => [tag, recipeId, 'recipes']));
    }

    if (ingredients) {
      await Ingredient.deleteAll(recipeId);
      await Ingredient.addBatch(ingredients.map((i) => [recipeId, i.ingredient, i.quantity, i.notes]));
    }

    if (steps) {
      await Step.deleteAll(recipeId);
      await Step.addBatch(steps.map((s) => [recipeId, s.stepNumber, s.instruction]));
    }

    if (tips) {
      await Tip.deleteAll(recipeId);
      await Tip.addBatch(steps.map((s) => [recipeId, s.description]));
    }

    res.json({
      status: 'success',
      message: 'Recipe edited successfully'
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Can not edit recipe data' });
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const [recipeResults] = await Recipe.delete(recipeId);

    if (recipeResults.affectedRows === 0) res.status(404).json({ status: 'fail', message: 'Spice not found' });

    res.json({
      status: 'success',
      message: 'Recipe deleted successfully'
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Can not delete recipe data' });
  }
};

module.exports = {
  getRecipeById,
  searchAllRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe
};