import httpService from './http.services';

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

const categoryEndpoint = 'category/';

const categoryService = {
  fetchAll: async () => {
    const { data } = await httpService.get(categoryEndpoint);
    return data;
  },
};
export default categoryService;
