import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    name: '',
    email: '',
    token: '',
    role: '',
    isAuthenticated: false
};
export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loggedInUser: (state, action) => {
            return {
                ...state,
                _id: action.payload._id,
                email: action.payload.email,
                name: action.payload.name,
                role: action.payload.role,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated
            };
        },
        logoutUser: (state) => {
            return {
                ...initialState
            };
        }
    }
});

export const { loggedInUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;