import { useState } from "react";
import { ItemData } from "../../types/ListItem";

export const useTask = () => {
  const [tasks, setTasks] = useState<ItemData[]>([]);

  const increaseCount = (id: string) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const addNewTask = (inputValue: string) => {
    const newTask: ItemData = {
      id: crypto.randomUUID(),
      task: inputValue,
      completed: false,
      count: 0,
    };
    setTasks((prev) => [...prev, newTask]);
    // setInputValue("");
  };

  const editTask = (data: ItemData) => {
    console.log(data);

    setTasks((prev) => prev.map((item) => (item.id === data.id ? data : item)));
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };
  return {
    addNewTask,
    editTask,
    completeTask,
    deleteTask,
    tasks,
    increaseCount,
  };
};
