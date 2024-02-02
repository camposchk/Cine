import "./App.css";
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Login";
import { AlertProvider } from "./context/alert";

function App() {
  return (
    <AlertProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />}/>
      </Routes>
    </AlertProvider>
  );
}

export default App;
