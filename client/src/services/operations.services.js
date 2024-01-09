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
  }
};

export default operationService;
