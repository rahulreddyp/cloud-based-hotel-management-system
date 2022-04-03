import React from "react";
import Header from "./Header";

const Page = ({ className = "p-3 mt-3", children }) => {
  return (
    <div>
      <Header />
      <div className="container-fluid mt-4">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
