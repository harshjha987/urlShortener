import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
import { useDispatch } from "react-redux";


const persistConfig = {
  key: "root", 
  storage, // 
};


const persistedReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
  reducer: {
    user: persistedReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


export const persistor = persistStore(store);

export default store;
