import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    updateAddress: (state, action) => {
      state.address[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateUser, updateAddress } = userSlice.actions;
export default userSlice.reducer;
