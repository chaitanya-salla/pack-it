const Stats = ({ itemsList }) => {
  const packed = itemsList.filter((item) => item.packed);
  return (
    <footer className="stats">
      <p>
        You have {itemsList.length} items on your list, and you{" "}
        {packed.length > 0 ? (
          <span>
            already packed
            {""} {packed.length} {packed.length > 1 ? "items" : "item"} {"  "}(
            {Math.round((packed.length / itemsList.length) * 100) || 0}%)
          </span>
        ) : (
          <span>haven't packed anything !</span>
        )}
      </p>
    </footer>
  );
};

export default Stats;
