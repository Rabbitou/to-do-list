import ListItem from "./ListItem";
import { ItemData } from "../../types/ListItem";
import { useRef, useState } from "react";

export default function Todolist() {
  const addBtn = useRef<HTMLButtonElement>(null);
  const inputTask = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState<ItemData[]>([]);
  const [idCount, setIdCount] = useState(0);
  console.log(task);

  const addNewTask = () => {
    if (inputTask.current && inputTask.current.value) {
      const newTask: ItemData = {
        id: idCount,
        task: inputTask.current ? inputTask.current.value : "",
        completed: false,
      };
      setTask([...task, newTask]);
      setIdCount(idCount + 1);
      if (inputTask.current) inputTask.current.value = "";
    }
  };

  const editTask = (id: number, newTask: string) => {
    setTask(
      task.map((item) => {
        if (item.id === id) item.task = newTask;
        return item;
      })
    );
  };

  const completeTask = (id: number) => {
    setTask(
      task.map((item) => {
        if (item.id === id) item.completed = !item.completed;
        return item;
      })
    );
  };

  const deleteTask = (id: number) => {
    setTask(
      task.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTask();
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white/5 rounded-md p-5 mt-5">
      <div className="flex">
        <input
          ref={inputTask}
          placeholder="Enter your task..."
          type="text"
          className="outline-none rounded-tl-md rounded-bl-md p-1 pl-2"
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <button
          ref={addBtn}
          className="rounded-tl-none rounded-bl-none"
          onClick={addNewTask}
        >
          Add Task
        </button>
      </div>
      {task.map((data) => (
        <ListItem
          data={data}
          editTask={editTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
          key={data.id}
        />
      ))}
    </div>
  );
}
