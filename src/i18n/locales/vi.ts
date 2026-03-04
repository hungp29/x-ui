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
  apps: {
    word: { name: 'Word', description: 'Tài liệu' },
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
