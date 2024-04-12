import { MenuResponse, MenuType } from '@/services/MenuService';

// prettier-ignore
export const menus: MenuResponse[] = [
  { id: '1', label: 'Trang chủ', type: MenuType.Link, url: '/', sortSeq: 1 },
  { 
    id: '2', 
    label: 'Giới thiệu', 
    type: MenuType.Group, 
    groups: [
      { 
        id: '3', 
        label: 'Về chúng tôi', 
        links: [
          { id: '4', label: 'Sứ mệnh và tầm nhìn', url: '/gioi-thieu/su-menh-va-tam-nhin', sortSeq: 4 },
          { id: '5', label: 'Quy định biểu tượng', url: '/gioi-thieu/quy-dinh-bieu-tuong', sortSeq: 5 },
          { id: '6', label: 'Bộ máy tổ chức', url: '/gioi-thieu/bo-may-to-chuc', sortSeq: 6 },
          { id: '7', label: 'Thu viện ảnh', url: '/gioi-thieu/thu-vien-anh', sortSeq: 7 },
          { id: '8', label: 'Thư viện video', url: '/gioi-thieu/thu-vien-video', sortSeq: 8 },
        ], 
        sortSeq: 3,
      },
      {
        id: '10',
        label: 'Đối tác và khách hàng',
        links: [
          { id: '11', label: 'Đối tác', url: '/gioi-thieu/doi-tac', sortSeq: 11 },
          { id: '12', label: 'Khách hàng', url: '/gioi-thieu/khach-hang', sortSeq: 12 },
        ],
        sortSeq: 10,
      },
      {
        id: '20',
        label: 'Năng lực',
        links: [
          { id: '21', label: 'Trang thiết bị', url: '/gioi-thieu/trang-thiet-bi', sortSeq: 21 },
          { id: '22', label: 'Hệ thống thiết bị an ninh giám sát', url: '/gioi-thieu/he-thong-thiet-bi-an-ninh-giam-sat', sortSeq: 22 },
        ],
        sortSeq: 20,
      }
    ],
    sortSeq: 2 
  },
  { 
    id: '40', 
    label: 'Dịch vụ', 
    type: MenuType.Group, 
    groups: [
      {
        id: '41',
        label: 'Yêu cầu dịch vụ',
        links: [
          { id: '42', label: 'Chuyển hàng về thành phố', url: '/dich-vu/chuyen-hang-ve-thanh-pho', sortSeq: 42 },
          { id: '43', label: 'Biểu mẫu đăng ký', url: '/dich-vu/bieu-mau-dang-ky', sortSeq: 43 },
        ],
        sortSeq: 41,
      },
      {
        id: '50',
        label: 'Bảng giá dịch vụ',
        links: [
          { id: '51', label: 'Bảng giá số 08-2024/NCTS', url: '/dich-vu/bang-gia-so-08-2024-ncts', sortSeq: 51 },
        ],
        sortSeq: 50
      },
      {
        id: '60',
        label: 'Dịch vụ',
        links: [
          { id: '61', label: 'Phục vụ hàng hóa', url: '/dich-vu/phuc-vu-hang-hoa', sortSeq: 61 },
          { id: '62', label: 'Lưu kho', url: '/dich-vu/luu-kho', sortSeq: 62 },
          { id: '63', label: 'Dịch vụ khác', url: '/dich-vu/dich-vu-khac', sortSeq: 63 },
        ],
        sortSeq: 60
      }
    ],
    sortSeq: 40 
  },
  {
    id: '80',
    label: 'Tin tức',
    type: MenuType.Dropdown,
    links: [
      { id: '81', label: 'Dành cho khách hàng', url: '/tin-tuc/danh-cho-khach-hang', sortSeq: 81 },
      { id: '82', label: 'Hoạt động', url: '/tin-tuc/hoat-dong', sortSeq: 82 },
      { id: '83', label: 'Tuyển dụng', url: '/tin-tuc/tuyen-dung', sortSeq: 83 },
    ],
    sortSeq: 80,
  },
  { 
    id: '100', 
    label: 'Quan hệ cổ đông', 
    type: MenuType.Dropdown, 
    links: [
      { id: '101', label: 'Tin dành cho cổ đông', url: '/quan-he-co-dong/tin-danh-cho-co-dong', sortSeq: 101 },
      { id: '102', label: 'Đại hội đồng cổ đông', url: '/quan-he-co-dong/dai-hoi-dong-co-dong', sortSeq: 102 },
      { id: '103', label: 'Báo cáo tài chính', url: '/quan-he-co-dong/bao-cao-tai-chinh', sortSeq: 103 },
      { id: '104', label: 'Báo cáo thường niên', url: '/quan-he-co-dong/bao-cao-thuong-nien', sortSeq: 104 },
      { id: '105', label: 'Tin dành cho cổ đông', url: '/quan-he-co-dong/tin-danh-cho-co-dong', sortSeq: 105 },
      { id: '106', label: 'Báo cáo quản trị công ty', url: '/quan-he-co-dong/bao-cao-quan-tri-cong-ty', sortSeq: 106 }
    ], 
    sortSeq: 100 
  },
  {
    id: '120',
    label: 'Hướng dẫn',
    type: MenuType.Dropdown,
    links: [
      { id: '121', label: 'Sử dụng trang thông tin điện tử NCTS', url: '/huong-dan/su-dung-trang-thong-tin-dien-tu-ncts', sortSeq: 121 },
      { id: '122', label: 'Nhận hàng quốc tế tại kho thành phố', url: '/huong-dan/nhan-hang-quoc-te-tai-kho-thanh-pho', sortSeq: 122 },
      { id: '123', label: 'Nhận hàng quốc tế', url: '/huong-dan/nhan-hang-quoc-te', sortSeq: 123 },
      { id: '124', label: 'Nhận hàng nội địa tại kho thành phố', url: '/huong-dan/nhan-hang-noi-dia-tai-kho-thanh-pho', sortSeq: 124 },
      { id: '125', label: 'Nhận hàng nội địa', url: '/huong-dan/nhan-hang-noi-dia', sortSeq: 125 },
      { id: '126', label: 'Hướng dẫn sử dụng chức năng tra cứu thông tin GetIn & GetOut Hải quan', url: '/huong-dan/huong-dan-su-dung-chuc-nang-tra-cuu-thong-tin-getin-getout-hai-quan', sortSeq: 126 },
      { id: '127', label: 'Gửi hàng quốc tế tại kho thành phố', url: '/huong-dan/gui-hang-quoc-te-tai-kho-thanh-pho', sortSeq: 127 },
      { id: '128', label: 'Gửi hàng quốc tế', url: '/huong-dan/gui-hang-quoc-te', sortSeq: 128 },
      { id: '129', label: 'Gửi hàng nội địa tại kho thành phố', url: '/huong-dan/gui-hang-noi-dia-tai-kho-thanh-pho', sortSeq: 129 },
      { id: '130', label: 'Gửi hàng nội địa', url: '/huong-dan/gui-hang-noi-dia', sortSeq: 130 },
    ],
    sortSeq: 120,
  },
  { id: '140', label: 'Liên hệ', type: MenuType.Link, url: '/lien-he', sortSeq: 140 },
];
export const menusData: MenuResponse[] = [
  {
    label: 'Tin khách hàng',
    url: '/tin-tuc/tin-khach-hang',
    icons: null,
    sortSeq: 0,
    parentId: 'f226daae-49bf-7d25-9e1e-3a11b9a7b543',
    parent: null,
    type: MenuType.Link,
    style: 'None',
    language: 'vi',
    id: '1266ea6a-e658-2abf-6622-3a11b9a89c94',
  },
  {
    label: 'Tin tức',
    url: null,
    icons: null,
    sortSeq: 0,
    parentId: null,
    parent: null,
    type: MenuType.Dropdown,
    style: 'None',
    language: 'vi',
    id: 'f226daae-49bf-7d25-9e1e-3a11b9a7b543',
  },
  {
    label: 'Trang chủ',
    url: '/trang-chu',
    icons: null,
    sortSeq: 0,
    parentId: null,
    parent: null,
    type: MenuType.Link,
    style: 'None',
    language: 'vi',
    id: '3fdd5651-eb2d-fa05-2881-3a11b9a73a6c',
  },
  {
    label: 'Sứ mệnh và tầm nhìn',
    url: '/gioi-thieu/su-menh-va-tam-nhin',
    icons: null,
    sortSeq: 0,
    parentId: 'fb910fbf-4df9-43fe-cc8a-3a11b91e2e53',
    parent: null,
    type: MenuType.Link,
    style: 'None',
    language: 'vi',
    id: '9266d8d9-602e-454a-0af6-3a11b91f659b',
  },
  {
    label: 'Về chúng tôi',
    url: null,
    icons: null,
    sortSeq: 0,
    parentId: '4579bef6-9ca7-b280-2b9b-3a11b91d30e1',
    parent: null,
    type: MenuType.Group,
    style: 'None',
    language: 'vi',
    id: 'fb910fbf-4df9-43fe-cc8a-3a11b91e2e53',
  },
  {
    label: 'Giới thiệu',
    url: null,
    icons: null,
    sortSeq: 0,
    parentId: null,
    parent: null,
    type: MenuType.Group,
    style: 'None',
    language: 'vi',
    id: '4579bef6-9ca7-b280-2b9b-3a11b91d30e1',
  },
];
