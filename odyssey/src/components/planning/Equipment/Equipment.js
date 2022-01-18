import "../../component-styles/Equipment.scss";
import EquipmentCategories from "./EquipmentCategories";
import EquipmentItems from "./EquipmentItems";

const Equipment = (props) => {
  console.log("EQUIPMENTARRAY", props.equipmentArray);
  if (props.equipmentArray) {
    const equipmentCards = props.equipmentArray.map((category, i) => {
      console.log("CATEGORYID", category.categoryID);
      return (
        <EquipmentCategories
          key={i}
          category={category}
          categoryItems={category.items}
          setEquipmentArray={props.setEquipmentArray}
          trip_id={props.trip_id}
        />
      );
    });
    return (
      <main className="equipment">
        {equipmentCards}
        <button className="add-equipment-card">
          <i className="fa fa-plus" style={{ fontSize: "5em" }} />
        </button>
      </main>
    );
  } else {
    return (
      <main className="equipment">
        <button className="add-equipment-card">
          <i className="fa fa-plus" style={{ fontSize: "5em" }} />
        </button>
      </main>
    );
  }
};

export default Equipment;
