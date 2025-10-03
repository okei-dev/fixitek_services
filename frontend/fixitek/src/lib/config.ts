// import axios from "axios";
// import { baseURL } from "./api";


// export function getAuthHeaders() {
//   const token = localStorage.getItem("access");
//   return token ? { Authorization: `JWT ${token}` } : {};
// }


// export async function refreshAccessToken() {
//   const refreshToken = localStorage.getItem("refresh");
//   if (!refreshToken) {
//     window.location.href = "/login";
//     return null;
//   }

//   try {
//     const res = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
//       refresh: refreshToken,
//     });
//     const newAccess = res.data.access;
//     localStorage.setItem("access", newAccess);
//     return newAccess;
//   } catch (err) {
//     window.location.href = "/login";
//     return null;
//   }
// }
