const userService = {
  getUsersFromDB: async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.log(error);
    }
  },
  createUser: async (data) => {
    try {
      await fetch('http://localhost:3000/users', {
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
  updateUser: async (data) => {
    try {
      await fetch(`http://localhost:3000/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        // body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default userService;
