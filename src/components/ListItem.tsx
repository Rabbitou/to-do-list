import { useRef, useState, memo } from "react";
import { ItemData } from "../../types/ListItem";

export default memo(function ListItem({
  data,
  editTask,
  deleteTask,
  completeTask,
}: {
  data: ItemData;
  editTask: (id: string, newTask: string) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}) {
  const [count, setCount] = useState(0);
  const inputTask = useRef<HTMLInputElement>(null);

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
      editTask(data.id, inputTask.current.value);
      inputTask.current.readOnly = true;
    }
  };

  return (
    <div className="flex gap-2 h-8">
      <input
        type="checkbox"
        className={``}
        name=""
        id=""
        onChange={() => completeTask(data.id)}
        defaultChecked={data.completed}
      />
      <input
        ref={inputTask}
        type="text"
        className={`outline-none rounded-sm pl-2 ${
          data.completed ? "line-through" : ""
        }`}
        defaultValue={data.task}
        onClick={() => {
          setCount(count + 1);
        }}
        // onBlur={leaveFocus}
        onKeyDown={(e) => handleKeyDown(e)}
        readOnly
      />
      <p className={`${count === 0 ? "invisible" : ""}`}>{count}</p>
      <div
        className="flex justify-center items-center p-1 hover:bg-orange-400 rounded-sm transition-all"
        onClick={changeFocus}
      >
        <img src="/editIcon.png" alt="" className="w-5 h-5" />
      </div>
      <div
        className="flex justify-center items-center p-1 hover:bg-red-500 rounded-sm transition-all"
        onClick={() => deleteTask(data.id)}
      >
        <img src="/deleteIcon.png" alt="" className="w-5 h-5" />
      </div>
    </div>
  );
});
