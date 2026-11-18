# CR Robotics — Website Prototype

Prototype website được dựng từ ý tưởng CR Robotics và các tài liệu tham chiếu bạn đã gửi.

## Chạy thử
1. Giải nén `CR-Robotics.zip`.
2. Mở thư mục `CR-Robotics`.
3. Mở `index.html` bằng trình duyệt.

Có thể dùng VS Code + Live Server để chạy local ổn định hơn.

## Cấu trúc
```text
CR-Robotics/
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── intro.js
│   ├── cursor.js
│   ├── scroll.js
│   ├── robots.js
│   ├── navigation.js
│   └── main.js
└── assets/
    ├── images/
    └── models/
```

## Những phần đã triển khai
- Start Page dạng System Boot, loading progress, START EXPERIENCE và SKIP INTRO.
- Header cố định, đổi nền blur khi cuộn.
- Side navigation bên phải trên desktop.
- Bottom bar với barcode và số section.
- Hero với robot minh họa bằng CSS, grid, orbit, scanline/noise.
- Chuyển đổi nội dung giữa CR28, CR17, CR11, CR7 và CR9.
- Section Evolution thể hiện CR17 → CR11 → CR7.
- Scroll reveal dùng IntersectionObserver.
- Custom cursor và mouse spotlight trên thiết bị có chuột.
- Marquee, hover transitions, responsive mobile menu.
- Tôn trọng `prefers-reduced-motion`.

## Những phần đang là placeholder
- Hình robot hiện là minh họa CSS, không phải mô hình 3D thật.
- Nội dung mô tả tính năng robot chỉ là nội dung khái niệm dựa trên thông tin đã có; thông số kỹ thuật chưa được xác định.
- CR9 được mô tả ở mức khái quát, không mô phỏng hay hướng dẫn khả năng chiến đấu.
- Chưa có ảnh/video/model 3D thật trong thư mục assets.
- `robot.html` chưa được tạo vì hiện tại phần robot dùng bộ chọn ngay trên trang chính.

## Font
Prototype dùng Archivo và Geist Mono qua Google Fonts, dựa trên các font bạn đã gửi. Cần kết nối Internet để tải font; nếu offline, trình duyệt dùng font dự phòng.

## Tham chiếu triển khai
Các kỹ thuật giao diện được tham khảo ở mức ý tưởng/kỹ thuật từ source LN19: fixed header + trạng thái scroll, cursor hai lớp, reveal bằng IntersectionObserver, hiệu ứng marquee, scanline/noise và hỗ trợ reduced motion. Mã nguồn và nhận diện LN19 không được sao chép nguyên trạng.
