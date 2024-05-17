'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";

import { store } from "./";

interface ProviderProps {
    children: React.ReactNode;
}

export default function StoreProvider({ children }: ProviderProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
