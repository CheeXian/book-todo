import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user2",
    initialState: {
        isAuthenticated: localStorage.getItem("user2") ? true : false,
        user2: localStorage.getItem("user2") ? JSON.parse(localStorage.getItem("user2")) : null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user2 = action.payload;
            localStorage.setItem("user2", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user2 = null;
            localStorage.removeItem("user2");
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;