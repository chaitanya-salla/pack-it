const Item = ({ item, onDeleteItem, onPackedItem }) => {
  return (
    <li>
      <span
        style={
          item.packed ? { textDecoration: "line-through #212529 5px" } : {}
        }
        onClick={() => onPackedItem(item.id)}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
};

export default Item;
