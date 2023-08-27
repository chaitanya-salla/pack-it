import { useEffect, useState } from "react";

function App() {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage?.getItem("itemsList"));
    setItemsList(storedItems ?? []);
  }, []);

  const addItemHandler = (item) => {
    const addedItems = [...itemsList, item];
    setItemsList(addedItems);
    localStorage.setItem("itemsList", JSON.stringify(addedItems));
  };

  const deleteItemHandler = (id) => {
    const deletedItems = [...itemsList].filter((item) => item.id !== id);
    setItemsList(deletedItems);
    localStorage.setItem("itemsList", JSON.stringify(deletedItems));
  };

  const packItemHandler = (id) => {
    const packedItems = [...itemsList].map((item) => {
      if (item.id === id) item.packed = item.packed === true ? false : true;
      return item;
    });
    setItemsList(packedItems);
    localStorage.setItem("itemsList", JSON.stringify(packedItems));
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItemHandler} />
      <PackingList
        itemsList={itemsList}
        onDeleteItem={deleteItemHandler}
        onPackedItem={packItemHandler}
      />
      <Stats itemsList={itemsList} />
    </div>
  );
}

const Logo = () => {
  return <h1>Pack It</h1>;
};

// Form
const Form = ({ onAddItems }) => {
  const [description, setDecription] = useState("");
  const [quantity, setQuantity] = useState(5);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItems(newItem);
    setDecription("");
    setQuantity(5);
  };

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What items are necessary for your journey?</h3>
      <div>
        <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item.."
          value={description}
          onChange={(e) => setDecription(e.target.value)}
        />
        <button onClick={submitHandler}>Add</button>
      </div>
    </form>
  );
};
const PackingList = ({ itemsList, onDeleteItem, onPackedItem }) => {
  return (
    <div className="list">
      <ul>
        {itemsList.map((item) => {
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
    </div>
  );
};

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

const Stats = ({ itemsList }) => {
  const packed = itemsList.filter((item) => item.packed === true);
  return (
    <footer className="stats">
      <p>
        You have {itemsList.length} items on your list, and you{" "}
        {packed.length > 0 ? (
          <span>
            already packed
            {""} {packed.length} {packed.length > 1 ? "items" : "item"} {"  "}(
            {Math.round((packed.length / itemsList.length) * 100) || 0}) %
          </span>
        ) : (
          <span>haven't packed anything !</span>
        )}
      </p>
    </footer>
  );
};

export default App;
