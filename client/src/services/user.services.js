import httpService from './http.services';
const userEndpoint = 'user/';

const userService = {
  getUser: async (userId) => {
    const { data } = await httpService.get(userEndpoint, {
      params: {
        orderBy: '_id',
        equalTo: `${userId}`
      }
    });
    return data.content;
  },
  updateUser: async (userData) => {
    const { data } = await httpService.put(userEndpoint + userData._id, userData);
    return data;
  }
};

export default userService;
