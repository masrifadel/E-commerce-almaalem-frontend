"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    document.title = "Something went wrong - Al Maalem";
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We apologize for the inconvenience. An unexpected error occurred.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left text-sm text-gray-500 mb-4">
              <summary>Error details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full btn btn-primary"
          >
            Try again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full btn btn-outline"
          >
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
