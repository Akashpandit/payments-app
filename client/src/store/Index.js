import { configureStore, createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("clientId");
            localStorage.removeItem("userId");
            localStorage.removeItem("clientDesc");
            localStorage.removeItem("clientName");
            localStorage.removeItem("totalSum");
            localStorage.removeItem("clientContact");
            localStorage.removeItem("clientArea");
            state.isLoggedIn = false;
        }
    }
})

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
})