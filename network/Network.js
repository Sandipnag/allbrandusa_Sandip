import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

//THIS CODE IS FOR DEBUGGIN NETWORK CALLES IN CHROME DEVTOOLS
//REMOVE THIS ON PRODUCTION BUILD

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//   GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

export const Network = (method, url, data = {}) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if (method === 'GET') {
          axios({
            method,
            url: `${url}`,
            body: data,
          }).then(response => {
            if (response.status === 200 || response.response_code === 2000) {
              resolve(response.data);
            } else {
              reject('something went wrong');
            }
          });
        } else {
          axios({
            method,
            url: `${url}`,
            data,
          })
            .then(response => {
              if (response.status === 200 || response.response_code === 2000) {
                resolve(response.data);
              } else {
                reject('something went wrong');
              }
            })
            .catch(err => console.log(err, 'Error network'));
        }
      }
    });
  });
};
