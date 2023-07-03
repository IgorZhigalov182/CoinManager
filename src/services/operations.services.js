import httpService from './http.services';

const operationEndpoint = 'operation/';

const operationService = {
  getOperations: async (userId) => {
    const { data } = await httpService.get(operationEndpoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`,
      },
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
    console.log(data.content);
    return data.content;
  },
};

export const getDataOperations = async () => {
  try {
    const response = await fetch('http://localhost:3000/operations');
    const operations = await response.json();
    return operations;
  } catch (error) {
    console.log(error);
  }
};

export const addOperation = async (operationData) => {
  fetch('http://localhost:3000/operations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(operationData),
  });
};

export const getOperation = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/operations/${id}`);
    const operation = await response.json();
    return operation;
  } catch (error) {
    console.log(error);
  }
};

export const updateOperation = async (operationData) => {
  fetch(`http://localhost:3000/operations/${operationData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(operationData),
  });
};

export const deleteOperation = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/operations/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
};

export default operationService;
