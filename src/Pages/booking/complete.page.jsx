
import React from 'react';
import { useSearchParams, Link } from 'react-router';
import { useGetCheckoutSessionStatusQuery } from '@/lib/api';
import { CheckCircle, XCircle, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CompletePage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  
  const { data, isLoading, isError } = useGetCheckoutSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  const StatusCard = ({ icon: Icon, title, message, colorClass, children }) => (
    <Card className={`max-w-xl mx-auto mt-10 shadow-lg border-2 border-${colorClass}`}>
      <CardHeader className="flex flex-col items-center">
        <Icon className={`w-16 h-16 text-${colorClass} mb-4`} />
        <CardTitle className="text-3xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center pt-0 space-y-4">
        <p className="text-muted-foreground">{message}</p>
        {children}
      </CardContent>
    </Card>
  );

  if (!sessionId) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <StatusCard 
                icon={XCircle}
                title="Payment Error"
                message="The payment session could not be found."
                colorClass="destructive"
            >
                <Button asChild><Link to="/">Return Home</Link></Button>
            </StatusCard>
        </div>
    );
  }

  if (isLoading) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <StatusCard 
                icon={Loader2}
                title="Confirming Payment..."
                message="Do not close this page. We are verifying the transaction with our payment provider."
                colorClass="primary animate-spin"
            >
                <Skeleton className="h-8 w-2/3 mx-auto" />
            </StatusCard>
        </div>
    );
  }
  
 
  if (data?.paymentStatus === 'PAID') {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <StatusCard 
                icon={CheckCircle}
                title="Booking Confirmed!"
                message={`Your room reservation at ${data.hotel.name} is complete. A confirmation email has been sent to ${data.customer_email}.`}
                colorClass="green-500"
            >
                <p className="text-lg font-bold">Booking ID: {data.booking._id}</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/my-account">View My Account</Link>
                </Button>
            </StatusCard>
        </div>
    );
  }

 
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
        <StatusCard 
            icon={XCircle}
            title={data?.paymentStatus === 'PENDING' ? "Payment Pending" : "Payment Failed"}
            message={isError ? "Could not retrieve final status. Check My Account page later." : "There was an issue processing your payment. Please try again."}
            colorClass="destructive"
        >
            <Button asChild variant="outline">
                <Link to={`/booking/payment?bookingId=${data.booking._id}`}>Retry Payment</Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm">
                <Link to="/"><Home className="w-4 h-4 mr-2"/>Return Home</Link>
            </Button>
        </StatusCard>
    </div>
  );
};

export default CompletePage;