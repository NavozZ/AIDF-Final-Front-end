import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from './Pages/sign-in.page';
import SignUpPage from './Pages/sign-up.page';
import NotFoundPage from './Pages/not-found.page';
import HotelDetailsPage from './Pages/hotel-details.page';
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ClerkProvider } from '@clerk/clerk-react';
import RootLayout from './components/layouts/root-layout.page';
import HotelsPage from './Pages/hotels.page';
import HomePage from './Pages/HomePage';
import ProtectLayout from './components/layouts/protect.layout';
import AdminProtectLayout from './components/layouts/admin-protect.layout';
import CreateHotelPage from './Pages/admin/create-hotel.page';

import PaymentPage from './Pages/booking/payment.page.jsx';
import CompletePage from './Pages/booking/complete.page.jsx';
import AccountDashboardPage from './Pages/AccountDashboard.page.jsx';
import AdminDashboardPage from './Pages/admin/admin-dashboard.page.jsx';
import AdminHotelsListPage from './Pages/admin/hotels-list.page.jsx';
import AdminEditHotelPage from './Pages/admin/edit-hotel.page.jsx';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage/>} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/hotels" element={<HotelsPage />} />

              <Route element={<ProtectLayout />}>
                {/* ✅ Hotel Details */}
                <Route path="/hotels/:_id" element={<HotelDetailsPage />} />

                {/* --- TASK 2: ACCOUNT DASHBOARD ROUTE --- */}
                <Route path="/account" element={<AccountDashboardPage />} />
                {/* --------------------------------------- */}

                {/* ✅ NEW BOOKING ROUTES */}
                <Route path="/booking/payment" element={<PaymentPage />} />
                <Route path="/booking/complete" element={<CompletePage />} />

                {/* ✅ Admin Routes */}
                <Route element={<AdminProtectLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} /> 
                <Route
                      path="/admin/create-hotel"
                      element={<CreateHotelPage />}
                             />
                </Route>
                <Route path="/admin/hotels" element={<AdminHotelsListPage />} />
              <Route path="/admin/edit-hotel/:id" element={<AdminEditHotelPage />} />
              

                
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
