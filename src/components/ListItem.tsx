import React, { memo, useRef } from "react";
import { ItemData } from "../../types/ListItem";

export default memo(function ListItem({
  data,
  setTask,
}: {
  data: ItemData;
  setTask: React.Dispatch<React.SetStateAction<ItemData[]>>;
}) {
  const inputTask = useRef<HTMLInputElement>(null);

  const editTask = () => {
    setTask((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? { ...item, task: inputTask.current ? inputTask.current.value : "" }
          : item
      )
    );
  };

  const completeTask = () => {
    setTask((prev) =>
      prev.map((item) =>
        item.id === data.id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = () => {
    setTask((prev) => prev.filter((item) => item.id !== data.id));
  };

  const changeFocus = () => {
    if (inputTask.current) {
      inputTask.current.readOnly = false;
      inputTask.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      leaveFocus();
    }
  };

  const leaveFocus = () => {
    if (inputTask.current) {
      editTask();
      inputTask.current.readOnly = true;
    }
  };

  const handleOnClick = () => {
    setTask((prev) =>
      prev.map((item) =>
        item.id === data.id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  return (
    <div className="flex gap-2 h-8">
      <input
        type="checkbox"
        className={``}
        name=""
        id=""
        onChange={completeTask}
        defaultChecked={data.completed}
      />
      <input
        ref={inputTask}
        type="text"
        className={`outline-none rounded-sm pl-2 ${
          data.completed ? "line-through" : ""
        }`}
        defaultValue={data.task}
        onClick={handleOnClick}
        // onBlur={leaveFocus}
        onKeyDown={handleKeyDown}
        readOnly
      />
      <p className={`${data.count === 0 ? "invisible" : ""}`}>{data.count}</p>
      <div
        className="flex justify-center items-center p-1 hover:bg-orange-400 rounded-sm transition-all"
        onClick={changeFocus}
      >
        <img src="/editIcon.png" alt="" className="w-5 h-5" />
      </div>
      <div
        className="flex justify-center items-center p-1 hover:bg-red-500 rounded-sm transition-all"
        onClick={deleteTask}
      >
        <img src="/deleteIcon.png" alt="" className="w-5 h-5" />
      </div>
    </div>
  );
});
