import {
  updateEquipment,
  newCategory,
  getWeather,
} from "../../../Helpers/apiHelpers";
import "../../component-styles/Equipment.scss";
import { useEffect, useState } from "react";
import EquipmentCategories from "./EquipmentCategories";
import AddButton from "../AddButton";
import WeatherBox from "./WeatherBox";
// import { updateEquipment } from "../../../Helpers/apiHelpers";

const Equipment = (props) => {
  const equipmentCategories = [];
  const weatherArray = [];
  useEffect(() => {
    if (Math.abs(props.averageLat) > 0 || Math.abs(props.averageLng) > 0) {
      let startDate = new Date(props.startDate).toISOString().split("T")[0];
      let endDate = new Date(props.endDate).toISOString().split("T")[0];
      console.log("asdf");
      getWeather(props.averageLat, props.averageLng, startDate, endDate).then(
        (data) => {
          props.setWeatherState(data.data);
        }
      );
    }
  }, [props.averageLat, props.averageLng]);

  for (const weatherKey in props.weatherState) {
    weatherArray.push(
      <WeatherBox
        key={weatherKey}
        date={weatherKey}
        weather={props.weatherState[weatherKey].weather}
        temp={props.weatherState[weatherKey].temp}
        sunrise={props.weatherState[weatherKey].sunrise}
        sunset={props.weatherState[weatherKey].sunset}
      />
    );
  }

  for (const equipmentCategoryId in props.equipmentState) {
    equipmentCategories.push(
      <EquipmentCategories
        key={equipmentCategoryId}
        categoryName={props.equipmentState[equipmentCategoryId].category}
        categoryId={equipmentCategoryId}
        categoryItems={props.equipmentState[equipmentCategoryId].items}
        setEquipmentState={props.setEquipmentState}
        trip_id={props.equipmentState[equipmentCategoryId].tripID}
        setState={props.setEquipmentState}
        edit={props.edit}
      />
    );
  }

  return (
    <main className="all-equipment">
      <div className="weather">{weatherArray}</div>
      <div className="equipment">
        {equipmentCategories}
        {props.edit === "edit" && (
          <AddButton
            trip_id={props.trip_id}
            onSubmit={newCategory}
            setState={props.setEquipmentState}
            addButtonType={"equipment"}
          />
        )}
      </div>
    </main>
  );
};

export default Equipment;
