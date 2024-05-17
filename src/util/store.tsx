import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import type { RootState } from '@/store'

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import burgerReducer from '@/store/burgers/burgerSlice';
import cartReducer from '@/store/cart/cartSlice';
import visualModeReducer from '@/store/nav/visualModeSlice';
import searchReducer from '@/store/nav/searchSlice';


// Testing purposes only:

const rootReducer = combineReducers({
    burgerReducer,
    cartReducer,
    visualModeReducer,
    searchReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}

type AppStore = ReturnType<typeof setupStore>;


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}