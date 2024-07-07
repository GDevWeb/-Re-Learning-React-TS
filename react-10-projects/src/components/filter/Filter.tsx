import ButtonFilter from "./ButtonFilter";

export default function Filter({ handleFilter }) {
  return (
    <div id="filter" className="flex justify-around">
      <ButtonFilter
        handleFilter={handleFilter}
        backGroundColorButton="green"
        value="Complété"
      >
        Terminées
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        backGroundColorButton="yellow"
        value="Non complété"
      >
        Non complétées
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        backGroundColorButton="gray"
        value="Toutes"
      >
        Toutes
      </ButtonFilter>
    </div>
  );
}
