"use client"

import storage from "@/redux/fakeStorage";
import { persistReducer } from 'redux-persist';
import {combineReducers} from "redux";

import todoReducer from './slices/todoSlice';
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const todoPersistConfig = {
    key: 'todo',
    storage: storage,
    whitelist: ['todos'],
}

const rootReducer = combineReducers({
    todo: persistReducer(todoPersistConfig, todoReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
