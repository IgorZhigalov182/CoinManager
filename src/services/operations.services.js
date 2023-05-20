export const getDataOperations = async () => {
  try {
    const response = await fetch('http://localhost:3000/operations');
    const operations = await response.json();
    return operations;
  } catch (error) {
    console.log(error);
  }
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
