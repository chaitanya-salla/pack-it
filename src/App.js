import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Laptop", quantity: 1, packed: true },
  { id: 5, description: "Clothes", quantity: 12, packed: false },
  { id: 6, description: "Inner Ware", quantity: 5, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return <h1>Pack It</h1>;
};

// Form
const Form = () => {
  const [description, setDecription] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [itemsList, setItemsList] = useState(initialItems);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDecription("");
    setQuantity(5);
    itemsList.push(newItem);
    setItemsList(itemsList);
  };

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip ?</h3>
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
    </form>
  );
};
const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <span
        style={
          item.packed ? { textDecoration: "line-through #212529 5px" } : {}
        }
      >
        {item.quantity} {item.description}
      </span>
      <button>&times;</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <p>You have 10 items on your list, and you already packed 4 (40%)</p>
    </footer>
  );
};

export default App;
