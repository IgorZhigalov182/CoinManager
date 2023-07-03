import httpService from './http.services';

const categoryEndpoint = 'category/';

const categoryService = {
  getCategories: async (userId) => {
    const { data } = await httpService.get(categoryEndpoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`,
      },
    });
    return data.content;
  },
  createCategory: async (payload) => {
    const { data } = await httpService.post(categoryEndpoint, payload);
    return data.content;
  },
  removeCategory: async (categoryId) => {
    const { content } = await httpService.delete(categoryEndpoint + categoryId);
    return content;
  },
  fetchAll: async () => {
    const { data } = await httpService.get(categoryEndpoint);
    return data;
  },
  updateCategory: async (categoryData) => {
    const { data } = await httpService.patch(categoryEndpoint + categoryData._id, categoryData);
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
  /*****for JSON-server******/
  // createCategory: async (data) => {
  //   try {
  //     await fetch('http://localhost:3000/categories', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // updateCategory: async (data) => {
  //   try {
  //     await fetch(`http://localhost:3000/categories/${data.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  //   deleteCategory: async (id) => {
  //     try {
  //       await fetch(`http://localhost:3000/categories/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json;charset=utf-8',
  //         },
  //         // body: JSON.stringify(data),
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // };

  // export const getCategoriesFromDB = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/categories');
  //     const categories = await response.json();
  //     return categories;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };\
};

export function sumByCategory(data) {
  const categories = data.map((item) => ({
    sum: item.sum,
    id: item.category,
    label: item.categoryLabel,
    color: item.categoryColor,
  }));

  const uniqueMap = new Map();

  categories.forEach((obj) => {
    if (!uniqueMap.has(obj.id)) {
      uniqueMap.set(obj.id, obj);
    }
  });

  const uniqueCategoriesArray = Array.from(uniqueMap.values());

  uniqueCategoriesArray.forEach((uniqCategory) => {
    uniqCategory.sum = 0;
    data.forEach((operation) => {
      if (uniqCategory.id == operation.category) {
        uniqCategory.sum += operation.sum;
      }
    });
  });

  return uniqueCategoriesArray;
}

export default categoryService;
