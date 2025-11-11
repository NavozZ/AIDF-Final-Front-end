// src/Pages/admin/admin-dashboard.page.jsx

import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListChecks, DollarSign, Users } from 'lucide-react';

const AdminDashboardPage = () => {
    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-4">Admin Control Panel</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Welcome, Administrator. Manage hotels, bookings, and users here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* 1. Hotel Management Card */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-medium">Hotel Management</CardTitle>
                        <ListChecks className="h-6 w-6 text-blue-500" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <CardDescription>
                            Create, view, and edit hotel listings and pricing information.
                        </CardDescription>
                        <Button asChild className="w-full">
                            <Link to="/admin/create-hotel">
                                <PlusCircle className="mr-2 h-4 w-4" /> Create New Hotel
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                            View All Listings (To be implemented)
                        </Button>
                    </CardContent>
                </Card>

                {/* 2. Booking Overview Card */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-medium">Booking Overview</CardTitle>
                        <DollarSign className="h-6 w-6 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-4">
                            Monitor current bookings, check payment status, and manage cancellations.
                        </CardDescription>
                        <div className="text-3xl font-bold mb-4">42</div>
                        <p className="text-sm text-muted-foreground">Total Paid Bookings this Month</p>
                    </CardContent>
                </Card>

                {/* 3. User & Analytics Card */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-medium">User Management</CardTitle>
                        <Users className="h-6 w-6 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-4">
                            View all registered users and manage their roles/metadata.
                        </CardDescription>
                        <div className="text-3xl font-bold mb-4">154</div>
                        <p className="text-sm text-muted-foreground">Total Registered Users</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default AdminDashboardPage;