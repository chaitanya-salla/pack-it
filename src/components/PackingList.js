import { useState } from "react";
import Item from "./Item";

const PackingList = ({
  itemsList,
  onDeleteItem,
  onPackedItem,
  onDeleteAll,
}) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = itemsList;
  if (sortBy === "description")
    sortedItems = itemsList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = itemsList
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onPackedItem={onPackedItem}
            />
          );
        })}
      </ul>
      {sortedItems.length > 0 && (
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by Packed</option>
          </select>
          <button onClick={onDeleteAll}>Clear All Items</button>
        </div>
      )}
    </div>
  );
};

export default PackingList;
