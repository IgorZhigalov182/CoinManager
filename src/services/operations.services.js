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

export const deleteOperation = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/operations/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
};
