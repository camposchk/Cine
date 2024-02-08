import "./App.css";
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Login";
import { AlertProvider } from "./context/alert";
import FeedPage from "./pages/Feed";
import MoviePage from "./pages/Movie";
import MovieRegisterPage from "./pages/MovieRegister";


function App() {
  return (
    <AlertProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/feed' element={<FeedPage/>}/>
        <Route path='/movie-details/:idMovie' element={<MoviePage/>}/>
        <Route path="/movie-register" element={<MovieRegisterPage/>}/>
      </Routes>
    </AlertProvider>
  );
}

export default App;
