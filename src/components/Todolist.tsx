import React, { useRef, useState } from "react";
import { ItemData } from "../../types/ListItem";
import ListItem from "./ListItem";
import { useInterSectionObserver } from "../../hehe";
import VirtualizedList from "./Virtualized/VirtualizedList";

export default function Todolist() {
  const itemHeight = 40;
  const numVisibleItems = 10;
  const TOTAL_ITEMS = 10000;
  const inputTask = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState<ItemData[]>([]);
  // const refLast = useRef<HTMLSpanElement | null>(null);

  const data = [...Array(TOTAL_ITEMS)].map((_, index) => ({
    id: crypto.randomUUID(),
    task: `Task ${index}`,
    completed: false,
  }));

  // useInterSectionObserver({
  //   target: refLast,
  //   onIntersect: () => console.log("nextPage"),
  //   threshold: 1,
  //   enabled: true,
  // });

  const addNewTask = () => {
    if (inputTask.current && inputTask.current.value) {
      const newTask: ItemData = {
        id: crypto.randomUUID(),
        task: inputTask.current ? inputTask.current.value : "",
        completed: false,
      };
      setTask([...task, newTask]);
      if (inputTask.current) inputTask.current.value = "";
    }
  };

  const editTask = (id: string, newTask: string) => {
    setTask((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: newTask } : item))
    );
  };

  const completeTask = (id: string) => {
    setTask((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id: string) => {
    setTask((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewTask();
  };

  const renderItem = (item: ItemData) => {
    return (
      <ListItem
        key={item.id}
        data={item}
        editTask={editTask}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white/5 rounded-md min-w-[360px] p-5 mt-5">
      <form onSubmit={handleOnSubmit} className="flex">
        <input
          ref={inputTask}
          placeholder="Enter your task..."
          type="text"
          className="outline-none rounded-tl-md rounded-bl-md p-1 pl-2"
        />
        <button
          className="rounded-tl-none rounded-bl-none bg-gray-800"
          type="submit"
        >
          Add Task
        </button>
      </form>
      <VirtualizedList
        numVisibleItems={numVisibleItems}
        itemHeight={itemHeight}
        listData={task}
        renderItem={renderItem}
      />
    </div>
  );
}
