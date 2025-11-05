"use client";

import ProtectedRoute from "@/lib/auth/ProtectedRoute";

const CustomersPage = () => {
  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl">Customers</h1>
      </main>
    </ProtectedRoute>
  );
};

export default CustomersPage;