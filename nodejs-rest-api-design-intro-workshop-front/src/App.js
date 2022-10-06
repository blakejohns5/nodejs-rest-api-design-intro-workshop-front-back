import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import AuthContext from "./context/AuthContext";
import { auth } from "./firebase/firebase";


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [currentUser]);

  return (
    <AuthContext.Provider value={currentUser}>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
