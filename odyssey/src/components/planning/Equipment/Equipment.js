import { updateEquipment, newCategory } from "../../../Helpers/apiHelpers";
import "../../component-styles/Equipment.scss";
import EquipmentCategories from "./EquipmentCategories";
import EquipmentItems from "./EquipmentItems";
import AddButton from "../AddButton";
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
        setState={props.setEquipmentState}
        edit={props.edit}
      />
    );
  }

  return (
    <main className="equipment">
      {equipmentCategories}
      {props.edit === "edit" && (
        <AddButton
          trip_id={props.trip_id}
          onSubmit={newCategory}
          setState={props.setEquipmentState}
          addButtonType={"equipment"}
        />
      )}
    </main>
  );
};

export default Equipment;
