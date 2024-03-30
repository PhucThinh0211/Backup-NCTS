type PageType = 'Content' | 'News' | 'Contact' | 'MediaLibrary' | 'Logo' | 'FileList';
type NewsType = 'NCTS' | 'Customer' | 'Activities' | 'Industrial' | 'Recruitment'; // Nhóm tin
// NCTS News, Activities News là bản tin nội bộ NCTS

export const breakingNews = [
  {
    id: '1',
    url: '/gioi-thieu',
    photoUrl: 'http://ncts.vn/images/ThuVien/_D8H6681a.jpg',
    title: 'Giới thiệu',
    description:
      'Công ty Cổ phần Dịch vụ Hàng hóa Nội Bài (NCTS), là đơn vị thành viên của Tổng công ty Hàng không Việt Nam, được thành lập và chính thức đi vào hoạt động từ ngày 01/05/2005. Kể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng không bằng chất lượng dịch vụ và các dịch vụ giá trị gia tăng. Cùng với sự phát triển của thị trường vận tải hàng hóa hàng không Việt Nam, NCTS là đối tác tin cậy hàng đầu của các công ty giao nhận vận tải, các hãng hàng không trong và ngoài nước.',
  },
  {
    id: '2',
    url: '/dich-vu/phuc-vu-hang-hoa',
    photoUrl: 'https://www.tcs.com.vn/api/images/2021-06-18T03-00-15.558Z-bg_service.jpg',
    title: 'Dịch vụ',
    description:
      'Cung cấp dịch vụ phục vụ hàng hóa chuyên nghiệp cho khách hàng, phát triển sự nghiệp cho nhân viên, đóng góp cho cộng đồng xã hội cũng như là nơi đầu tư mang lại hiệu quả cho cổ đông.',
  },
  {
    id: '3',
    url: '/tin-tuc/hoat-dong/ncts-tet-sum-vay-2024',
    photoUrl: 'http://ncts.vn/images/ThuVien/IMG_3021%20(Copy).JPG',
    title: 'NCTS - Tết sum vầy 2024',
    description:
      'Chúng ta đang bước đi những ngày cuối cùng chuẩn bị đón Tết Giáp Thìn 2024, chắc hẳn trong lòng mỗi người đều nhen lên những cảm xúc khó tả về một năm đầy biến động đã qua. Một năm mà suy thoái kinh tế toàn cầu ảnh hưởng không nhỏ tới Việt Nam nói chung và ngành hàng không nói riêng. Nhưng mùa xuân là mùa của ước mơ, mùa của hy vọng, mùa để chúng ta xích lại gần nhau hơn và trao cho nhau những sự quan tâm ấm áp, để hướng tới những điều ý nghĩa.',
  },
];
export const latestNews = [];
export const customerNews = [];

export const certificatePhotos = [{ id: '1', photoUrl: 'http....' }];
export const customerLogos = [{ id: '1', photoUrl: 'http....' }];
