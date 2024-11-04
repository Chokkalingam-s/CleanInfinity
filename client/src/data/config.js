export const dashboard_data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 80]
export const dashboard_credits = 500
export const auth_wards = ['Choose Your Ward', 'Ward 1', 'Ward 2']
export const dashboard_titles = [
  {title: 'Knowledge', path: '/knowledge'},
  {title: 'Progress', path: '/progress'},
  {title: 'Pair Dustbin', path: '/pair-dustbin'},
  {title: 'Notify', path: '/notify'},
  {title: 'PingMe', path: '/ping-me'},
  {title: 'Activity', path: '/activity'}
]
export const awareness_video_link = 'https://www.youtube.com/embed/DHfRfU3XUEo?si=2Tw6Xk_Xs3Ihwak3'
export const awareness_cardsData = Array.from({length: 9}, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: 'This is a description of the card.',
  image: 'https://placehold.co/150'
}))
export const progress_data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 75]
export const progress_users = [
  {name: 'User 1', value: 66},
  {name: 'User 2', value: 90},
  {name: 'User 3', value: 45}
]
export const progress_BarStyles = {
  root: {width: '120px', height: '120px'},
  path: {stroke: '#215848'},
  text: {fill: '#215848', fontSize: '1rem'},
  trail: {
    stroke: '#9cdba6'
  }
}

export const activity_posts = [
  {
    name: 'john_doe',
    time: '2 hours ago',
    image: 'https://placehold.co/300x200',
    description: 'This is a sample post'
  },
  {
    name: 'jane_doe',
    time: '1 hour ago',
    image: 'https://placehold.co/300x200',
    description: 'This is another sample post'
  }
]

export const dummyNotifications = {
  March: [
    {
      date: '01',
      notifications: [
        {message: 'Notification 1', timestamp: '10:00', title: 'Test Notification'},
        {message: 'Notification 2', timestamp: '11:00', title: 'Test Notification'},
        {message: 'Notification 3', timestamp: '12:00', title: 'Test Notification'},
        {message: 'Notification 4', timestamp: '13:00', title: 'Test Notification'},
        {message: 'Notification 5', timestamp: '14:00', title: 'Test Notification'}
      ]
    },
    {
      date: '02',
      notifications: [
        {message: 'Notification 6', timestamp: '15:00', title: 'Test Notification'},
        {message: 'Notification 7', timestamp: '16:00', title: 'Test Notification'},
        {message: 'Notification 8', timestamp: '17:00', title: 'Test Notification'},
        {message: 'Notification 9', timestamp: '18:00', title: 'Test Notification'},
        {message: 'Notification 10', timestamp: '19:00', title: 'Test Notification'}
      ]
    },
    {
      date: '03',
      notifications: [
        {message: 'Notification 11', timestamp: '20:00', title: 'Test Notification'},
        {message: 'Notification 12', timestamp: '21:00', title: 'Test Notification'},
        {message: 'Notification 13', timestamp: '22:00', title: 'Test Notification'},
        {message: 'Notification 14', timestamp: '23:00', title: 'Test Notification'},
        {message: 'Notification 15', timestamp: '00:00', title: 'Test Notification'}
      ]
    }
  ],
  April: [
    {
      date: '01',
      notifications: [
        {message: 'Notification 16', timestamp: '10:00', title: 'Test Notification'},
        {message: 'Notification 17', timestamp: '11:00', title: 'Test Notification'},
        {message: 'Notification 18', timestamp: '12:00', title: 'Test Notification'},
        {message: 'Notification 19', timestamp: '13:00', title: 'Test Notification'},
        {message: 'Notification 20', timestamp: '14:00', title: 'Test Notification'}
      ]
    },
    {
      date: '02',
      notifications: [
        {message: 'Notification 21', timestamp: '15:00', title: 'Test Notification'},
        {message: 'Notification 22', timestamp: '16:00', title: 'Test Notification'},
        {message: 'Notification 23', timestamp: '17:00', title: 'Test Notification'},
        {message: 'Notification 24', timestamp: '18:00', title: 'Test Notification'},
        {message: 'Notification 25', timestamp: '19:00', title: 'Test Notification'}
      ]
    },
    {
      date: '03',
      notifications: [
        {message: 'Notification 26', timestamp: '20:00', title: 'Test Notification'},
        {message: 'Notification 27', timestamp: '21:00', title: 'Test Notification'},
        {message: 'Notification 28', timestamp: '22:00', title: 'Test Notification'},
        {message: 'Notification 29', timestamp: '23:00', title: 'Test Notification'},
        {message: 'Notification 30', timestamp: '00:00', title: 'Test Notification'}
      ]
    }
  ]
}


export const article_data = [
  {title: 'Article 1', description: 'Description for article 1.'},
  {title: 'Article 2', description: 'Description for article 2.'},
  {title: 'Article 3', description: 'Description for article 3.'},
  {title: 'Article 4', description: 'Description for article 4.'}
]
