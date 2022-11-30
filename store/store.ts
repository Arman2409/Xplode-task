import {configureStore, Store} from "@reduxjs/toolkit";

// import signInSlice from "./signInSlice";
// import signUpSlice from "./signUpSlice";
// import userSlice from "./userSlice";
import todos from "./slices/todos";

interface Reducers{
    todos: any
};

const reducers:Reducers = {
    todos
};

const store:Store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;