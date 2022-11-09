import React from "react";
import View from "../pages/Block/BlockDetails/View";
import Blocktransaction from "../pages/Block/BlockDetails/blocktransaction";
import { Link } from "react-router-dom";
import "./BlockDetail.css";

const BlockDetail = () => {
  return (
    <div className="Details-Container"  >
      <Blocktransaction />
      <View />
      <div> 
        <Link to="/">
          <button className="button">
            <h2>Back</h2>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlockDetail;
