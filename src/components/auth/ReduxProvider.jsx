"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/store";

export default function ReduxProvider({ children }) {
  const store = makeStore();
  
  return <Provider store={store}>{children}</Provider>;
}
