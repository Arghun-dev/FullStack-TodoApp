import { useEffect, useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/todos").then(setTodos).catch(console.log);
  }, []);

  return <div>todos component</div>;
};

export default Todos;
