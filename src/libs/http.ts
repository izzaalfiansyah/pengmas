// import axios from "axios";

// export default function () {
//   const client = axios.create({
//     baseURL: "http://127.0.0.1:8000/api",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   return client;
// }

import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import reactHook from "alova/react";

export default function () {
  const instance = createAlova({
    statesHook: reactHook,
    requestAdapter: GlobalFetch(),
    responded: (res) => res.json(),
    baseURL: "http://127.0.0.1:8000/api",
  });

  return instance;
}
