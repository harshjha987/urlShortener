"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../app/redux/store";
import AuthProvider from "./AuthProvider";
import Navbar from "./components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <div className="relative w-full items-center flex justify-center">
          <Navbar />
        </div>
        {children}
      </AuthProvider>
    </PersistGate>
  );
}
