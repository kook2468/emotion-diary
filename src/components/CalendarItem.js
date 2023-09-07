import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarItemChip from "./CalendarItemChip";

const CalendarItem = ({ id, date, isActive, diaryList }) => {
  const itemClassName = "CalendarItem_" + (isActive ? "on" : "off");
  const navigate = useNavigate();

  return (
    <td className={["CalendarItem", itemClassName].join(" ")}>
      <span className="item-date">{date}</span>
      {isActive &&
        diaryList.map((it, idx) => (
          <CalendarItemChip
            key={idx}
            content={it.content.slice(0, 4)}
            emotion={it.emotion}
            onClick={() => navigate(`/diary/${it.id}`)}
          />
        ))}
    </td>
  );
};

export default React.memo(CalendarItem);
