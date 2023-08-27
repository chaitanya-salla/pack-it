import { useEffect, useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
  const [itemsList, setItemsList] = useState([]);

  // To Relaod Items from local storage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage?.getItem("itemsList"));
    setItemsList(storedItems ?? []);
  }, []);

  //  Handler Function
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

  const deleteAllItemshandler = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );

    if (!confirmed) return;
    setItemsList([]);
    localStorage.removeItem("itemsList");
    console.log(itemsList);
  };

  const packItemHandler = (id) => {
    const packedItems = [...itemsList].map((item) => {
      if (item.id === id) item.packed = item.packed === true ? false : true;
      return item;
    });
    setItemsList(packedItems);
    localStorage.setItem("itemsList", JSON.stringify(packedItems));
  };

  // App Render
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItemHandler} />
      <PackingList
        itemsList={itemsList}
        onDeleteItem={deleteItemHandler}
        onPackedItem={packItemHandler}
        onDeleteAll={deleteAllItemshandler}
      />
      <Stats itemsList={itemsList} />
    </div>
  );
}

// Form

export default App;
