export const dashboard_data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 80]
export const dashboard_credits = 500
export const auth_wards = ["Choose Your Ward", "Ward 1", "Ward 2"]
export const dashboard_titles = [
  {title: "Knowledge", path: "/awareness"},
  {title: "Progress", path: "/progress"},
  {title: "Pair Dustbin", path: "/nfc"},
  {title: "Notify", path: "/notify"},
  {title: "PingMe", path: "/ping-me"},
  {title: "Activity", path: "/activity"},
]
export const awareness_video_link =
  "https://www.youtube.com/embed/DHfRfU3XUEo?si=2Tw6Xk_Xs3Ihwak3"
export const awareness_cardsData = Array.from({length: 9}, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: "This is a description of the card.",
  image: "https://placehold.co/150",
}))
export const progress_data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 75]
export const progress_users = [
  {name: "User 1", value: 66},
  {name: "User 2", value: 90},
  {name: "User 3", value: 45},
]
export const progress_BarStyles = {
  root: {width: "120px", height: "120px"},
  path: {stroke: "#215848"},
  text: {fill: "#215848", fontSize: "1rem"},
  trail: {
    stroke: "#9cdba6",
  },
}
const img = "https://placehold.co/300x200"
export const activity_posts = [
  {
    name: "john_doe",
    time: "2 hours ago",
    image: img,
    description: "This is a sample post",
  },
  {
    name: "jane_doe",
    time: "1 hour ago",
    image: img,
    description: "This is another sample post",
  },
]

export const dummyNotifications = {
  March: [
    {
      date: "01",
      notifications: [
        {
          message: "Notification 1",
          timestamp: "10:00",
          title: "Test Notification",
        },
        {
          message: "Notification 2",
          timestamp: "11:00",
          title: "Test Notification",
        },
        {
          message: "Notification 3",
          timestamp: "12:00",
          title: "Test Notification",
        },
        {
          message: "Notification 4",
          timestamp: "13:00",
          title: "Test Notification",
        },
        {
          message: "Notification 5",
          timestamp: "14:00",
          title: "Test Notification",
        },
      ],
    },
    {
      date: "02",
      notifications: [
        {
          message: "Notification 6",
          timestamp: "15:00",
          title: "Test Notification",
        },
        {
          message: "Notification 7",
          timestamp: "16:00",
          title: "Test Notification",
        },
        {
          message: "Notification 8",
          timestamp: "17:00",
          title: "Test Notification",
        },
        {
          message: "Notification 9",
          timestamp: "18:00",
          title: "Test Notification",
        },
        {
          message: "Notification 10",
          timestamp: "19:00",
          title: "Test Notification",
        },
      ],
    },
    {
      date: "03",
      notifications: [
        {
          message: "Notification 11",
          timestamp: "20:00",
          title: "Test Notification",
        },
        {
          message: "Notification 12",
          timestamp: "21:00",
          title: "Test Notification",
        },
        {
          message: "Notification 13",
          timestamp: "22:00",
          title: "Test Notification",
        },
        {
          message: "Notification 14",
          timestamp: "23:00",
          title: "Test Notification",
        },
        {
          message: "Notification 15",
          timestamp: "00:00",
          title: "Test Notification",
        },
      ],
    },
  ],
  April: [
    {
      date: "03",
      notifications: [
        {
          message: "Notification 26",
          timestamp: "20:00",
          title: "Test...",
        },
        {
          message: "Notification 27",
          timestamp: "21:00",
          title: "Test...",
        },
        {
          message: "Notification 28",
          timestamp: "22:00",
          title: "Test...",
        },
        {
          message: "Notification 29",
          timestamp: "23:00",
          title: "Test...",
        },
        {
          message: "Notification 30",
          timestamp: "00:00",
          title: "Test...",
        },
      ],
    },
  ],
}

export const article_data = [
  {title: "Article 1", description: "Description for article 1."},
  {title: "Article 2", description: "Description for article 2."},
  {title: "Article 3", description: "Description for article 3."},
  {title: "Article 4", description: "Description for article 4."},
]

export const admin_details_of_ward_items = ["Ward 1", "Tamil Nadu", "Chennai"]

export const admin_totalUsersInWard = 150

export const admin_leaderboard = [
  {
    name: "Alice",
    score: 250,
    image: "https://via.placeholder.com/40",
  },
  {
    name: "Bob",
    score: 200,
    image: "https://via.placeholder.com/40",
  },
  {
    name: "Charlie",
    score: 150,
    image: "https://via.placeholder.com/40",
  },
]

export const user_navbar = [
  {href: "/dashboard", label: "Dashboard"},
  {href: "/awareness", label: "Awareness"},
  {href: "/progress", label: "Progress"},
  {href: "/nfc", label: "NFC Pairing"},
  {href: "/profile", label: "Profile"},
  {href: "/auth", label: "Log out"},
]

export const admin_navbar = [
  {href: "/admin/dashboard", label: "Dashboard"},
  {href: "/admin/inbox", label: "Inbox"},
  {href: "/admin/activity", label: "Activity"},
  {href: "/admin/notifications", label: "Notifications"},
  {href: "/admin/state_progress", label: "State_Progress"},
  {href: "/auth", label: "Log out"},
]

export const admin_leaderboardData = [
  {name: "Ward 1", score: 120},
  {name: "Ward 2", score: 110},
  {name: "Ward 3", score: 105},
  {name: "Ward 4", score: 100},
  {name: "Ward 5", score: 95},
  {name: "Ward 6", score: 90},
  {name: "Ward 7", score: 85},
  {name: "Ward 8", score: 80},
]

export const admin_state_progress_page = "Tamil Nadu"
