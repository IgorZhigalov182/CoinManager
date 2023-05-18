export const getDataOperationsd = async () => {
  try {
    const response = await fetch('http://localhost:3000/operations');
    const operations = await response.json();
    return operations;
  } catch (error) {
    console.log(error);
  }
};
