
import React from 'react';
import { useAuth, useUser, UserProfile } from '@clerk/clerk-react';
import { useGetUserBookingsQuery } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, User, Settings, CalendarDays, CreditCard } from 'lucide-react';
import BookingCard from '@/components/BookingCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const AccountDashboardPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { userId } = useAuth();

    const {
        data: bookings,
        isLoading: isBookingsLoading,
        isError: isBookingsError
    } = useGetUserBookingsQuery(userId, { skip: !userId });

    if (!isLoaded || !isSignedIn || isBookingsLoading) {
        return (
            <main className="container mx-auto py-10 px-4 space-y-6">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-12 w-72" />
                <Skeleton className="h-96 w-full" />
            </main>
        );
    }

    if (isBookingsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold text-destructive">Error loading data.</h2>
            </div>
        );
    }

    const paidBookings    = bookings.filter(b => b.paymentStatus === 'PAID');
    const pendingBookings = bookings.filter(b => b.paymentStatus === 'PENDING');

    return (
        <main className="container mx-auto py-10 px-4 space-y-8">

            {/* ── User greeting banner ── */}
            <div className="rounded-2xl bg-card border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                    src={user.imageUrl}
                    alt={user.fullName}
                    className="w-16 h-16 rounded-full border-2 border-primary"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">
                        Welcome back, {user.firstName || user.fullName}!
                    </h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        {user.emailAddresses[0].emailAddress}
                    </p>
                </div>
                {/* Quick stats */}
                <div className="flex gap-4 sm:gap-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{paidBookings.length}</p>
                        <p className="text-xs text-muted-foreground">Stays</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-400">{pendingBookings.length}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                </div>
            </div>

            {/* ── Tabs ── */}
            <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="grid w-full md:w-fit grid-cols-2">
                    <TabsTrigger value="bookings" className="flex items-center gap-2">
                        <ListChecks className="w-4 h-4" />
                        Booking History
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile & Settings
                    </TabsTrigger>
                </TabsList>

                {/* ── Booking history tab ── */}
                <TabsContent value="bookings" className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-primary" />
                            Your Reservations
                            <Badge variant="secondary" className="ml-1">{bookings.length}</Badge>
                        </h2>
                    </div>

                    {bookings.length === 0 ? (
                        <Card className="p-10 text-center border-dashed border-2">
                            <CalendarDays className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                            <p className="text-xl font-medium">No bookings yet</p>
                            <p className="text-muted-foreground text-sm mt-1">
                                Start exploring our hotels to find your perfect stay.
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <BookingCard key={booking._id} booking={booking} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* ── Profile tab ── */}
                <TabsContent value="profile" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-3">
                            <Settings className="w-5 h-5 text-primary" />
                            <CardTitle>Account & Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UserProfile
                                path="/account"
                                routing="path"
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none border-none bg-transparent",
                                        navbar: "hidden",
                                        scrollBox: "max-h-full overflow-y-auto",
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default AccountDashboardPage;