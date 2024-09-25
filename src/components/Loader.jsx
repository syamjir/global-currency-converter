import React from "react";

function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-sm">
      <div class="dots"></div>
    </div>
  );
}

export default Loader;
