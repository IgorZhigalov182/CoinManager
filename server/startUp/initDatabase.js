// 1. Любой пользователь будет иметь default categories
// 2. Они равны mock данным

const Category = require('../models/Category');

const categoryMock = require('../mock/categories.json');

module.exports = async () => {
  const categories = await Category.find();

  // if (categories.length !== categoryMock.length) {
  //   await createInitialEntity(Category, categoryMock);
  // }
};

// async function createInitialEntity(Model, data) {
//   await Model.collection.drop();
//   return Promise.all(
//     data.map(async (item) => {
//       try {
//         delete item._id;
//         const newItem = new Model(item);
//         await newItem.save();
//         return newItem;
//       } catch (error) {
//         return error;
//       }
//     }),
//   );
// }
