import { UserState } from "./userType/createUser.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding.ts";
import { Position } from "../../services/type/Position.ts";

const initialState: UserState = {
  username: "",
  status: "idle",
  position: { latitude: 0, longitude: 0 },
  address: "",
  error: "",
};
function getPosition(): Promise<Position> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      reject,
    );
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position: Position = {
      latitude: positionObj.latitude,
      longitude: positionObj.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address }; // Payload of the FULFILLED STATE
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state: UserState, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state: UserState) => {
        state.status = "loading";
      })
      .addCase(
        fetchAddress.fulfilled,
        (
          state: UserState,
          action: PayloadAction<{
            position: Position;
            address: string;
          }>,
        ) => {
          state.position = action.payload.position;
          state.address = action.payload.address;
          state.status = "idle";
        },
      )
      .addCase(fetchAddress.rejected, (state: UserState) => {
        state.status = "error";
        state.error = "There was a problem getting your address";
      }),
});

// THUNK
// This will produce 3 actions promise type: pending, fulfilled, rejected

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
