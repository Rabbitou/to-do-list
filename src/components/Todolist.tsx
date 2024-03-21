import React, { useState } from "react";
import { ItemData } from "../../types/ListItem";
import ListItem from "./ListItem";
import VirtualizedList from "./Virtualized/VirtualizedList";

export default function Todolist() {
  const ITEM_HEIGHT = 40;
  const NUM_VISIBLE_ITEMS = 10;
  const [inputValue, setInputValue] = useState("");
  const [task, setTasks] = useState<ItemData[]>([]);

  const addNewTask = () => {
    const newTask: ItemData = {
      id: crypto.randomUUID(),
      task: inputValue,
      completed: false,
      count: 0,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) addNewTask();
  };

  const renderItem = (item: ItemData) => {
    return <ListItem key={item.id} data={item} setTask={setTasks} />;
  };

  return (
    <div className="flex flex-col gap-4 bg-white/5 rounded-md min-w-[360px] p-5 mt-5">
      <form onSubmit={handleOnSubmit} className="flex">
        <input
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
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
        numVisibleItems={NUM_VISIBLE_ITEMS}
        itemHeight={ITEM_HEIGHT}
        listData={task}
        renderItem={renderItem}
      />
    </div>
  );
}
