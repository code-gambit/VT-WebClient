import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
if (
  (typeof TextDecoder === "undefined" || typeof TextEncoder === "undefined") &&
  typeof require !== "undefined"
) {
  global.TextDecoder = require("util").TextDecoder;
  global.TextEncoder = require("util").TextEncoder;
}
const ipfs = require("ipfs-http-client");
const client = ipfs({ host: "ipfs.infura.io", port: 5001, protcol: "https" });

const Download = () => {
  const [download_url, setURL] = useState("initial");
  const { urlId } = useParams();

  async function getHash() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BACKENDURL}/${urlId}`, {
          headers: {
            "X-Api-Key": process.env.REACT_APP_APIKEY,
          },
        })
        .then(
          (response) => {
            resolve(response.data.body);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  async function downloadFile() {
    const hash = await getHash();
    const url = `https://ipfs.io/ipfs/${hash}`;
    const response = await axios({
      method: "get",
      url: url,
      responseType: "arraybuffer",
    });
    var blob = new Blob([response.data], {
      type: `${response.headers["content-type"]}`,
    });
    setURL(URL.createObjectURL(blob));
  }


  function RenderButtons(){
    if(download_url!=="initial") return(
      <>
      <button disabled> Generate </button>
      <a href={download_url}> Download </a>
      </>
    )
    else return(
      <button onClick={()=>{downloadFile()}}> Generate </button>
    )
  }

  return (
    <div>
      <RenderButtons />
    </div>
  )
};

export default Download;
