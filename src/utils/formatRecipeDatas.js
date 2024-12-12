const formatRecipeDatas = (rows) => {
  return rows.map((row) => {
    const tags = row.tags ? row.tags.split(',') : [];

    console.log(row.ingredientDetails);
    const ingredients = row.ingredientDetails
      ? row.ingredientDetails.split('|').map((i) => {
        const [ingredient, quantity, notes = null] = i.split(':');
        return { ingredient, quantity, notes };
      })
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