import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { AlertProvider } from "./context/alert";
import FeedPage from "./pages/Feed";
import MoviePage from "./pages/Movie";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AccessDenied } from "./pages/AccessDenied";
import MovieRegisterPage from "./pages/MovieRegister";


function App() {
  return (
    <AlertProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute
              errorPage={<AccessDenied />}
              targetPage={<FeedPage />}
            />
          }
        />
        <Route path="/movie-details" element={<MoviePage />} />
        <Route path='/' element={<LoginPage />}/>
        <Route path='/movie-details' element={<MoviePage/>}/>
        <Route path="/movie-register" element={<MovieRegisterPage/>}/>
      </Routes>
    </AlertProvider>
  );
}

export default App;
