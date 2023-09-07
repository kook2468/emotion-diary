const CalendarItemChip = ({ content, emotion, onClick }) => {
  return (
    <div
      className={[
        "CalendarItemChip",
        `CalendarItemChip_emotion_${emotion}`,
      ].join(" ")}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default CalendarItemChip;
