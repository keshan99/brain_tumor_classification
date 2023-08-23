import React from "react";

export const Headline = ({ text }: { text: string }) => {
  return (
    <>
      <div className="headline">
        <h1>{text}</h1>
      </div>
    </>
  );
};
