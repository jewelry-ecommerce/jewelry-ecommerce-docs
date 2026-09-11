import type { Epic } from './types';

export const epics: Epic[] = [
  {
    id: 'EP-01',
    title: 'Account & Customer Profile',
    goal: 'Cho phép khách hàng đăng ký, đăng nhập và quản lý hồ sơ cá nhân.',
    businessValue: 'High',
    description:
      'Bao gồm đăng ký tài khoản, xác thực email, đăng nhập bằng social login (Google), quản lý thông tin cá nhân, địa chỉ giao hàng và lịch sử hoạt động.',
    dependencies: [],
    successCriteria: [
      'Khách hàng có thể đăng ký và đăng nhập thành công',
      'Xác thực email hoạt động đúng',
      'Quản lý nhiều địa chỉ giao hàng',
      'Lịch sử đơn hàng hiển thị đầy đủ',
    ],
    outOfScope: [
      'Đăng nhập bằng Facebook/Apple',
      '2FA (Two-Factor Authentication)',
      'Quản lý subscription/membership',
    ],
    storyIds: [
      'US-ACC-01',
      'US-ACC-02',
      'US-ACC-03',
      'US-ACC-04',
      'US-ACC-05',
      'US-ACC-06',
    ],
  },
  {
    id: 'EP-02',
    title: 'Catalog Discovery & Storefront',
    goal: 'Cho phép khách hàng duyệt, tìm kiếm và xem chi tiết sản phẩm trang sức.',
    businessValue: 'High',
    description:
      'Trang danh mục, tìm kiếm full-text, bộ lọc đa chiều (kim loại, đá quý, giá, size), trang chi tiết sản phẩm với variant selector, gallery ảnh và thông tin kỹ thuật.',
    dependencies: ['EP-01'],
    successCriteria: [
      'Tìm kiếm full-text hoạt động đúng với tiếng Việt',
      'Lọc sản phẩm theo nhiều tiêu chí đồng thời',
      'Trang chi tiết sản phẩm hiển thị đầy đủ thông tin',
      'Variant selector (size, màu) hoạt động đúng',
    ],
    outOfScope: [
      'AR/Virtual try-on',
      'So sánh sản phẩm (product comparison)',
      'Wishlist share',
    ],
    storyIds: [
      'US-CAT-01',
      'US-CAT-02',
      'US-CAT-03',
      'US-CAT-04',
      'US-CAT-05',
      'US-CAT-06',
    ],
  },
  {
    id: 'EP-03',
    title: 'Merchandising Administration',
    goal: 'Cho phép admin quản lý toàn bộ danh mục sản phẩm và hàng tồn kho.',
    businessValue: 'High',
    description:
      'CRUD sản phẩm, quản lý danh mục, upload ảnh, quản lý variant, thiết lập giá, quản lý tồn kho và cấu hình hiển thị storefront.',
    dependencies: ['EP-01', 'EP-02'],
    successCriteria: [
      'Admin có thể tạo, sửa, xóa sản phẩm',
      'Upload ảnh và video sản phẩm hoạt động',
      'Quản lý variant (size, chất liệu) đúng',
      'Tồn kho được cập nhật real-time',
    ],
    outOfScope: [
      'Import/Export hàng loạt từ ERP',
      'Quản lý nhà cung cấp (supplier management)',
      'Barcode/QR code generation',
    ],
    storyIds: [
      'US-ADM-01',
      'US-ADM-02',
      'US-ADM-03',
      'US-ADM-04',
      'US-ADM-05',
      'US-ADM-06',
    ],
  },
  {
    id: 'EP-04',
    title: 'Curated Sets',
    goal: 'Cho phép admin tạo bộ trang sức phối hợp và khách hàng mua theo bộ với giá ưu đãi.',
    businessValue: 'High',
    description:
      'Quản lý curated set (admin), hiển thị set trên storefront, thêm set vào giỏ hàng, áp dụng giá set và tracking tồn kho theo set.',
    dependencies: ['EP-02', 'EP-03'],
    successCriteria: [
      'Admin tạo và publish curated set thành công',
      'Khách hàng xem và thêm set vào giỏ',
      'Giá set được áp dụng đúng',
      'Tồn kho các sản phẩm trong set được kiểm soát',
    ],
    outOfScope: [
      'Khách hàng tự tạo custom set',
      'Gift set packaging options',
    ],
    storyIds: [
      'US-SET-01',
      'US-SET-02',
      'US-SET-03',
      'US-SET-04',
      'US-SET-05',
    ],
  },
  {
    id: 'EP-05',
    title: 'AI Stylist & Smart Set Builder',
    goal: 'Flagship feature: AI đề xuất trang sức phù hợp với phong cách, dịp và ngân sách của khách hàng.',
    businessValue: 'High',
    description:
      'AI Jewelry Stylist nhận input về dịp (occasion), phong cách (style), ngân sách và đề xuất sản phẩm/set phù hợp. Smart Set Builder cho phép khách hàng build set theo gợi ý AI.',
    dependencies: ['EP-02', 'EP-04'],
    successCriteria: [
      'AI đề xuất ít nhất 3 gợi ý phù hợp với input',
      'Gợi ý trong ngưỡng ngân sách ±10%',
      'Khách hàng có thể add gợi ý vào giỏ hàng trực tiếp',
      'Smart Set Builder tạo set từ gợi ý AI',
    ],
    outOfScope: [
      'Model training tự động từ user behavior',
      'AR overlay trên ảnh cá nhân',
      'Social sharing của AI outfit',
    ],
    storyIds: [
      'US-AI-01',
      'US-AI-02',
      'US-AI-03',
      'US-AI-04',
      'US-AI-05',
      'US-AI-06',
    ],
  },
  {
    id: 'EP-06',
    title: 'Cart & Pricing',
    goal: 'Quản lý giỏ hàng, tính giá chính xác theo variant và trạng thái giỏ hàng nhất quán.',
    businessValue: 'High',
    description:
      'Thêm/sửa/xóa sản phẩm trong giỏ, persistent cart (đăng nhập lại vẫn còn), tính giá theo variant, hiển thị tổng cộng và số lượng tồn kho.',
    dependencies: ['EP-01', 'EP-02'],
    successCriteria: [
      'Giỏ hàng persist sau khi login/logout',
      'Giá tính đúng theo variant được chọn',
      'Kiểm tra tồn kho khi thêm vào giỏ',
      'Số lượng trong giỏ hiển thị trên header',
    ],
    outOfScope: [
      'Saved for later',
      'Cart sharing link',
      'Multi-currency pricing',
    ],
    storyIds: [
      'US-CART-01',
      'US-CART-02',
      'US-CART-03',
      'US-CART-04',
      'US-CART-05',
    ],
  },
  {
    id: 'EP-07',
    title: 'Promotion & Voucher',
    goal: 'Cho phép admin tạo và quản lý chương trình khuyến mãi, voucher và flash sale.',
    businessValue: 'High',
    description:
      'CRUD voucher (percent/fixed), voucher usage limit, voucher stacking rules, flash sale với countdown, tự động áp dụng promotion theo điều kiện.',
    dependencies: ['EP-03', 'EP-06'],
    successCriteria: [
      'Voucher được validate và áp dụng đúng giảm giá',
      'Flash sale hiển thị countdown timer chính xác',
      'Usage limit được enforce đúng',
      'Stacking rules (không được dùng 2 voucher cùng lúc) hoạt động',
    ],
    outOfScope: [
      'Loyalty points redemption (thuộc EP riêng nếu có)',
      'Referral program',
      'B2B/wholesale pricing',
    ],
    storyIds: [
      'US-PROMO-01',
      'US-PROMO-02',
      'US-PROMO-03',
      'US-PROMO-04',
      'US-PROMO-05',
      'US-PROMO-06',
    ],
  },
  {
    id: 'EP-08',
    title: 'Checkout & Online Payment',
    goal: 'Flow checkout liền mạch từ giỏ hàng đến thanh toán thành công, hỗ trợ VNPay/Momo.',
    businessValue: 'High',
    description:
      'Multi-step checkout (địa chỉ → phương thức vận chuyển → thanh toán → xác nhận), tích hợp payment gateway, xử lý payment success/failure/retry và gửi email xác nhận.',
    dependencies: ['EP-01', 'EP-06', 'EP-07'],
    successCriteria: [
      'Checkout flow hoàn tất trong ≤5 bước',
      'Payment callback xử lý đúng',
      'Email xác nhận đơn hàng gửi tự động',
      'Payment failure được thông báo rõ và cho retry',
    ],
    outOfScope: [
      'COD (Cash on delivery) — tùy scope cuối',
      'Installment payment',
      'International shipping',
    ],
    storyIds: [
      'US-CHK-01',
      'US-CHK-02',
      'US-CHK-03',
      'US-CHK-04',
      'US-CHK-05',
      'US-CHK-06',
    ],
  },
  {
    id: 'EP-09',
    title: 'Orders, Stock & Pre-order',
    goal: 'Quản lý vòng đời đơn hàng, cập nhật tồn kho và hỗ trợ pre-order cho sản phẩm chưa về hàng.',
    businessValue: 'High',
    description:
      'Trạng thái đơn hàng (pending → confirmed → shipped → delivered → cancelled), quản lý tồn kho real-time, pre-order deposit và fulfillment khi hàng về.',
    dependencies: ['EP-08', 'EP-03'],
    successCriteria: [
      'Trạng thái đơn hàng cập nhật đúng theo lifecycle',
      'Tồn kho được trừ ngay khi đặt hàng',
      'Pre-order deposit được charge đúng',
      'Thông báo khi hàng pre-order sẵn sàng',
    ],
    outOfScope: [
      'Multi-warehouse routing',
      'Return/Refund flow (nếu không có thời gian)',
      'Partial shipment',
    ],
    storyIds: [
      'US-ORD-01',
      'US-ORD-02',
      'US-ORD-03',
      'US-ORD-04',
      'US-ORD-05',
      'US-ORD-06',
    ],
  },
  {
    id: 'EP-10',
    title: 'Admin Operations & Support',
    goal: 'Cung cấp công cụ quản trị toàn diện: quản lý đơn hàng, dashboard analytics và hỗ trợ khách hàng.',
    businessValue: 'High',
    description:
      'Admin dashboard với KPI summary, quản lý đơn hàng (search, filter, update status), customer management, basic analytics (doanh thu, sản phẩm bán chạy) và công cụ hỗ trợ.',
    dependencies: ['EP-09', 'EP-07', 'EP-03'],
    successCriteria: [
      'Admin có thể tìm và cập nhật bất kỳ đơn hàng nào',
      'Dashboard hiển thị KPI cơ bản',
      'Customer list có thể search và view',
      'Basic report có thể export',
    ],
    outOfScope: [
      'Advanced BI/analytics platform',
      'CRM tích hợp',
      'Live chat support',
    ],
    storyIds: [
      'US-OPS-01',
      'US-OPS-02',
      'US-OPS-03',
      'US-OPS-04',
      'US-OPS-05',
      'US-OPS-06',
    ],
  },
];

export const getEpicById = (id: string): Epic | undefined =>
  epics.find((e) => e.id === id);

export const epicOrder = epics.map((e) => e.id);
