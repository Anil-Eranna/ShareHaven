import "./App.css";
import Pages from "./Components/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Components/AppContext/AppContext";

function App() {
  return (
    <h1 className="App">
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <AppContext>
          <Pages></Pages>
        </AppContext>
      </BrowserRouter>
    </h1>
  );
}

export default App;
