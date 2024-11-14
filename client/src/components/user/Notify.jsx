import { useState } from "react";
import { dummyNotifications } from "../../data/config";

export default function Notify() {
  const [monthExpanded, setMonthExpanded] = useState(
    Object.keys(dummyNotifications).reduce((acc, month) => {
      acc[month] = true;
      return acc;
    }, {})
  );

  const toggleMonth = (month) => {
    setMonthExpanded((prevState) => {
      const newState = { ...prevState };
      newState[month] = !prevState[month];
      return newState;
    });
  };

  return (
    <div className="container flex flex-col relative">
      <h1 className="text-3xl font-bold fixed top-14 left-1/2 -translate-x-1/2 z-10">
        Notify
      </h1>
      {Object.entries(dummyNotifications)
        .reverse()
        .map(([month, days]) => (
          <div key={month} className="flex flex-col mt-12">
            <MonthToggle
              month={month}
              expanded={monthExpanded[month]}
              onClick={toggleMonth}
            />
            {monthExpanded[month] && (
              <div className="flex flex-col pl-4">
                {[...days]
                  .reverse()
                  .map(({ date, notifications }) => (
                    <NotificationList
                      key={date}
                      date={`${month} ${date}`}
                      notifications={[...notifications].reverse()}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

const MonthToggle = ({ month, expanded, onClick }) => (
  <div className="flex items-center justify-between px-4 py-2 rounded-lg drop mb-2 shadow">
    <p className="font-bold text-xl">{month}</p>
    <button
      className="text-xs font-bold text-dark-green/80 tracking-wide"
      onClick={() => onClick(month)}
    >
      <img
        src={expanded ? "/eye-slash-regular.svg" : "/eye-regular.svg"}
        className="w-6"
      />
    </button>
  </div>
);

const NotificationList = ({ date, notifications }) => (
  <div className="flex flex-col ml-2">
    <p className="font-bold text-xl">{date}</p>
    {notifications.map((notification) => (
      <NotificationItem key={notification.timestamp} {...notification} />
    ))}
  </div>
);

const NotificationItem = ({ timestamp, message, title }) => (
  <div className="flex items-center justify-between px-6 py-2 rounded-lg drop ml-2 mb-2 shadow">
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-md">{message}</p>
    </div>
    <p className="text-xs font-bold text-dark-green/80 tracking-wide">
      {timestamp}
    </p>
  </div>
);

