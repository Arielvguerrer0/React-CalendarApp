import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route  exact path="/Login" element={ <LoginScreen /> } />
          <Route  exact path="/" element={ <CalendarScreen /> } />
          
          {/* Redirect  */}
          <Route path="*" element={ <Navigate replace to="/" /> } /> 

        </Routes>
      </div>
    </Router>
  )
}
