import React, { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = (props) => {
  const wrapperRef = useRef(null);
  const { selectedItem, setSelectedItem, putData } = props;
  const { model, pk, fields } = selectedItem;

  const handleClickOutside = (e) => {
    if (wrapperRef.current && wrapperRef.current === e.target) {
      setSelectedItem(false);
    }
  };

  const handleEditBom = (e) => {
    e.preventDefault();

    let hasChangedFlag = false;
    const load = {};

    const fields = document.querySelectorAll("input");

    fields.forEach((input) => {
      const value = input.value;

      if (value.length > 0) {
        hasChangedFlag = true;
        load[input.name] = value;
      }
    });

    const select = document.querySelector("select");

    if (selectedItem.fields.is_active !== Boolean(select.value)) {
      hasChangedFlag = true;
      load.is_active = select.value;
    }

    if (hasChangedFlag) {
      putData(selectedItem.fields.bom, selectedItem.pk, load);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  return (
    <>
      <div className="modal__screen" ref={wrapperRef}></div>
      <div className="modal__wrapper">
        <div className="modal__content">
          <form onSubmit={handleEditBom}>
            <label>Model:</label>
            <input type="text" name="model" placeholder={model} />

            <label>pk:</label>
            <input type="text" name="pk" placeholder={pk} />

            <label>uuid:</label>
            <input type="text" name="uuid" placeholder={fields.uuid} />

            <label>is_active:</label>
            <select name="is_active">
              <option value={String(fields.is_active)} defaultValue>
                {String(fields.is_active)}
              </option>
              <option
                value={String(fields.is_active) === "true" ? "false" : "true"}
              >
                {String(fields.is_active) === "true" ? "false" : "true"}
              </option>
            </select>

            <label>bom:</label>
            <input type="text" name="bom" placeholder={fields.bom} />

            <label>quantity:</label>
            <input
              type="number"
              name="quantity"
              placeholder={fields.quantity}
            />

            <label>specific part:</label>
            <input
              type="number"
              name="specific_part"
              placeholder={fields.specific_part}
            />

            <label>item unit cost:</label>
            <input
              type="number"
              name="item_unit_cost"
              placeholder={fields.item_unit_cost}
            />

            <button className="modal__button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Modal;
