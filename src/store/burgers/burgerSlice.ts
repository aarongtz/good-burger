import { PRODUCTS_LIST_URL, createAppSlice } from "@/constants";
import { BurgerItem, BurgerListApiResponse, BurgerState } from "@/typings/Burgers";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


const initialState: BurgerState = {
    burgersArray: [],
    burgersObject: {},
    loading: false
};

export const fetchData = createAsyncThunk(
    'burgerSlice/fetchData',
    async (_, thunkAPI) => {
        const burgerList = await fetch(PRODUCTS_LIST_URL, {
            cache: 'force-cache'
        })
            .then(res => res.json());

        return burgerList;
    }
);

const burgerSlice = createAppSlice({
    name: 'burgerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<BurgerListApiResponse>) => {
                const {products} = action.payload;
                state.burgersArray = products;

                products.forEach((value: BurgerItem) => {
                    state.burgersObject[value.slug] = value;
                });

                state.loading = false;
                
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export default burgerSlice.reducer;