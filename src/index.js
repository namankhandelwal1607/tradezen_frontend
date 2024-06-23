import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import Stock from './pages/Stock';
import Homes from './pages/Homes'
import CryptoDetails from './components/CryptoDetails';
import App from './App'
import reportWebVitals from './reportWebVitals';
import { wallets } from '@cosmos-kit/keplr-extension';
import { ChainProvider } from '@cosmos-kit/react';
import "@interchain-ui/react/styles";
import { assets, chains } from "chain-registry";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mantra from './chainconfig';
window.Buffer = window.Buffer || require("buffer").Buffer;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children:[
      {
        path:"/",
        element: <Crypto />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path:"/trending",
        element: <Trending />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path:"/saved",
        element: <Saved />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path:"/stock",
        element: <Stock />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },

      {
        path:"/homes",
        element: <Homes />,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      }
      
    ]


  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ChainProvider
      chains={[...chains, mantra]}
      assetLists={assets}
      wallets={wallets}
    >
      <RouterProvider router={router} />

      {/* <App /> */}

    </ChainProvider>
  </React.StrictMode>
);

reportWebVitals();
