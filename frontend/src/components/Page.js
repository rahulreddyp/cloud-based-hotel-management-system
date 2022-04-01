import React from "react";
import Header from "./Header";

const Page = ({ className = "p-3 m-3", children }) => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
