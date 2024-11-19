import { useState, useEffect } from "react";

export default function Notify({ enableCreateNotification = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const [notifications, setNotifications] = useState({});
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  });
  const [monthExpanded, setMonthExpanded] = useState({});

  // Fetch notifications from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/notifications')
      .then(response => response.json())
      .then(data => {
        const groupedNotifications = data.reduce((acc, notification) => {
          const yearMonth = `${notification.year} ${notification.month}`;
          if (!acc[yearMonth]) acc[yearMonth] = [];
          const day = acc[yearMonth].find(d => d.date === new Date(notification.date).getDate());
          if (day) {
            day.notifications.push(notification);
          } else {
            acc[yearMonth].push({
              date: new Date(notification.date).getDate(),
              notifications: [notification],
            });
          }
          return acc;
        }, {});

        setNotifications(groupedNotifications);
        setMonthExpanded(
          Object.keys(groupedNotifications).reduce((acc, yearMonth) => {
            acc[yearMonth] = true;
            return acc;
          }, {})
        );
      });
  }, []);

  // Create a new notification
  const handleShare = () => {
    fetch('http://localhost:5000/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNotification),
    })
      .then(response => response.json())
      .then(() => {
        setShowPopup(false);
        setNewNotification({ title: "", message: "" });

        // Refetch notifications
        fetch('/api/notifications')
          .then(response => response.json())
          .then(data => {
            const groupedNotifications = data.reduce((acc, notification) => {
              const yearMonth = `${notification.year} ${notification.month}`;
              if (!acc[yearMonth]) acc[yearMonth] = [];
              const day = acc[yearMonth].find(d => d.date === new Date(notification.date).getDate());
              if (day) {
                day.notifications.push(notification);
              } else {
                acc[yearMonth].push({
                  date: new Date(notification.date).getDate(),
                  notifications: [notification],
                });
              }
              return acc;
            }, {});
            setNotifications(groupedNotifications);
          });
      });
  };

  // Toggle month expansion
  const toggleMonth = (month) => {
    setMonthExpanded((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  return (
    <div className="container flex flex-col relative">
      <h1 className="text-3xl font-bold fixed top-14 left-1/2 -translate-x-1/2 z-10">
        Notify
      </h1>
      {enableCreateNotification && (
        <button
          onClick={() => setShowPopup(true)}
          className="fixed top-14 right-2 font-medium px-4 py-2 drop"
        >
          Create Notification +
        </button>
      )}
      {showPopup && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="drop p-4 w-11/12 lg:w-3/12">
            <h3 className="mb-2 text-lightest-green">New Notification</h3>
            <input
              type="text"
              placeholder="Title"
              value={newNotification.title}
              onChange={(e) =>
                setNewNotification({ ...newNotification, title: e.target.value })
              }
              className="w-full mb-2 px-2 py-1"
            />
            <textarea
              placeholder="Message"
              value={newNotification.message}
              onChange={(e) =>
                setNewNotification({ ...newNotification, message: e.target.value })
              }
              className="w-full mb-2 px-2 py-1"
            />
            <div className="flex gap-2">
              <button onClick={handleShare} className="btn">
                Share
              </button>
              <button onClick={() => setShowPopup(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {Object.entries(notifications)
        .reverse()
        .map(([yearMonth, days]) => (
          <div key={yearMonth} className="flex flex-col mt-12">
            <MonthToggle
              month={yearMonth}
              expanded={monthExpanded[yearMonth]}
              onClick={toggleMonth}
            />
            {monthExpanded[yearMonth] && (
              <div className="flex flex-col pl-4">
                {days
                  .slice()
                  .reverse()
                  .map(({ date, notifications }) => (
                    <NotificationList
                      key={date}
                      date={`${yearMonth} ${date}`}
                      notifications={notifications.slice().reverse()}
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
    {notifications.map((notification, index) => (
      <NotificationItem key={index} {...notification} />
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
