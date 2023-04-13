import "./App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Navbar from "./component/Navbar";
import { routes } from "./routes";
import '@brainhubeu/react-carousel/lib/style.css';

const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Navbar />
      {element}
    </>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
