// src/Pages/booking/payment.page.jsx

import { Navigate, useSearchParams } from "react-router";
import CheckoutForm from "@/components/CheckoutForm"; 

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  
  // If no bookingId is present, the user navigated here incorrectly.
  if (!bookingId) {
    return <Navigate to="/hotels" />; 
  }

  return (
    <main className="px-4 py-12 min-h-[60vh] bg-background">
        <div className="max-w-4xl mx-auto">
            <CheckoutForm />
        </div>
    </main>
  );
};

export default PaymentPage;