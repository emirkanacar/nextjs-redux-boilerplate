"use client"

import storage from "@/redux/fakeStorage";
import { persistReducer } from 'redux-persist';
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

import todoReducer from './slices/todoSlice';
import authReducer from './slices/authSlice';

const todoPersistConfig = {
    key: 'todo',
    storage: storage,
    whitelist: ['todos'],
}

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['user', 'isAuthenticated'],
}

const rootReducer = combineReducers({
    todo: persistReducer(todoPersistConfig, todoReducer),
    auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
