import { useEffect } from 'react';
import './App.css';
import { User } from './types';
import { getUserFromDB } from './utility';
import { useAppDispatch } from './hooks';
import { setUser } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import { AuthProvider } from './contexts/AuthContext';
import HomePageRoute from './pages/homepage';
import UserProfile from './pages/UserProfile';
import ItemsPage from './pages/items_page';

function App() {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const userData = localStorage.getItem('userId');
    if (!userData) return;
    const localUser = JSON.parse(userData) as User;
    getUserFromDB(localUser.uid)
      .then(({user, error}) => {
        console.assert(!error, error);
        if (!error)
        dispatch(setUser(user!));
      })
    dispatch(setUser(localUser));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route Component={HomePageRoute}>
            <Route path="/" Component={ItemsPage} />
            <Route path="/profile" Component={UserProfile} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
