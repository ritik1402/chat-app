import { useState } from "react";
import Auth from "./Pages/Auth";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Auth />
    </>
  );
}

export default App;
