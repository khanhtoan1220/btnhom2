import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // 👈 1. Thêm import Link từ react-router-dom

import Banner from "../components/Banner";
import QuickSearch from "../components/QuickSearch";
import ServiceList from "../components/ServiceList";
import FeaturedServices from "../components/FeaturedServices";
import PromotionList from "../components/PromotionList";
import FeaturedBranches from "../components/FeaturedBranches";
import BookingProcess from "../components/BookingProcess";
import Testimonials from "../components/Testimonials";
import PetBlogs from "../components/PetBlogs";
import Newsletter from "../components/Newsletter";

import api from "../untils/api";
import URL from "../contans/URL";
import banner from "../assets/imgs/banner.png";

function Home() {
  const [searchData, setSearchData] = useState(null);
  const [services, setServices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const rs = await api.get(URL.SERVICES);
        setServices(rs.data || []);
      } catch (error) {
        console.error("Lỗi lấy danh sách dịch vụ:", error);
      }
    };
    getServices();
  }, []);

  useEffect(() => {
    if (!searchData) return;

    const {
      searchText = "",
      petType = "",
      serviceId = "",
      branchId = "",
    } = searchData;
    const keyword = searchText.trim().toLowerCase();

    const filtered = services.filter((item) => {
      const matchesText =
        !keyword ||
        item.name?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword);

      const matchesPetType =
        !petType ||
        String(item.petType || item.targetPet || "")
          .toLowerCase()
          .includes(petType.toLowerCase());

      const matchesService =
        !serviceId ||
        String(item.categoryId || item.serviceCategoryId || item.id) ===
          String(serviceId);

      const matchesBranch =
        !branchId ||
        (Array.isArray(item.branchIds) &&
          item.branchIds.some((id) => String(id) === String(branchId)));

      return matchesText && matchesPetType && matchesService && matchesBranch;
    });

    setSearchResults(filtered);
  }, [searchData, services]);

  return (
    <div>
      <Banner />

      <QuickSearch updateSearchData={(data) => setSearchData(data)} />

      {searchData && (
        <section className="py-5 bg-light">
          <Container>
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">🔍 Kết quả tìm kiếm</h5>
                <p className="text-muted mb-0 fs-7">
                  {searchResults.length > 0
                    ? `Tìm thấy ${searchResults.length} dịch vụ phù hợp.`
                    : "Không tìm thấy dịch vụ nào phù hợp."}
                </p>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <Row className="g-4">
                {searchResults.map((item) => (
                  <Col key={item.id} lg={3} md={6}>
                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                      <Card.Img
                        variant="top"
                        src={item.thumbnail || item.image || banner}
                        alt={item.name}
                        style={{ height: "160px", objectFit: "cover" }}
                      />
                      <Card.Body className="d-flex flex-column p-3">
                        <Card.Title className="fw-bold text-dark fs-6 text-truncate mb-2">
                          {item.name}
                        </Card.Title>
                        <Card.Text className="text-muted fs-7 mb-2 text-truncate">
                          {item.description || "Không có mô tả"}
                        </Card.Text>

                        <div className="mt-auto pt-2 border-top">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold text-danger fs-6">
                              {item.price
                                ? `${item.price.toLocaleString("vi-VN")}đ`
                                : "Liên hệ"}
                            </span>
                            <span className="badge bg-warning text-dark">
                              {item.duration ? `${item.duration} phút` : ""}
                            </span>
                          </div>

                          <Link
                            to={`/services/${item.id}`}
                            className="btn btn-outline-warning btn-sm fw-bold w-100 rounded-pill mt-1"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="alert alert-warning text-center py-4 rounded-4 shadow-sm border-0">
                <p className="fw-bold mb-1">😞 Không tìm thấy kết quả nào!</p>
                <small className="text-muted">
                  Thử thay đổi từ khóa hoặc bỏ bớt các lựa chọn lọc xem sao nhé.
                </small>
              </div>
            )}
          </Container>
        </section>
      )}

      <ServiceList />
      <FeaturedServices />
      <PromotionList />
      <FeaturedBranches />
      <BookingProcess />
      <Testimonials />
      <PetBlogs />
      <Newsletter />
    </div>
  );
}

export default Home;
