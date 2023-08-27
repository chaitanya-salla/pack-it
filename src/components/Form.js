import { useState } from "react";

const Form = ({ onAddItems }) => {
  const [description, setDecription] = useState("");
  const [quantity, setQuantity] = useState(5);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
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

export default Form;
