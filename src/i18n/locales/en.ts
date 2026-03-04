const en = {
  nav: {
    home: 'Home',
    allApps: 'All Apps',
    settings: 'Settings',
  },
  home: {
    title: 'Home',
    subtitle: 'Welcome back',
    apps: 'Apps',
    seeAll: 'See all',
  },
  allApps: {
    title: 'All Apps',
    subtitle_one: '{{count}} application available',
    subtitle_other: '{{count}} applications available',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage your preferences',
    language: {
      label: 'Language',
      description: 'Choose the display language',
    },
    theme: {
      label: 'Theme',
      description: 'Choose your preferred color scheme',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
  },
  apps: {
    word: { name: 'Word', description: 'Documents' },
    finance: { name: 'Finance', description: 'Budget & expenses' },
    calendar: { name: 'Calendar', description: 'Schedule & events' },
    mail: { name: 'Mail', description: 'Inbox' },
    photos: { name: 'Photos', description: 'Media library' },
    maps: { name: 'Maps', description: 'Directions & places' },
    storage: { name: 'Storage', description: 'Files & backups' },
    settings: { name: 'Settings', description: 'Preferences' },
  },
} as const

export default en
