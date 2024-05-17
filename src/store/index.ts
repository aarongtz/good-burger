import { useDispatch, useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
    persistStore, 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import burgerReducer from './burgers/burgerSlice';
import cartReducer from './cart/cartSlice';
import visualModeReducer from './nav/visualModeSlice';
import searchReducer from './nav/searchSlice';


const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, burgerReducer);
const persistCartReducer = persistReducer(persistConfig, cartReducer);
const persistVisualModeReducer = persistReducer(persistConfig, visualModeReducer);


export const store = configureStore({
    reducer: {
        burgerReducer: persistedReducer,
        cartReducer: persistCartReducer,
        visualModeReducer: persistVisualModeReducer,
        searchReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();