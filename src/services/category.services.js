import { getCategoryDisplayNameById } from '../store/categories/categories.slice';
import httpService from './http.services';

export function sumByCategory(data) {
  const result = [];
  const categories = data.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];

  // console.log(categories);
  uniqueCategories.forEach((category) => {
    const categorySum = data
      .filter((item) => item.category === category)
      .reduce((acc, item) => acc + +item.sum, 0);

    result.push({ category, sum: categorySum });
  });

  console.log(result);
  return result;
  // return result.forEach((category) => getCategoryDisplayNameById(category.category));
}

const categoryEndpoint = 'category/';

const categoryService = {
  fetchAll: async () => {
    const { data } = await httpService.get(categoryEndpoint);
    return data;
  },
  getCategoriesFromDB: async () => {
    try {
      const response = await fetch('http://localhost:3000/categories');
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.log(error);
    }
  },
  createCategory: async (data) => {
    try {
      await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  },
};

// export const getCategoriesFromDB = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/categories');
//     const categories = await response.json();
//     return categories;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default categoryService;
