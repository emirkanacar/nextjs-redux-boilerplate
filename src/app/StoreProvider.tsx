"use client"

import {ReactNode} from "react";
import {persistStore} from "redux-persist";
import {store} from "@/redux/store";
import {Provider} from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
    persistStore(store)

    return <Provider store={store}>{children}</Provider>;
}
