const formatRecipeDatas = (rows) => {
  return rows.map((row) => {
    const tags = row.tags ? row.tags.split(',') : [];

    const ingredients = row.ingredientNames.split('|').map((name, index) => ({
      ingredient: name,
      quantity: row.ingredientQuantities.split('|')[index],
      notes: row.ingredientNotes.split('|')[index] ? row.ingredientNotes.split('|')[index] : null,
    }));

    const steps = row.stepNumbers.split('|').map((stepNumber, index) => ({
      stepNumber: parseInt(stepNumber),
      instruction: row.instructions.split('|')[index]
    }));

    const tips = row.tips ? row.tips.split(',') : [];

    return {
      id: row.id,
      name: row.name,
      description: row.description,
      imageUrl: row.imageUrl,
      tags,
      ingredients,
      steps,
      prepTime: row.prepTime,
      cookTime: row.cookTime,
      totalTime: row.totalTime,
      servingSize: row.servingSize,
      tips
    };
  });
};

module.exports = formatRecipeDatas;