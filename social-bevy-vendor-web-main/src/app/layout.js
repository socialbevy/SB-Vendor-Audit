'use client'

import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ModalManager from "@/components/modals/ModalManager";
import Sidebar from "@/components/shared/Sidebar";
import { SnackbarProvider } from "@/components/notifications/Snackbar";
import Spinner from "@/components/shared/Spinner";
import StoreProvider from "./StoreProvider";
import { AuthLoader } from '@/lib/auth/authConfig';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

const queryClient = new QueryClient();

function MainContent({ children }) {
  return (
    <AuthLoader
      renderLoading={() => <Spinner />}
      renderUnauthenticated={() => (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    >
      <div className="flex">
        <Sidebar />
        <main className="flex-grow bg-white">
          {children}
        </main>
      </div>
    </AuthLoader>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          {/* For React Query Troubleshooting @?*/}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <SnackbarProvider>
            <StoreProvider>
              <MainContent>{children}</MainContent>
              <ModalManager />
            </StoreProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
