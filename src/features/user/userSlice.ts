import { UserState } from "./userType/createUser.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding.ts";
import { Position } from "../../services/type/Position.ts";
import { PositionObject } from "../../services/type/PositionObject.ts";
import { action } from "../order/CreateOrder.tsx";

const initialState: UserState = {
  username: "",
  status: "idle",
  position: { latitude: "", longitude: "" },
  address: "",
  error: "",
};

type AddressPayload =
  | {
      position: { latitude: string; longitude: string };
      address: string;
    }
  | { error: { message: string } };

function getPosition(): Promise<unknown> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = (await getPosition()) as Position;
    const position: PositionObject = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
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
            position: { latitude: string; longitude: string };
            address: string;
          }>,
        ) => {
          state.position = action.payload.position;
          state.address = action.payload.address;
          state.status = "idle";
        },
      ),
  // TODO: HANDLE REJECTED
});

// THUNK
// This will produce 3 actions promise type: pending, fulfilled, rejected

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
