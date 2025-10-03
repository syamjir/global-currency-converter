import React from "react";
import { Link } from "react-router-dom";

// 404 Not Found Page
function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-0">
      <div className="flex flex-col gap-6 max-w-md text-center">
        <h2 className="font-extrabold text-9xl text-text">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl md:text-3xl text-text-light">
          Sorry, we couldn't find this page.
        </p>
        <Link
          to="/"
          className="px-8 py-4 text-xl font-semibold rounded bg-primary text-dark hover:bg-brand transition-all duration-300 ease-in-out cursor-pointer"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
