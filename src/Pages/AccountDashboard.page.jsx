// src/Pages/AccountDashboard.page.jsx

import React from 'react';
import { useAuth, useUser, UserProfile } from '@clerk/clerk-react';
import { useGetUserBookingsQuery } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, User, Settings } from 'lucide-react'; // Added Settings icon
import BookingCard from '@/components/BookingCard';
import { Badge } from '@/components/ui/badge';
// --- NEW IMPORTS ---
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; 
// -------------------

const AccountDashboardPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { userId } = useAuth();

    // Fetch booking history (Task 2.2)
    const { 
        data: bookings, 
        isLoading: isBookingsLoading, 
        isError: isBookingsError 
    } = useGetUserBookingsQuery(userId, { skip: !userId });

    // Loading State
    if (!isLoaded || !isSignedIn || isBookingsLoading) {
        return (
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold mb-6">My Account</h1>
                <div className="grid md:grid-cols-1 gap-8">
                    <Skeleton className="h-12 w-full mb-6" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </main>
        );
    }

    // Error State
    if (isBookingsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold text-destructive">Error loading data.</h2>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-6">My Account</h1>

            {/* --- TAB NAVIGATION (Task 2.1) --- */}
            <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="grid w-full md:w-fit grid-cols-2">
                    <TabsTrigger value="profile" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile & Settings</span>
                    </TabsTrigger>
                    <TabsTrigger value="bookings" className="flex items-center space-x-2">
                        <ListChecks className="w-4 h-4" />
                        <span>Booking History</span>
                    </TabsTrigger>
                </TabsList>

                {/* --- TAB 1: PROFILE DETAILS --- */}
                <TabsContent value="profile" className="mt-6">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader className="flex flex-row items-center space-x-3">
                            <Settings className="w-6 h-6 text-primary"/>
                            <CardTitle>Account and Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-sm font-semibold">Primary Email:</p>
                                <p className="text-lg">{user.emailAddresses[0].emailAddress}</p>
                            </div>
                            
                            {/* Clerk's UserProfile component for detailed settings */}
                            <UserProfile path="/my-account" routing="path" appearance={{
                                elements: {
                                    rootBox: "w-full border p-4 rounded-lg",
                                    card: "shadow-none border-none",
                                    navbar: "hidden",
                                    header: "text-2xl font-bold",
                                    // Remove scroll constraint as the CardContent will handle it if needed
                                    scrollBox: "max-h-full overflow-y-auto" 
                                }
                            }} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- TAB 2: BOOKING HISTORY --- */}
                <TabsContent value="bookings" className="mt-6">
                    <h2 className="text-3xl font-semibold flex items-center mb-4">
                        Your Reservations 
                        <Badge variant="secondary" className="ml-3 text-lg py-1">
                            {bookings.length}
                        </Badge>
                    </h2>

                    {/* Empty State (Task 2.2) */}
                    {bookings.length === 0 && (
                        <Card className="p-8 text-center border-dashed border-2">
                            <p className="text-xl font-medium">You haven't booked any hotels yet!</p>
                            <p className="text-muted-foreground">Start exploring our listings to find your perfect stay.</p>
                            {/* Add a button or link here to navigate to the hotel listing page */}
                        </Card>
                    )}

                    {/* Booking List */}
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            // Ensure the Hotel ID field is correctly populated by your backend for this to work
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default AccountDashboardPage;