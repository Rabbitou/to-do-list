import React, { useState } from "react";
import { ItemData } from "../../../types/ListItem";

interface VirtualizedListInterface {
  numVisibleItems: number;
  itemHeight: number;
  listData: ItemData[];
  renderItem: any;
}

export default function VirtualizedList({
  numVisibleItems,
  itemHeight,
  listData,
  renderItem,
}: VirtualizedListInterface) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const startIndex = Math.floor(scrollPosition / itemHeight);
  const endIndex = startIndex + numVisibleItems + 1;
  const handleOnScroll = (event: any) => {
    setScrollPosition(event.target.scrollTop);
  };

  return (
    <div
      style={{
        height: numVisibleItems * itemHeight,
        overflow: "auto",
        position: "relative",
      }}
      onScroll={handleOnScroll}
    >
      <div
        style={{
          height: listData.length * itemHeight,
          position: "relative",
        }}
      >
        {listData.slice(startIndex, endIndex).map((item, index) => {
          const itemIndex = startIndex + index;
          const translateY = itemIndex * itemHeight;

          return (
            <div
              key={itemIndex}
              style={{
                position: "absolute",
                height: itemHeight,
                width: "100%",
                transform: `translateY(${translateY}px)`,
              }}
            >
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
