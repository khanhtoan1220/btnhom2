import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Star,
  Heart,
  Clock,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  MapPin,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

// DỮ LIỆU MẪU CHI TIẾT DỊCH VỤ (ĐÃ BỔ SUNG THÊM NHIỀU DỊCH VỤ MỚI)
const MOCK_SERVICES = [
  {
    id: 1,
    name: "Tắm & Cắt Tỉa Lông Toàn Diện",
    category: "Grooming",
    petType: "Dog",
    duration: 60,
    price: 350000,
    salePrice: 290000,
    rating: 4.8,
    reviewCount: 124,
    popularity: 95,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800&q=80",
    ],
    suitableFor: "Chó nhỏ và vừa (Poodle, Corgi, Pug, Pomeranian...)",
    description:
      "Dịch vụ spa toàn diện giúp thú cưng sạch sẽ, thơm tho và có diện mạo xinh xắn nhất. Sử dụng dòng sữa tắm hữu cơ cao cấp nhập khẩu an toàn tuyệt đối cho da nhạy cảm.",
    includes: [
      "Tắm vòi sen xoa bóp thư giãn",
      "Sấy khô và chải lông tơ",
      "Cắt tỉa tạo kiểu theo yêu cầu",
      "Cắt móng, mài móng",
      "Vệ sinh tai & vắt tuyến hôi",
    ],
    steps: [
      "Kiểm tra tình trạng da và lông ban đầu",
      "Tắm sơ và ngâm bồn thảo dược nhẹ nhàng",
      "Vệ sinh tai, cắt móng và vắt tuyến hôi",
      "Sấy tạo kiểu và cắt tỉa theo yêu cầu của chủ nuôi",
      "Xịt xịt dưỡng lông hương hoa tự nhiên",
    ],
    notes: [
      "Vui lòng thông báo nếu bé có tiền sử dị ứng hoặc bệnh lý về da.",
      "Không áp dụng cho bé đang có dấu hiệu sốt hoặc vừa tiêm vắc-xin trong vòng 3 ngày.",
    ],
    branches: [
      { id: 101, name: "Cơ sở 1: 123 Nguyễn Trãi, Q.5, TP.HCM", phone: "0901 234 567" },
      { id: 102, name: "Cơ sở 2: 456 Cầu Giấy, Hà Nội", phone: "0902 345 678" },
    ],
    staff: [
      { id: 1, name: "Nguyễn Văn A", role: "Chuyên viên Grooming (5 năm kinh nghiệm)", avatar: "https://i.pravatar.cc/100?img=11" },
      { id: 2, name: "Trần Thị B", role: "Stylist Thú Cưng", avatar: "https://i.pravatar.cc/100?img=5" },
    ],
    reviews: [
      { id: 1, user: "Trần Minh T.", rating: 5, date: "12/05/2024", comment: "Bé Corgi nhà mình làm xong thơm phức, lông mượt mà cắt tỉa rất đều tay!" },
      { id: 2, user: "Lê Hoàng A.", rating: 4, date: "08/05/2024", comment: "Nhân viên nhiệt tình, cơ sở sạch sẽ. Sẽ quay lại." },
    ],
  },
  {
    id: 2,
    name: "Khám Sức Khỏe Định Kỳ",
    category: "Healthcare",
    petType: "Cat",
    duration: 30,
    price: 200000,
    salePrice: null,
    rating: 4.9,
    reviewCount: 89,
    popularity: 88,
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80",
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80",
    ],
    suitableFor: "Mèo ở mọi lứa tuổi",
    description: "Khám tổng quát giúp phát hiện sớm các bệnh lý tiềm ẩn, kiểm tra thể trạng, răng miệng, mắt, tai và tư vấn dinh dưỡng hợp lý.",
    includes: ["Đo thân nhiệt & nhịp tim", "Kiểm tra mắt, tai, mũi, răng miệng", "Soi da tìm ký sinh trùng", "Tư vấn dinh dưỡng"],
    steps: ["Cân trọng lượng & lấy thông tin", "Khám lâm sàng toàn thân", "Tư vấn chế độ ăn & phác đồ chăm sóc"],
    notes: ["Nên mang theo sổ theo dõi sức khỏe/tiêm phòng của bé nếu có."],
    branches: [
      { id: 101, name: "Cơ sở 1: 123 Nguyễn Trãi, Q.5, TP.HCM", phone: "0901 234 567" },
    ],
    staff: [
      { id: 3, name: "Bác sĩ Lê Văn C", role: "Bác sĩ Thú y Trưởng", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
    reviews: [
      { id: 1, user: "Phạm Thu H.", rating: 5, date: "01/05/2024", comment: "Bác sĩ tư vấn ân cần, giải thích kỹ lưỡng lắm." },
    ],
  },
  {
    id: 3,
    name: "Tắm Spa Thư Giãn & Khử Mùi Cho Mèo",
    category: "Grooming",
    petType: "Cat",
    duration: 45,
    price: 250000,
    salePrice: 220000,
    rating: 4.7,
    reviewCount: 65,
    popularity: 90,
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    ],
    suitableFor: "Mèo Anh lông ngắn, Mèo Ba Tư, Mèo Ta...",
    description: "Liệu trình tắm dịu nhẹ giảm căng thẳng cho mèo, sử dụng sữa tắm chuyên dụng loại bỏ xơ rối và sấy tĩnh âm tránh làm bé hoảng sợ.",
    includes: [
      "Tắm sữa tắm giảm căng thẳng",
      "Sấy khô bằng buồng sấy tĩnh âm",
      "Chải lông rụng và đánh rối",
      "Vệ sinh tai & lau mắt sạch sẽ",
    ],
    steps: [
      "Làm quen và vuốt ve giảm căng thẳng",
      "Tắm massage với nước ấm vừa đủ",
      "Đưa vào buồng sấy tĩnh âm chuyên dụng",
      "Chải lông và sịt tinh dầu dưỡng mượt",
    ],
    notes: ["Không áp dụng cho mèo quá hung dữ hoặc chưa từng tiếp xúc với nước."],
    branches: [
      { id: 101, name: "Cơ sở 1: 123 Nguyễn Trãi, Q.5, TP.HCM", phone: "0901 234 567" },
    ],
    staff: [
      { id: 2, name: "Trần Thị B", role: "Stylist Thú Cưng", avatar: "https://i.pravatar.cc/100?img=5" },
    ],
    reviews: [
      { id: 1, user: "Nguyễn Hương M.", rating: 5, date: "15/05/2024", comment: "Bé mèo nhà mình sợ nước nhưng vào đây làm rất ngoan, thơm nức nở!" },
    ],
  },
  {
    id: 4,
    name: "Khách Sạn Thú Cưng VIP (1 Ngày Đêm)",
    category: "Boarding",
    petType: "Dog",
    duration: 1440,
    price: 300000,
    salePrice: 270000,
    rating: 4.9,
    reviewCount: 150,
    popularity: 98,
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    ],
    suitableFor: "Chó cảnh mọi kích thước",
    description: "Phòng lưu trú máy lạnh 24/7, trang bị camera giám sát giúp chủ nuôi theo dõi trực tiếp. Bao gồm 3 bữa ăn dinh dưỡng và giờ dạo chơi hàng ngày.",
    includes: [
      "Phòng ở riêng biệt sạch sẽ, tiệt trùng",
      "Camera HD theo dõi 24/7 qua điện thoại",
      "3 bữa ăn theo chế độ hạt/pate cao cấp",
      "2 lượt dạo chơi vận động/ngày",
    ],
    steps: [
      "Check-in, kiểm tra sức khỏe ban đầu",
      "Nhận phòng và xếp đồ dùng cá nhân",
      "Cập nhật nhật ký ăn uống và video cho chủ hàng ngày",
    ],
    notes: ["Bé cần được tiêm phòng đầy đủ các mũi cơ bản trước khi gửi."],
    branches: [
      { id: 101, name: "Cơ sở 1: 123 Nguyễn Trãi, Q.5, TP.HCM", phone: "0901 234 567" },
      { id: 102, name: "Cơ sở 2: 456 Cầu Giấy, Hà Nội", phone: "0902 345 678" },
    ],
    staff: [
      { id: 4, name: "Hoàng Văn D", role: "Quản lý Khách sạn Thú cưng", avatar: "https://i.pravatar.cc/100?img=33" },
    ],
    reviews: [
      { id: 1, user: "Đặng Tuấn K.", rating: 5, date: "20/05/2024", comment: "Phòng sạch không mùi, xem camera thấy bé chơi vui lắm nên rất yên tâm đi công tác." },
    ],
  },
  {
    id: 5,
    name: "Tiêm Vắc-Xin & Tẩy Giun Trọn Gói",
    category: "Healthcare",
    petType: "Dog",
    duration: 20,
    price: 450000,
    salePrice: 390000,
    rating: 4.9,
    reviewCount: 210,
    popularity: 92,
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80",
    ],
    suitableFor: "Chó con từ 2 tháng tuổi trở lên",
    description: "Gói tiêm phòng vắc-xin 7 bệnh nguy hiểm kết hợp sổ giun định kỳ. Vắc-xin nhập khẩu chính hãng bảo quản chuẩn lạnh nghiêm ngặt.",
    includes: [
      "Khám tổng quát trước khi tiêm",
      "Vắc-xin 7 bệnh nhập khẩu Mỹ/Pháp",
      "Uống thuốc tẩy giun nội ngoại ký sinh",
      "Cấp sổ theo dõi sức khỏe chuẩn y tế",
    ],
    steps: [
      "Đo nhiệt độ, kiểm tra sức khỏe tổng quát",
      "Tiêm vắc-xin và ghi sổ theo dõi",
      "Theo dõi phản ứng sau tiêm tại chỗ 15-20 phút",
    ],
    notes: ["Không tiêm khi bé đang bị tiêu chảy, bỏ ăn hoặc sốt."],
    branches: [
      { id: 101, name: "Cơ sở 1: 123 Nguyễn Trãi, Q.5, TP.HCM", phone: "0901 234 567" },
      { id: 102, name: "Cơ sở 2: 456 Cầu Giấy, Hà Nội", phone: "0902 345 678" },
    ],
    staff: [
      { id: 3, name: "Bác sĩ Lê Văn C", role: "Bác sĩ Thú y Trưởng", avatar: "https://i.pravatar.cc/100?img=13" },
    ],
    reviews: [
      { id: 1, user: "Vũ Mai O.", rating: 5, date: "10/04/2024", comment: "Bác sĩ tiêm êm lắm, bé không bị giật mình hay đau." },
    ],
  },
  {
    id: 6,
    name: "Cắt Mài Móng & Vệ Sinh Tai Chuyên Sâu",
    category: "Grooming",
    petType: "Dog",
    duration: 20,
    price: 100000,
    salePrice: 80000,
    rating: 4.6,
    reviewCount: 45,
    popularity: 75,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
    ],
    suitableFor: "Chó và mèo mọi lứa tuổi",
    description: "Dịch vụ nhanh giúp vệ sinh móng tay chân gọn gàng, mài mịn tránh cào xước đồ đạc, kết hợp rửa tai sạch sẽ phòng ngừa viêm tai.",
    includes: [
      "Cắt móng bằng kềm chuyên dụng",
      "Mài mịn móng bằng máy mài tĩnh âm",
      "Nổ lông tai (nếu có) & Nhỏ dung dịch rửa tai",
    ],
    steps: [
      "Kiểm tra tủy móng để tránh cắt sát gây đau",
      "Cắt và mài bo tròn góc móng",
      "Vệ sinh tai bằng bông y tế mềm",
    ],
    notes: ["Nên thực hiện định kỳ 2-3 tuần/lần."],
    branches: [
      { id: 101, name: "Cơ sở 1: 123 Nguyễn Trãi, Q.5, TP.HCM", phone: "0901 234 567" },
    ],
    staff: [
      { id: 2, name: "Trần Thị B", role: "Stylist Thú Cưng", avatar: "https://i.pravatar.cc/100?img=5" },
    ],
    reviews: [
      { id: 1, user: "Phan Văn H.", rating: 5, date: "02/05/2024", comment: "Nhanh gọn lẹ, nhân viên làm nhẹ nhàng không đau bé." },
    ],
  },
  {
    id: 7,
    name: "Huấn Luyện Lệnh Cơ Bản Cho Chó",
    category: "Training",
    petType: "Dog",
    duration: 90,
    price: 600000,
    salePrice: 500000,
    rating: 4.9,
    reviewCount: 38,
    popularity: 82,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    ],
    suitableFor: "Chó từ 3 đến 12 tháng tuổi",
    description: "Buổi huấn luyện 1-1 với huấn luyện viên giúp cún cưng nắm vững các lệnh cơ bản: Ngồi, Nằm, Bắt tay, Đi vệ sinh đúng chỗ và nghe lời chủ.",
    includes: [
      "Dạy 5 khẩu lệnh cơ bản",
      "Sửa thói quen xấu (cắn đồ, sủa bậy)",
      "Hướng dẫn chủ nuôi phương pháp thưởng - phạt đúng cách",
    ],
    steps: [
      "Đánh giá tâm lý và tính cách cún",
      "Thực hành phản xạ với bánh thưởng",
      "Chuyển giao phương pháp cho chủ nuôi tự ôn tập",
    ],
    notes: ["Cần chủ nuôi cùng tham gia để đạt hiệu quả tốt nhất."],
    branches: [
      { id: 102, name: "Cơ sở 2: 456 Cầu Giấy, Hà Nội", phone: "0902 345 678" },
    ],
    staff: [
      { id: 5, name: "Trịnh Đình E", role: "Huấn luyện viên Thú cưng", avatar: "https://i.pravatar.cc/100?img=60" },
    ],
    reviews: [
      { id: 1, user: "Lê Thanh T.", rating: 5, date: "18/04/2024", comment: "Bé Cún nhà mình học xong về ngoan hẳn, đi vệ sinh đúng khay!" },
    ],
  },
];

const ITEMS_PER_PAGE = 6;

export default function Services() {
  // State quản lý xem danh sách hay chi tiết (dùng selectedServiceId)
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // State tìm kiếm & bộ lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000000);
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");

  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Thêm / Xóa khỏi danh sách yêu thích
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedPetType("All");
    setSelectedCategory("All");
    setPriceRange(1000000);
    setSelectedDuration("All");
    setMinRating(0);
    setSortBy("popularity");
    setCurrentPage(1);
  };

  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPet =
        selectedPetType === "All" || service.petType === selectedPetType;
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const currentPrice = service.salePrice || service.price;
      const matchesPrice = currentPrice <= priceRange;

      let matchesDuration = true;
      if (selectedDuration === "short") matchesDuration = service.duration <= 30;
      if (selectedDuration === "medium")
        matchesDuration = service.duration > 30 && service.duration <= 60;
      if (selectedDuration === "long") matchesDuration = service.duration > 60;

      const matchesRating = service.rating >= minRating;

      return (
        matchesSearch &&
        matchesPet &&
        matchesCategory &&
        matchesPrice &&
        matchesDuration &&
        matchesRating
      );
    }).sort((a, b) => {
      const getEffectivePrice = (item) => item.salePrice || item.price;
      if (sortBy === "price-asc")
        return getEffectivePrice(a) - getEffectivePrice(b);
      if (sortBy === "price-desc")
        return getEffectivePrice(b) - getEffectivePrice(a);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popularity") return b.popularity - a.popularity;
      return 0;
    });
  }, [
    searchTerm,
    selectedPetType,
    selectedCategory,
    priceRange,
    selectedDuration,
    minRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE) || 1;
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  // Tìm thông tin dịch vụ đang chọn xem chi tiết
  const currentServiceDetail = MOCK_SERVICES.find(
    (s) => s.id === selectedServiceId
  );

  // NẾU ĐANG CHỌN XEM CHI TIẾT DỊCH VỤ (/services/:id)
  if (selectedServiceId && currentServiceDetail) {
    return (
      <ServiceDetailView
        service={currentServiceDetail}
        onBack={() => setSelectedServiceId(null)}
        isFav={favorites.includes(currentServiceDetail.id)}
        onToggleFav={() => toggleFavorite(currentServiceDetail.id)}
        allServices={MOCK_SERVICES}
        onSelectService={(id) => setSelectedServiceId(id)}
      />
    );
  }

  // GIAO DIỆN DANH SÁCH DỊCH VỤ (/services)
  return (
    <div style={{ padding: "20px 0", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Dịch Vụ Chăm Sóc Thú Cưng
      </h1>

      {/* Thanh tìm kiếm & Sắp xếp */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ theo tên..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "10px 10px 10px 35px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <Search
            size={18}
            style={{ position: "absolute", left: "10px", top: "12px", color: "#888" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Sắp xếp:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <option value="popularity">Mức độ phổ biến</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* SIDEBAR BỘ LỌC */}
        <div
          style={{
            flex: "1 1 250px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "12px",
            height: "fit-content",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "5px" }}>
              <Filter size={20} /> Bộ Lọc
            </h3>
            <button
              onClick={resetFilters}
              style={{
                border: "none",
                background: "none",
                color: "#ff4d4f",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <RotateCcw size={14} /> Bỏ lọc
            </button>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Loại thú cưng
            </label>
            <select
              value={selectedPetType}
              onChange={(e) => {
                setSelectedPetType(e.target.value);
                setCurrentPage(1);
              }}
              style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
            >
              <option value="All">Tất cả thú cưng</option>
              <option value="Dog">Chó (Dog)</option>
              <option value="Cat">Mèo (Cat)</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
            >
              <option value="All">Tất cả danh mục</option>
              <option value="Grooming">Làm đẹp & Spa</option>
              <option value="Healthcare">Y tế & Sức khỏe</option>
              <option value="Boarding">Khách sạn thú cưng</option>
              <option value="Training">Huấn luyện</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Giá tối đa: {priceRange.toLocaleString("vi-VN")} đ
            </label>
            <input
              type="range"
              min={100000}
              max={1000000}
              step={50000}
              value={priceRange}
              onChange={(e) => {
                setPriceRange(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Thời lượng
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => {
                setSelectedDuration(e.target.value);
                setCurrentPage(1);
              }}
              style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
            >
              <option value="All">Tất cả thời lượng</option>
              <option value="short">Dưới 30 phút</option>
              <option value="medium">30 - 60 phút</option>
              <option value="long">Trên 60 phút</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Đánh giá từ
            </label>
            <select
              value={minRating}
              onChange={(e) => {
                setMinRating(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
            >
              <option value={0}>Tất cả đánh giá</option>
              <option value={4.0}>Từ 4.0 trở lên ⭐</option>
              <option value={4.5}>Từ 4.5 trở lên ⭐</option>
              <option value={4.8}>Từ 4.8 trở lên ⭐</option>
            </select>
          </div>
        </div>

        {/* DANH SÁCH CARD DỊCH VỤ */}
        <div style={{ flex: "3 1 600px" }}>
          {paginatedServices.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              Không tìm thấy dịch vụ nào phù hợp với bộ lọc.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {paginatedServices.map((service) => {
                const isFav = favorites.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <div style={{ position: "relative", height: "180px" }}>
                      <img
                        src={service.image}
                        alt={service.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        onClick={(e) => toggleFavorite(service.id, e)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          backgroundColor: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        <Heart
                          size={20}
                          color={isFav ? "red" : "#888"}
                          fill={isFav ? "red" : "none"}
                        />
                      </button>
                    </div>

                    <div style={{ padding: "15px" }}>
                      <span
                        style={{
                          backgroundColor: "#e6f7ff",
                          color: "#1890ff",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {service.petType === "Dog" ? "🐶 Chó" : "🐱 Mèo"}
                      </span>

                      <h3
                        style={{
                          margin: "10px 0 5px 0",
                          fontSize: "16px",
                          height: "42px",
                          overflow: "hidden",
                        }}
                      >
                        {service.name}
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          color: "#666",
                          fontSize: "13px",
                          marginBottom: "8px",
                        }}
                      >
                        <Clock size={14} /> {service.duration >= 60 ? `${Math.floor(service.duration / 60)} giờ` : `${service.duration} phút`}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "13px",
                          marginBottom: "10px",
                        }}
                      >
                        <Star size={16} color="#ffc107" fill="#ffc107" />
                        <strong>{service.rating}</strong>
                        <span style={{ color: "#888" }}>
                          ({service.reviewCount} đánh giá)
                        </span>
                      </div>

                      <div style={{ marginTop: "auto" }}>
                        {service.salePrice ? (
                          <div>
                            <span
                              style={{
                                color: "#ff4d4f",
                                fontSize: "18px",
                                fontWeight: "bold",
                                marginRight: "8px",
                              }}
                            >
                              {service.salePrice.toLocaleString("vi-VN")} đ
                            </span>
                            <span
                              style={{
                                color: "#999",
                                textDecoration: "line-through",
                                fontSize: "13px",
                              }}
                            >
                              {service.price.toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                        ) : (
                          <span
                            style={{
                              color: "#333",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            {service.price.toLocaleString("vi-VN")} đ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PHÂN TRANG */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "30px",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                <ChevronLeft size={16} />
              </button>

              <span>
                Trang <strong>{currentPage}</strong> / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// COMPONENT CHI TIẾT DỊCH VỤ (/services/:id)
function ServiceDetailView({
  service,
  onBack,
  isFav,
  onToggleFav,
  allServices,
  onSelectService,
}) {
  const [selectedImg, setSelectedImg] = useState(
    service.images?.[0] || service.image
  );

  // Lọc các dịch vụ liên quan (cùng category hoặc petType)
  const relatedServices = allServices.filter(
    (item) =>
      item.id !== service.id &&
      (item.category === service.category || item.petType === service.petType)
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 0", fontFamily: "sans-serif" }}>
      {/* Nút Quay lại */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          background: "#f0f0f0",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        <ArrowLeft size={18} /> Quay lại danh sách
      </button>

      {/* KHỐI THÔNG TIN CHÍNH */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginBottom: "40px" }}>
        {/* Bộ sưu tập ảnh */}
        <div style={{ flex: "1 1 450px" }}>
          <div style={{ height: "350px", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
            <img
              src={selectedImg}
              alt={service.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {(service.images || [service.image]).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setSelectedImg(img)}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: selectedImg === img ? "2px solid #1890ff" : "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>

        {/* Thông tin nhanh & Giá */}
        <div style={{ flex: "1 1 450px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span
                style={{
                  backgroundColor: "#e6f7ff",
                  color: "#1890ff",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {service.petType === "Dog" ? "🐶 Dành cho Chó" : "🐱 Dành cho Mèo"}
              </span>

              <button
                onClick={onToggleFav}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Heart size={20} color={isFav ? "red" : "#888"} fill={isFav ? "red" : "none"} />
              </button>
            </div>

            <h1 style={{ fontSize: "28px", margin: "12px 0" }}>{service.name}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px", fontSize: "14px", color: "#666" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Star size={18} color="#ffc107" fill="#ffc107" />
                <strong style={{ color: "#000" }}>{service.rating}</strong> ({service.reviewCount} đánh giá)
              </span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={16} /> {service.duration >= 60 ? `${Math.floor(service.duration / 60)} giờ` : `${service.duration} phút`}
              </span>
            </div>

            <div style={{ backgroundColor: "#fafafa", padding: "15px", borderRadius: "10px", marginBottom: "15px" }}>
              <div style={{ color: "#666", fontSize: "13px", marginBottom: "5px" }}>Đối tượng phù hợp:</div>
              <div style={{ fontWeight: "bold", color: "#333" }}>{service.suitableFor || "Mọi loại thú cưng"}</div>
            </div>

            <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "20px" }}>{service.description}</p>
          </div>

          {/* Khối giá & Nút Đặt lịch */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
              {service.salePrice ? (
                <div>
                  <span style={{ color: "#ff4d4f", fontSize: "28px", fontWeight: "bold", marginRight: "12px" }}>
                    {service.salePrice.toLocaleString("vi-VN")} đ
                  </span>
                  <span style={{ color: "#999", textDecoration: "line-through", fontSize: "16px" }}>
                    {service.price.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              ) : (
                <span style={{ color: "#333", fontSize: "28px", fontWeight: "bold" }}>
                  {service.price.toLocaleString("vi-VN")} đ
                </span>
              )}
            </div>

            <button
              onClick={() => alert(`Đặt lịch thành công dịch vụ: ${service.name}`)}
              style={{
                width: "100%",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 4px 10px rgba(255, 77, 79, 0.3)",
              }}
            >
              <Calendar size={20} /> Đặt Lịch Ngay
            </button>
          </div>
        </div>
      </div>

      {/* NỘI DUNG CHI TIẾT */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginBottom: "40px" }}>
        {/* Nội dung bao gồm & Các bước */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "12px" }}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={20} color="#52c41a" /> Dịch vụ bao gồm
          </h3>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "#444" }}>
            {service.includes?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={20} color="#1890ff" /> Quy trình thực hiện
          </h3>
          <ol style={{ paddingLeft: "20px", lineHeight: "1.8", color: "#444" }}>
            {service.steps?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Cơ sở & Nhân viên */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "12px" }}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={20} color="#ff4d4f" /> Cơ sở đáp ứng
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {service.branches?.map((branch) => (
              <div key={branch.id} style={{ background: "#fff", padding: "10px", borderRadius: "8px", border: "1px solid #eee" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>{branch.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>Hotline: {branch.phone}</div>
              </div>
            ))}
          </div>

          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={20} color="#722ed1" /> Nhân viên thực hiện
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {service.staff?.map((st) => (
              <div key={st.id} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", padding: "8px", borderRadius: "8px", border: "1px solid #eee" }}>
                <img src={st.avatar} alt={st.name} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>{st.name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>{st.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LƯU Ý */}
      {service.notes && service.notes.length > 0 && (
        <div style={{ backgroundColor: "#fffbe6", border: "1px solid #ffe58f", padding: "15px 20px", borderRadius: "10px", marginBottom: "40px" }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#faad14", display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertCircle size={18} /> Lưu ý quan trọng
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#666" }}>
            {service.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}