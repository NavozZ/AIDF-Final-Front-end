// src/Pages/admin/admin-dashboard.page.jsx

import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListChecks, Clock, Users, Hotel } from 'lucide-react';
import { useGetBookingCountQuery, useGetUserCountQuery } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboardPage = () => {
    const { data: bookingData, isLoading: isBookingsLoading } = useGetBookingCountQuery(undefined, {
        pollingInterval: 60000
    });
    const { data: userData, isLoading: isUsersLoading } = useGetUserCountQuery(undefined, {
        pollingInterval: 3600000
    });

    const totalBookings = bookingData?.count ?? 0;
    const totalUsers = userData?.count ?? 0;
    const isLoading = isBookingsLoading || isUsersLoading;

    if (isLoading) {
        return (
            <main className="container mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold mb-4">Admin Control Panel</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card><CardContent className="p-6"><Skeleton className="h-32 w-full rounded" /></CardContent></Card>
                    <Card><CardContent className="p-6"><Skeleton className="h-32 w-full rounded" /></CardContent></Card>
                    <Card><CardContent className="p-6"><Skeleton className="h-32 w-full rounded" /></CardContent></Card>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-4">Admin Control Panel</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Welcome, Administrator. Manage hotels, bookings, and users here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Hotel Management */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-medium">Hotel Management</CardTitle>
                        <Hotel className="h-6 w-6 text-blue-500" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <CardDescription>
                            Create, view, and edit hotel listings and pricing information.
                        </CardDescription>

                        <Button asChild className="w-full" variant="secondary">
                            <Link to="/admin/hotels">
                                <ListChecks className="mr-2 h-4 w-4" /> Manage All Listings
                            </Link>
                        </Button>

                        <Button asChild className="w-full">
                            <Link to="/admin/create-hotel">
                                <PlusCircle className="mr-2 h-4 w-4" /> Create New Hotel
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Booking Overview */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-medium">Booking Overview</CardTitle>
                        <Clock className="h-6 w-6 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-yellow-600 mb-2">{totalBookings}</div>
                        <p className="text-sm text-muted-foreground">Total Bookings (PENDING/PAID)</p>

                        <Button variant="link" asChild className="p-0 mt-4 text-yellow-600 dark:text-yellow-400">
                            <Link to="/admin/bookings">View All Bookings</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* User Management */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-medium">User Management</CardTitle>
                        <Users className="h-6 w-6 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-purple-600 mb-2">{totalUsers}</div>
                        <p className="text-sm text-muted-foreground">Total Registered Users</p>

                        <Button variant="link" asChild className="p-0 mt-4 text-purple-600 dark:text-purple-400">
                            <a href="https://dashboard.clerk.com/users" target="_blank" rel="noopener noreferrer">
                                Manage Users (External)
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default AdminDashboardPage;
