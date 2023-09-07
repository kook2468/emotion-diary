import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const viewOptionList = [
  { value: "list", name: "목록보기" },
  { value: "calendar", name: "캘린더보기" },
];

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  useEffect(() => {
    console.log("controlMenu rendering!!");
  });
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  console.log("diaryList", diaryList);
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("list");
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const copyList = [...diaryList];
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={viewType}
            onChange={setViewType}
            optionList={viewOptionList}
          />
          {viewType === "list" && (
            <ControlMenu
              value={sortType}
              onChange={setSortType}
              optionList={sortOptionList}
            />
          )}
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={(e) => navigate("/new")}
          />
        </div>
      </div>

      {viewType === "list" &&
        getProcessedDiaryList().map((it) => <DiaryItem key={it.id} {...it} />)}

      {viewType === "calendar" && (
        <Calendar diaryList={getProcessedDiaryList()} />
      )}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
