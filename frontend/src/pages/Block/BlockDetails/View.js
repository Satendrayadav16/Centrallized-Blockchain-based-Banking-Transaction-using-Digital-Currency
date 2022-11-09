import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";
import { url } from "../../../config";

const View = () => {
  const [block, setBlock] = useState({
    blockHeight: "",
    hash: "",
    parent_hash: "",
    merkle_root: "",
    timestamp: "",
    nonce: "",
    size: "",
    blockData: "",
  });

  const { blockHeight } = useParams();
  const data = { height: parseInt(blockHeight) };

  useEffect(() => {
    getSingleBlock(data);
  }, []);

  const getSingleBlock = async (data) => {
    const response = await axios.post(`${url}/getBlockByHeight`, data);
    if (response.status === 200) {
      setBlock({ ...response.data[0] });
    }
  };
  return (
    <div className="card-blockdetails">
      <div className="card-header-blockdetails" style={{ textAlign: "Center" }}>
        <h2>Block Details</h2>
      </div>
      <div className="container-blockdetails">
        <strong>blockHeight: </strong>
        <span>{block && block.blockHeight}</span>
        <br />
        <br />
        <strong>block hash: </strong>
        <span>{block && block.hash}</span>
        <br />
        <br />
        <strong>parent hash: </strong>
        <span>{block && block.parent_hash.substring(0, 25)}...</span>
        <br />
        <br />
        <strong>merkle root: </strong>
        <span>{block && block.merkle_root}</span>
        <br />
        <br />
        <strong>timestamp: </strong>
        <span>{block && block.timestamp}</span>
        <br />
        <br />
        {/* <strong>nonce: </strong>
        <span>{block && block.nonce}</span>
        <br />
        <br /> */}
        <strong>size: </strong>
        <span>{block && block.size}</span>
        <br />
        <br />
        <strong>blockData: </strong>
        <span>{block && block.blockData}</span>
        <br />
        <br />
      </div>
    </div>
  );
};

export default View;
