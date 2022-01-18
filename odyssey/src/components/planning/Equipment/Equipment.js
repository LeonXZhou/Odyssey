import { updateEquipment } from "../../../Helpers/apiHelpers";
import "../../component-styles/Equipment.scss";
import EquipmentCategories from "./EquipmentCategories";
import EquipmentItems from "./EquipmentItems";
// import { updateEquipment } from "../../../Helpers/apiHelpers";

const Equipment = (props) => {
  const equipmentCategories = [];

  for (const equipmentCategoryId in props.equipmentState) {
    equipmentCategories.push(
      <EquipmentCategories
        key={equipmentCategoryId}
        categoryName={props.equipmentState[equipmentCategoryId].category}
        categoryId={equipmentCategoryId}
        categoryItems={props.equipmentState[equipmentCategoryId].items}
        setEquipmentState={props.setEquipmentState}
        trip_id={props.equipmentState[equipmentCategoryId].tripID}
      />
    );
  }
  // const equipmentCards = props.equipmentArray.map((category, i) => {
  //   console.log("CATEGORYID", category.categoryID);
  //   return (
  //     <EquipmentCategories
  //       key={i}
  //       category={category}
  //       categoryItems={category.items}
  //       setEquipmentArray={props.setEquipmentArray}
  //       trip_id={props.trip_id}
  //     />
  //   );
  // });
  return (
    <main className="equipment">
      {equipmentCategories}
      <button
        className="add-equipment-card"
        onClick={(e) => {
          props.setEquipmentState((prev) => {
            const newKey = -Object.keys(prev).length;
            const newState = { ...prev };
            newState[newKey] = {
              category: "",
              items: {},
              tripID: props.trip_id,
            };
            return newState;
          });
        }}
      >
        <i className="fa fa-plus" style={{ fontSize: "5em" }} />
      </button>
      <button
        onClick={(e) => {
          updateEquipment(props.trip_id, props.equipmentState);
        }}
      >
        SAVE
      </button>
    </main>
  );
};

export default Equipment;
