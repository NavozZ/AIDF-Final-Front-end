import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { useAuth } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const { getToken } = useAuth();
  
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  
  const fetchClientSecret = useCallback(async () => {
    if (!bookingId) {
      throw new Error("Missing booking ID in URL.");
    }
    
    const token = await getToken(); 

    try {
      
      const res = await fetch(
        `${BACKEND_URL}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create checkout session.');
      }

      const data = await res.json();
      
      return data.clientSecret;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error; 
    }
  }, [bookingId, getToken, BACKEND_URL]);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  if (!bookingId) {
    return (
      <Card className="max-w-lg mx-auto mt-10">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Booking ID not found in URL. Please start the booking process again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto p-0">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Secure Payment</CardTitle>
      </CardHeader>
      <CardContent className='pt-0'>
        
        <div id="checkout">
          <EmbeddedCheckoutProvider 
            stripe={stripePromise} 
            options={options}
            key={bookingId} 
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </CardContent>
    </Card>
  );
}

export default CheckoutForm;