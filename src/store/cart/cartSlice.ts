import { createAppSlice } from "@/constants";

import { getItemsCount } from "@/actions/cart";
import { CartItemsNumberResponse, CartState } from "@/typings/Cart";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: CartState = {
    userItemsCount: null
};

export const fetchCartCount = createAsyncThunk<
    CartItemsNumberResponse
    >(
    'cartSlice/fetchCartCount',
    async (status, thunkAPI) => {
        const userItemsCount = await getItemsCount();

        return userItemsCount as CartItemsNumberResponse;
    }
);

const cartSlice = createAppSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addOneToCart(state){
            if(state.userItemsCount) {
                state.userItemsCount++;
            } else {
                state.userItemsCount = 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartCount.pending, (state) => {
            })
            .addCase(fetchCartCount.fulfilled, (state, action: PayloadAction<CartItemsNumberResponse>) => {
                state.userItemsCount = action.payload?._sum?.amount ?? 0;
                
            })
            .addCase(fetchCartCount.rejected, (state, action) => {
                state.userItemsCount = 0;
            });
    }
});

export const { addOneToCart } = cartSlice.actions;


export default cartSlice.reducer;