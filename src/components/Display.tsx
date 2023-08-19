interface DisplayProps {
  displayList: { key: string; content: string }[];
}

function Display({ displayList }: DisplayProps) {
  return (
    <ul>
      {displayList?.map((element) => (
        <li key={element.key}>{element.content}</li>
      ))}
    </ul>
  );
}

export default Display;
