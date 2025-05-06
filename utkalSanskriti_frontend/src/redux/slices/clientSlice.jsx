
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchClientData, createClient } from "../thunks/clientThunks"; 

// const   clientSlice = createSlice({
//   name: 'client',
//   initialState: {
//     clients: [],  // Store multiple users
//     status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Users
//       .addCase(fetchClientData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchClientData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.clients = action.payload;  // Store users in an array
//       })
//       .addCase(fetchClientData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Create User
//       .addCase(createClient.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createClient.fulfilled, (state, action) => {
//         state.status = 'succeeded';
      
//         // Ensure action.payload is the correct data structure and is an array
//         // if (Array.isArray(action.payload)) {
//         //   state.users = action.payload; // If the response is an array, just set the state
//         // } else {
//         //   state.users.push(action.payload); // Add the single new user if it's not an array
//         // }
//       })
      
//       .addCase(createClient.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Update User
//       // .addCase(updateTemple.pending, (state) => {
//       //   state.status = 'loading';
//       // })
//       // .addCase(updateTemple.fulfilled, (state, action) => {
//       //   state.status = 'succeeded';
//       //   const index = state.temples.findIndex(user => user.id === action.payload.id);
//       //   if (index !== -1) {
//       //     state.users[index] = action.payload; // Update existing user
//       //   }
//       // })
//       // .addCase(updateUser.rejected, (state, action) => {
//       //   state.status = 'failed';
//       //   state.error = action.payload;
//       // })
//   },
// });

// export default clientSlice.reducer;





import { createSlice } from "@reduxjs/toolkit";
import { createClient } from "../thunks/clientThunks";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.clients.push(action.payload);
        }
      })
      .addCase(createClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
