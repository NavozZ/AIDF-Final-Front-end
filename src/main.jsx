import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from './Pages/sign-in.page';
import SignUpPage from './Pages/sign-up.page';
import HomePage from './Pages/HomePage.jsx';
import NotFoundPage from './Pages/not-found.page';
import RootLayoutPage from './components/layouts/root-layout.page';
import HotelPage from './Pages/hotels.page';
import HotelDetailsPage from './Pages/hotel-details.page';
;

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayoutPage/>}>  
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/hotels/:_id" element={<HotelDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
);
