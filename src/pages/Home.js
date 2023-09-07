import React, { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

export const CurDateStateContext = React.createContext();

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감성 일기장`;
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => it.date >= firstDay && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]); //curDate가 변하는 순간에만 List 추출할거임

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <CurDateStateContext.Provider value={curDate}>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={() => decreaseMonth()} />}
        rightChild={<MyButton text={">"} onClick={() => increaseMonth()} />}
      />
      <DiaryList diaryList={data} />
    </CurDateStateContext.Provider>
  );
};

export default Home;
