import { createAppSlice } from "@/constants";

import { SearchInputState } from "@/typings/Navigation";
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchInputState = {
    search: ''
};

const searchSlice = createAppSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<SearchInputState>){
            state.search = action.payload.search;
        }
    }
});

export const { setSearch } = searchSlice.actions;


export default searchSlice.reducer;