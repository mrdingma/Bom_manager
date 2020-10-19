import React, { useEffect, useState } from "react";
import "./BomApp.css";
import ResultList from "../list/ResultList";
import Modal from "../Modal/Modal";
import axios from "axios";
import Data from "../../utility/data.helper";

const BomApp = (props) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const bom_id = 1001;
    const url = `https://www.mobiusmaterials.com/api/v1/bom/${bom_id}/`;

    let res = await axios({
      url,
      method: "get",
    });

    setData(res.data);
  };

  const putData = async (bom_id, pk, load) => {
    const url = `https://www.mobiusmaterials.com/api/v1/bom/${bom_id}/bomitem/${pk}`;

    debugger;
    await axios({
      url,
      method: "put",
      params: {
        ...load,
      },
    });

    fetchData();
  };

  useEffect(() => {
    async function fetchData() {
      await Data.fetchData();
      setData(Data.getObjects());
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <div className="App-header">
        <h1>BOM Manager</h1>
      </div>
      <div>
        <ResultList data={data} setSelectedItem={setSelectedItem} />
      </div>
      {selectedItem ? (
        <div>
          <Modal
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            putData={putData}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BomApp;
