import React from "react";
import "./ResultList.css";

const ResultList = (props) => {
  const models = [];

  for (let [key] of props.data) {
    models.push(key);
  }

  return (
    <>
      <div className="list-container">
        <table>
          <tr>
            <th>Model</th>
            <th>pk</th>
            <th>uuid</th>
            <th>created_at</th>
            <th>updated_at</th>
            <th>is_active</th>
            <th>bom</th>
            <th>quantity</th>
            <th>specific_part</th>
            <th>item_unit_cost</th>
            <th></th>
          </tr>
          {models.map((model) =>
            props.data.get(model).map((data, idx) => (
              <>
                <tr>
                  {idx === 0 ? (
                    <td rowspan={props.data.get(model).length}>{model}</td>
                  ) : null}
                  <td>{data.pk}</td>
                  <td>{data.fields.uuid}</td>
                  <td>{new Date(data.fields.created_at).toLocaleString()}</td>
                  <td>{new Date(data.fields.updated_at).toLocaleString()}</td>
                  <td>{String(data.fields.is_active)}</td>
                  <td>{data.fields.bom}</td>
                  <td>{data.fields.quantity}</td>
                  <td>{data.fields.specific_part}</td>
                  <td>{data.fields.item_unit_cost}</td>
                  <td>
                    <button onClick={() => props.setSelectedItem(data)}>
                      edit
                    </button>
                  </td>
                </tr>
              </>
            ))
          )}
        </table>
      </div>
    </>
  );
};

export default ResultList;
