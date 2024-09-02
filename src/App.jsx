import { Route, Routes } from "react-router-dom";
import Layouts from "./components/layout/Layouts";
import Home from "./pages/Home";
import { Login, Signup } from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
