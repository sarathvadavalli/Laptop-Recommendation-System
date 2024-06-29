import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Beginnerform from './Components/Beginnerform';
import Intermediateform from './Components/Intermediateform';
import Proform from './Components/Proform';
import Laptopshow from './Components/Laptopshow';
// import 'bootstrap/dist/css/bootstrap.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "Beginnerform",
    element: <Beginnerform></Beginnerform>,
  },
  {
    path: "Intermediateform",
    element: <Intermediateform></Intermediateform>,
  },
  {
    path: "Proform",
    element: <Proform></Proform>,
  },
  {
    path: "Laptopshow",
    element: <Laptopshow></Laptopshow>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();