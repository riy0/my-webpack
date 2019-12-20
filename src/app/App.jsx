import React from "react";
import cat from "images/cat";
import dog from "images/dog";
import dogs from "images/dogs";

const hello = () => {
  return (
    <div className="container">
      <div className="image-wrapper">
        <img src={cat} alt="" className="image-wrapper__image" />
      </div>

      <div className="image-wrapper">
        <img src={dog} alt="" className="image-wrapper__image" />
      </div>

      <div className="image-wrapper">
        <img src={dogs} alt="" className="image-wrapper__image" />
      </div>
    </div>
  );
};

export default hello;
