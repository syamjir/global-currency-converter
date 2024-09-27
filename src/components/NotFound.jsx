import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div class="flex h-screen flex-col items-center justify-center p-0">
      <div class="flex flex-col gap-6 max-w-md text-center">
        <h2 class="font-extrabold text-9xl text-text ">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl md:text-3xl text-text-light">
          Sorry, we couldn't find this page.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
