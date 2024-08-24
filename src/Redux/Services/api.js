import config from '../../react-native-config';
import apisauce from 'apisauce';

export const rootApi = apisauce.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicAPI = url => {
  console.log('Api Called');
  return rootApi.get(url);
};

const publicPostAPI = (url, body, header) => {
  console.log('Api Called');
  return rootApi.post(url, body, {});
};

// const user_auth_api = (url, body, header) => {
//   return new Promise((resolve, reject) => {
//     rootApi.get(config.API_URL + '/auth/csrf-token').then(res => {
//       console.log(res);
//       if (res.ok) {
//         let request_body = {
//           ...body,
//           _token: res.data,
//         };
//         resolve(rootApi.post(config.API_URL + '/' + url, request_body, {}));
//       } else {
//         reject();
//       }
//     });
//   });
// };

const user_auth_api = async (url, body) => {
  try {
    console.log('Api Called');
    const response = await rootApi.post(config.API_URL + '/' + url, body);
    if (!response.ok) {
      console.log('Failed to send OTP');
    }
    return response;
  } catch (error) {
    console.error('user_auth_api error:', error);
    throw error;
  }
};

export const userFbLogin = token => {
  return new Promise((resolve, reject) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        token,
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(async responseJson => {
        return resolve(responseJson);
      })
      .catch(e => {
        console.log(e);
        let error = {
          message: 'Server not responding!',
        };
        reject(error);
      });
  });
};

const api = {
  user_auth_api,
  publicAPI,
  publicPostAPI,
};

export default api;
