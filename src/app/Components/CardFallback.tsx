import React from "react";

export default function CardFallback() {
  return (
    <div className="max-w-xl mx-auto animate-pulse transition-all">
      <div className="">
        <h1>Loading</h1>
      </div>
    </div>
  );
}
