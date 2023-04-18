import "./App.css";
import { useQuery, gql } from "@apollo/client";
import HeaderC from "./component/Header";
import { BrowserRouter } from "react-router-dom";


function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderC />
      </BrowserRouter>
    </div>
  );
}

export default App;
