import "./App.css";
import Form from "./components/form/Form";
import SavedUsers from "./components/savedUsers/SavedUsers";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/allUsersData" element={<SavedUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
