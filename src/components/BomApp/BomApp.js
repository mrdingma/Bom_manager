import React, { useEffect, useState } from "react";
import "./BomApp.css";
import Data from "../../utility/data.helper";
import ResultList from "../list/ResultList";
import Modal from "../Modal/Modal";

const BomApp = (props) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await Data.fetchData();
      setData(Data.getObjects());
    }
    fetchData();
  }, []);

  const postChanges = (bom_id, pk, load) => {
    Data.postData(bom_id, pk, load);
    setSelectedItem(false);
  };

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
            postChanges={postChanges}
          />
        </div>
      ) : null}
    </div>
  );
};

export default BomApp;
