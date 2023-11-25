import { FC, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // BrowserRouter para HashRouter
import { Login } from '../../pages/Login/index';
import { Todos } from "../../pages/Todos";

const CustomRoutes : FC<any> = ({ children }) => {
  const routes = [   
    {
      id: 1,
      path: '/',
      component: <Login />
    }, 
    {
      id: 2,
      path: '/todos',
      component: <Todos /> // Replace with your page
    }      
  ];  
  return (
    <Router>
      <Routes>
        {
          routes.map((route) => (
            <Route 
              key={route.id} 
              path={route.path} 
              element={route.component} 
            />
          ))
        }
        {children}
        
      </Routes>
    </Router>
  )
};

export default CustomRoutes;