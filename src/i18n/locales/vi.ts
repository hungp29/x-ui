const vi = {
  nav: {
    home: 'Trang chủ',
    allApps: 'Tất cả ứng dụng',
    settings: 'Cài đặt',
  },
  home: {
    title: 'Trang chủ',
    subtitle: 'Chào mừng trở lại',
    apps: 'Ứng dụng',
    seeAll: 'Xem tất cả',
  },
  allApps: {
    title: 'Tất cả ứng dụng',
    subtitle_one: '{{count}} ứng dụng',
    subtitle_other: '{{count}} ứng dụng',
  },
  settings: {
    title: 'Cài đặt',
    subtitle: 'Quản lý tùy chọn của bạn',
    language: {
      label: 'Ngôn ngữ',
      description: 'Chọn ngôn ngữ hiển thị',
    },
    theme: {
      label: 'Giao diện',
      description: 'Chọn chế độ màu sắc',
      system: 'Theo hệ thống',
      light: 'Sáng',
      dark: 'Tối',
    },
  },
  word: {
    subtitle: 'Tra cứu từ điển Cambridge',
    searchPlaceholder: 'Tìm kiếm một từ...',
    tabEnglish: 'Tiếng Anh',
    tabEnglishVi: 'Anh → Việt',
    phonetic: 'Phiên âm',
    enDefinitions: 'Định nghĩa tiếng Anh',
    viTranslation: 'Dịch nghĩa tiếng Việt',
    notFound: 'Không tìm thấy từ',
    noResults: 'Không có kết quả cho "{{word}}"',
    emptyTitle: 'Tra cứu từ vựng',
    emptyDescription: 'Nhập một từ ở trên để tra cứu trong từ điển Cambridge',
  },
  apps: {
    word: { name: 'Từ điển', description: 'Tra cứu từ điển' },
    finance: { name: 'Tài chính', description: 'Ngân sách & chi tiêu' },
    calendar: { name: 'Lịch', description: 'Lịch trình & sự kiện' },
    mail: { name: 'Thư', description: 'Hộp thư đến' },
    photos: { name: 'Ảnh', description: 'Thư viện phương tiện' },
    maps: { name: 'Bản đồ', description: 'Chỉ đường & địa điểm' },
    storage: { name: 'Lưu trữ', description: 'Tệp & sao lưu' },
    settings: { name: 'Cài đặt', description: 'Tùy chọn' },
  },
} as const

export default vi
