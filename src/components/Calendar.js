import React, { useContext, useRef } from "react";
import { CurDateStateContext } from "../pages/Home";
import CalendarItem from "./CalendarItem";
import { covertTo2DArray } from "../util/array";

const Calendar = ({ diaryList }) => {
  console.log("diaryList: ", diaryList);
  const curDate = useContext(CurDateStateContext);
  const dataId = useRef(1);

  const rowNum = 6;
  const colNum = 7; //캘린더 행, 열
  const fullNum = rowNum * colNum;

  const firstDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
  const lastDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);

  const firstDay = firstDate.getDay();
  const lastDay = lastDate.getDay();

  const calendarDataList = [];

  const pushCalendarDataList = (date, isActive) => {
    calendarDataList.push({
      id: dataId.current++,
      date: date,
      isActive: isActive,
      diaryList: [],
    });
  };

  if (firstDay > 0) {
    //해당 월 1일의 요일
    const prevLastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      0
    ).getDate();

    for (let i = 1; i <= firstDay; i++) {
      const tmpDate = prevLastDay - (firstDay - i);
      pushCalendarDataList(tmpDate, false);
    }
  }

  for (let i = 1; i <= lastDate.getDate(); i++) {
    pushCalendarDataList(i, true);
  }

  const nextDay = fullNum - calendarDataList.length;
  for (let i = 1; i <= nextDay; i++) {
    pushCalendarDataList(i, false);
  }

  diaryList.map((it) => {
    console.log(it.date);
    calendarDataList
      .find(
        (data) => parseInt(new Date(it.date).getDate()) === parseInt(data.date)
      )
      .diaryList.push(it);
  });

  console.log(calendarDataList);

  return (
    <table className="Calendar">
      <thead>
        <tr>
          <td>일</td>
          <td>월</td>
          <td>화</td>
          <td>수</td>
          <td>목</td>
          <td>금</td>
          <td>토</td>
        </tr>
      </thead>
      <tbody>
        {covertTo2DArray(calendarDataList, colNum).map((dataList, idx) => (
          <tr key={idx}>
            {dataList.map((it) => (
              <CalendarItem key={it.id} {...it} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Calendar);
