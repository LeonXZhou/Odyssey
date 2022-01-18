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
      <AddButton trip_id={props.trip_id} onSubmit={newCategory} />
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
