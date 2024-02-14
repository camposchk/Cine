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
import { I18nextProvider } from 'react-i18next';
import i18n from './languages/i18n';
import { UserProvider } from "./context/user";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
      <AlertProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/feed"
            element={
              <ProtectedRoute
                errorPage={<AccessDenied />}
                targetPage={<FeedPage />}
              />
            }
          />
          <Route path='/movie-details/:idMovie' element={<MoviePage/>}/>
          <Route path="/movie-register" element={<MovieRegisterPage/>}/>
        </Routes>
      </AlertProvider>
      </UserProvider>
    </I18nextProvider>
  );
}

export default App;
