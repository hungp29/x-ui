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
  word: {
    subtitle: 'Cambridge Dictionary lookup',
    searchPlaceholder: 'Search a word...',
    tabEnglish: 'English',
    tabEnglishVi: 'English → Vietnamese',
    phonetic: 'Phonetic',
    enDefinitions: 'English Definitions',
    viTranslation: 'Vietnamese Translation',
    notFound: 'Word not found',
    noResults: 'No results for "{{word}}"',
    emptyTitle: 'Search a word',
    emptyDescription: 'Type a word above to look it up in the Cambridge Dictionary',
  },
  apps: {
    word: { name: 'Dictionary', description: 'Dictionary lookup' },
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
