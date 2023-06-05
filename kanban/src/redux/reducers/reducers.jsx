import { createSlice } from "@reduxjs/toolkit";

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {},
  reducers: {
    increment(state) {
      state.value++;
    },
  },
});
export const { increment } = counterSlice.actions;
export default kanbanSlice.reducer;
