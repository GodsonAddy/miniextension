import React, { useEffect } from "react";
import "./App.css";
import LoginStudent from "./components";
import { getUser } from "./redux/actions/studentAction";
import { store } from "../src/redux/store";

function App() {
  useEffect(() => {
    store.dispatch<any>(getUser());
  }, []);
  return (
    <div>
      <LoginStudent />
    </div>
  );
}

export default App;
