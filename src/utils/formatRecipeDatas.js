const formatRecipeDatas = (rows) => {
  console.log(rows);
  return rows.map((row) => {
    const tags = row.tags ? row.tags.split(',') : [];

    const ingredients = row.ingredientNames
      ? row.ingredientNames.split('|').map((name, index) => ({
        ingredient: name,
        quantity: row.ingredientQuantities.split('|')[index],
        notes: row.ingredientNotes ? row.ingredientNotes.split('|')[index] ? row.ingredientNotes.split('|')[index] : null : null,
      }))
      : [];

    const steps = row.stepNumbers
      ? row.stepNumbers.split('|').map((stepNumber, index) => ({
        stepNumber: parseInt(stepNumber),
        instruction: row.instructions.split('|')[index]
      }))
      : [];

    const tips = row.tips ? row.tips.split('|') : [];

    return {
      id: row.id,
      name: row.name,
      tags,
      imageUrl: row.imageUrl,
      description: row.description,
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