function List({ items }) {
  console.log(items);
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
