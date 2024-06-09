import { APIPaths } from '@/configs/api';
import { debugPrint } from './utilities';

const post = async (target: string, body?: any, contentType: string = 'application/json') => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
    },
    body: JSON.stringify(body),
  };
  return await callAPI(target, requestOptions);
};

const get = async (target: string, query?: any) => {
  const requestOptions: RequestInit = {
    method: 'GET',
  };
  return await callAPI(target, requestOptions);
};

const callAPI = (url: string, request: RequestInit) => {
  return fetch(url, request);
};

// async function callAPI(body, target, defaultReturn) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': APIHeader.contentType,
//     },
//     body: JSON.stringify(body),
//   };

//   debugPrint(target);
//   debugPrint(body);

//   var proceed = true;

//   if (proceed) {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return await fetch(target, requestOptions)
//       .then((response) => {
//         return response.json();
//       })
//       .then((responseData) => {
//         return responseData;
//       })
//       .catch((error) => {
//         return defaultReturn;
//       });
//   } else {
//     return defaultReturn;
//   }
// }

export async function login() {
  const target = APIPaths.apiEndPoint + APIPaths.login;

  return await post(target);
}

export async function testGet() {
  const target = APIPaths.apiEndPoint + APIPaths.test + '/asd?q=asd';
  return await get(target, {});
}
