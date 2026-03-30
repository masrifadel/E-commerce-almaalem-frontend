"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found - Al Maalem";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block btn btn-primary"
          >
            Go Back Home
          </Link>
          
          <div className="text-sm text-gray-500">
            Or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
