import httpService from './http.services';

const operationEndpoint = 'operation/';

const operationService = {
  getOperations: async (userId) => {
    const { data } = await httpService.get(operationEndpoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`
      }
    });
    return data.content;
  },
  createOperation: async (payload) => {
    const { data } = await httpService.post(operationEndpoint, payload);
    return data.content;
  },
  removeOperation: async (operationId) => {
    const { content } = await httpService.delete(operationEndpoint + operationId);
    return content;
  },
  fetchAll: async () => {
    const { data } = await httpService.get(operationEndpoint);
    return data;
  },
  updateOperation: async (operationData) => {
    const { data } = await httpService.patch(operationEndpoint + operationData._id, operationData);
    return data.content;
  },
  getOperationsWithCategories: (operations, categories) => {
    const operationsWithCategories = [];

    if (categories && operations.length !== 0) {
      operations.forEach((operation) => {
        categories.forEach((category) => {
          if (operation?.category === category._id) {
            operationsWithCategories.push({
              ...operation,
              categoryLabel: category.name,
              categoryColor: category.color
            });
          }
        });
      });
    }

    return operationsWithCategories;
  }
};

export default operationService;
