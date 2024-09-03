import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import teamReducer from '../features/teams/teamSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        teams: teamReducer
    }
});
