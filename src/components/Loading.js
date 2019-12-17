import React from "react";
import loading from "../assets/loading.svg";

const Loading = ({ absolute = false }) => (
  <div className={`spinner ${absolute ? 'absolute' : ''}`}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
