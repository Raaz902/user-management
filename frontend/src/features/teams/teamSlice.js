import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTeam = createAsyncThunk('teams/createTeam', async (team) => {
    const response = await axios.post('/api/team', team);
    return response.data;
});

const teamSlice = createSlice({
    name: 'teams',
    initialState: { current: null, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTeam.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.current = action.payload;
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default teamSlice.reducer;
