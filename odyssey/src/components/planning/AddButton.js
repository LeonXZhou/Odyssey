import { useState } from "react";
import "../component-styles/Equipment.scss"
import { newCategory, getEquipmentForTrip } from "../../Helpers/apiHelpers";
import { formatTripEquipmentData } from "../../Helpers/dataHelpers";

const PLUS = "PLUS";
const FORM = "FORM";
const LOADING = "LOADING";
export default function AddButton(props) {
  const [buttonState, setButtonState] = useState("PLUS");
  const [inputState, setInputState] = useState("");
  return (
    <>
      {buttonState === PLUS && (
        <button
          onClick={() => {
            setButtonState(FORM);
          }}
          className="add-equipment-card"
        >
          <i className="fa fa-plus" style={{ fontSize: "5em" }} />
        </button>
      )}
      {buttonState === FORM && (
        <div className="add-equipment-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type={"text"}
              placeholder="Title"
              value={inputState}
              onChange={(e) => {
                setInputState(e.target.value);
              }}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                setButtonState(LOADING);
                setInputState("");
                props.onSubmit(props.trip_id, inputState).then(() => {
                  getEquipmentForTrip(props.trip_id).then((res) => { //props.getNewState
                    setButtonState(PLUS);
                    props.setState(formatTripEquipmentData(res.data)); //props.formatStateData
                  });
                });
              }}
            >
              Save
            </button>
          </form>
        </div>
      )}
      {buttonState === LOADING && (
        <div className="add-equipment-card">LOADING</div>
      )}
    </>
  );
}
