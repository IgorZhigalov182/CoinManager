export function sumByCategory(data) {
  const result = [];
  const categories = data.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];

  uniqueCategories.forEach((category) => {
    const categorySum = data
      .filter((item) => item.category === category)
      .reduce((acc, item) => acc + +item.sum, 0);
    result.push({ category, sum: categorySum });
  });
  return result;
}
