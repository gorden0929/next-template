import { APIPaths } from "@/configs/api";
import { debugPrint } from "./utilities";

const callAPI = async (
  target: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any,
  auth: boolean = false,
  contentType: string = "application/json",
  responseType: "json" | "text" | "blob" = "json",
) => {
  const headers: any = {};
  if (contentType) headers["Content-Type"] = contentType;
  if (auth)
    headers["Authorization"] = "Bearer " + localStorage.getItem("token");

  const requestOptions: any = {
    method: method,
    headers: headers,
  };

  if (body) requestOptions.body = JSON.stringify(body);

  try {
    const result = await fetch(target, requestOptions);
    if (responseType === "json") {
      return result.json();
    } else if (responseType === "text") {
      return result.text();
    } else if (responseType === "blob") {
      return result.blob();
    }
    return result;
  } catch (error) {
    debugPrint(error);
    return error;
  }
};

const constructTarget = (
  path: APIPaths,
  params?: string | string[],
  query?: Record<string, any> | string,
) => {
  let target = APIPaths.apiEndPoint + path;

  if (params) {
    if (typeof params === "string") {
      target = `${target}/${params}`;
    } else if (Array.isArray(params)) {
      target = `${target}/${params.join("/")}`;
    }
  }

  if (query) {
    if (typeof query === "string") {
      target = `${target}?${query}`;
    } else if (typeof query === "object") {
      target = `${target}?${new URLSearchParams(query).toString()}`;
    }
  }

  return target;
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

export const login = (username: string, password: string) => {
  return callAPI(constructTarget(APIPaths.login), "POST", {
    username,
    password,
  });
};

export async function testGet() {
  return callAPI(constructTarget(APIPaths.test, "test", { abc: 1 }), "GET");
}
export async function testPost() {
  return callAPI(
    constructTarget(APIPaths.test, undefined, { abc: 1 }),
    "POST",
    { abc: 1 },
  );
}
export async function testPut() {
  return callAPI(constructTarget(APIPaths.test), "PUT", { put: 1 });
}
export async function testPatch() {
  return callAPI(constructTarget(APIPaths.test), "PATCH", { patch: 1 });
}
export async function testDelete() {
  return callAPI(
    constructTarget(APIPaths.test, undefined, { delete: 1 }),
    "DELETE",
  );
}
