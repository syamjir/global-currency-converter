import React from "react";

function Loader() {
  return (
    // Centered loader with backdrop blur effect
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-sm">
      <div className="dots"></div> {/* Loader animation element */}
    </div>
  );
}

export default Loader;
