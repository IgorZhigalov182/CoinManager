import httpService from './http.services';
const userEndpoint = 'user/';

const userService = {
  getUser: async (userId) => {
    const { data } = await httpService.get(userEndpoint, {
      params: {
        orderBy: '_id',
        equalTo: `${userId}`,
      },
    });
    return data.content;
  },
  updateUser: async (userData) => {
    const { data } = await httpService.patch(userEndpoint + userData._id, userData);
    return data;
  },
  // updateUser: async (data) => {
  //   try {
  //     await fetch(`http://localhost:3000/users/${data.id}`, {
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
