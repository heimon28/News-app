// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// const initialState = {
//   userData: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
 
//   reducers: {
//     login: (state, action) => {
//       axios
//         .post("/api/v2/users/login", {
//           email: action.payload.email,
//           password: action.payload.password,
//         })
//         .then((response) => {
//           if (response) {
//             state.userData = response.data;
//             console.log(response.data);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },

//   },
// });
 
// export const {login} = authSlice.actions
// export default authSlice.reducer;
