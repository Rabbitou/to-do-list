import React, { useRef, useState, useEffect } from "react";

const VirtualizedList = ({ items, itemHeight }) => {
  const listRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  const calculateVisibleItems = () => {
    if (listRef.current) {
      const { scrollTop, clientHeight } = listRef.current;
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = Math.min(
        items.length - 1,
        Math.floor((scrollTop + clientHeight) / itemHeight)
      );

      setVisibleItems(items.slice(startIndex, endIndex + 1));
    }
  };

  useEffect(() => {
    calculateVisibleItems();

    const listElement = listRef.current;
    listElement.addEventListener("scroll", calculateVisibleItems);
    return () =>
      listElement.removeEventListener("scroll", calculateVisibleItems);
  }, [items, itemHeight]);

  return (
    <div
      ref={listRef}
      style={{
        overflowY: "auto",
        height: "400px",
        position: "relative",
      }}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={index}
            style={{
              height: `${itemHeight}px`,
              position: "absolute",
              top: `${(startIndex + index) * itemHeight}px`,
              width: "100%",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
