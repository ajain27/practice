function Results({ data }) {
  return (
    <div>
      {data.map((d) => (
        <ul>
          <li key={d.id}>{d.title}</li>
        </ul>
      ))}
    </div>
  );
}

export default Results;
