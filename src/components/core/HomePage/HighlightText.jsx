import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className=" text-4xl text-cyan-400 font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;