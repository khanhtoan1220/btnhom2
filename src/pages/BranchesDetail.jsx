import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaStar } from "react-icons/fa";

import api from "../untils/api";
import URL from "../contans/URL";

function BranchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(null);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [resBranches, resServices, resEmployees, resTimes] =
        await Promise.all([
          api.get(URL.BRANCHES),
          api.get(URL.SERVICES),
          api.get(URL.EMPLOYEES),
          api.get(URL.TIME_SLOTS),
        ]);

      const foundBranch = resBranches.data.find(
        (item) => String(item.id) === String(id),
      );
      if (!foundBranch) {
        navigate("/branches");
        return;
      }

      setBranch(foundBranch);
      setServices(resServices.data);
      setEmployees(resEmployees.data);
      setTimeSlots(resTimes.data);
    };

    fetchData();
  }, [id, navigate]);

  const branchServices = useMemo(() => {
    if (!branch) return [];
    return services.filter((item) =>
      branch.serviceIds.includes(String(item.id)),
    );
  }, [branch, services]);

  const branchEmployees = useMemo(() => {
    if (!branch) return [];
    return employees.filter(
      (item) => String(item.branchId) === String(branch.id),
    );
  }, [branch, employees]);

  if (!branch) {
    return (
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center py-5">Đang tải chi nhánh...</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="mb-4">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            Quay lại danh sách cơ sở
          </Button>
        </div>

        <div className="row gy-4">
          <div className="col-lg-8">
            <div className="mb-4">
              <h6 className="text-warning fw-bold text-uppercase mb-1">
                Chi nhánh
              </h6>
              <h2 className="fw-bold text-dark">{branch.name}</h2>
            </div>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Badge bg="warning" className="text-dark fw-semibold">
                {branch.district}
              </Badge>
              <Badge bg="secondary" className="fw-semibold">
                {branch.rating.toFixed(1)} ⭐ ({branch.reviewCount})
              </Badge>
              <Badge bg="info" className="text-dark fw-semibold">
                {branch.city}
              </Badge>
            </div>
<Row className="g-3 mb-4">
              {branch.images.map((src, index) => (
                <Col key={index} md={6} sm={12}>
                  <div
                    className="rounded-4 overflow-hidden shadow-sm"
                    style={{ minHeight: 220 }}
                  >
                    <img
                      src={src}
                      alt={`${branch.name} ${index + 1}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </Col>
              ))}
            </Row>

            <Card className="border-0 shadow-sm rounded-4 bg-light p-4 mb-4">
              <h5 className="fw-bold mb-3">Mô tả cơ sở</h5>
              <p className="text-muted">{branch.description}</p>
            </Card>

            <Card className="border-0 shadow-sm rounded-4 bg-light p-4 mb-4">
              <h5 className="fw-bold mb-3">Dịch vụ tại cơ sở</h5>
              {branchServices.length ? (
                <div className="row g-3">
                  {branchServices.map((service) => (
                    <div key={service.id} className="col-md-6">
                      <div className="p-3 bg-white rounded-4 border h-100">
                        <h6 className="fw-semibold mb-2">{service.name}</h6>
                        <p className="text-muted fs-7 mb-2">
                          {service.description}
                        </p>
                        <div className="text-warning fw-bold">
                          {service.price.toLocaleString()} đ
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Không có dịch vụ nào được liệt kê.</p>
              )}
            </Card>

            <Card className="border-0 shadow-sm rounded-4 bg-light p-4 mb-4">
              <h5 className="fw-bold mb-3">Đội ngũ nhân viên</h5>
              {branchEmployees.length ? (
                <div className="row g-3">
                  {branchEmployees.map((staff) => (
                    <div key={staff.id} className="col-md-6">
                      <div className="p-3 bg-white rounded-4 border h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="rounded-circle"
                            width={50}
                            height={50}
                          />
                          <div>
                            <h6 className="fw-semibold mb-1">{staff.name}</h6>
                            <div className="text-muted fs-7">{staff.role}</div>
                          </div>
                        </div>
                        <div className="text-muted fs-7 mb-2">{staff.bio}</div>
<div className="text-warning fw-semibold">
                          {staff.rating.toFixed(1)} ⭐
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Chưa có nhân viên được liệt kê.</p>
              )}
            </Card>
          </div>

          <div className="col-lg-4">
            <Card className="border-0 shadow-sm rounded-4 bg-light p-4 mb-4">
              <h5 className="fw-bold mb-3">Thông tin cơ bản</h5>
              <div className="text-muted fs-7 mb-3">{branch.address}</div>
              <div className="d-flex align-items-center gap-2 text-muted mb-3">
                <FaPhoneAlt className="text-warning" />
                <span>{branch.phone}</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted mb-3">
                <FaMapMarkerAlt className="text-warning" />
                <span>{branch.city}</span>
              </div>
              <div className="text-muted fs-7 mb-3">
                <strong>Giờ mở cửa:</strong>
              </div>
              <div className="mb-3">
                {Object.entries(branch.openingHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="d-flex justify-content-between fs-7 text-dark"
                  >
                    <span className="text-capitalize">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-0 shadow-sm rounded-4 bg-light p-4 mb-4">
              <h5 className="fw-bold mb-3">Bản đồ</h5>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
                <iframe
                  src={branch.mapEmbed}
                  title={branch.name}
                  allowFullScreen
                  className="border-0 w-100 h-100"
                />
              </div>
            </Card>

            <Card className="border-0 shadow-sm rounded-4 bg-light p-4">
              <h5 className="fw-bold mb-3">Khung giờ còn trống</h5>
              {timeSlots.length ? (
                <div className="d-flex flex-column gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 bg-white rounded-4 border d-flex justify-content-between align-items-center"
                    >
                      <span>{slot.label}</span>
                      <span
                        className={
                          slot.isAvailable ? "text-success" : "text-muted"
                        }
                      >
                        {slot.isAvailable ? "Còn" : "Hết"}
                      </span>
                    </div>
                  ))}
                </div>
) : (
                <p className="text-muted">Không có dữ liệu khung giờ.</p>
              )}

              <Button
                variant="warning"
                className="w-100 text-white fw-bold rounded-pill mt-4"
                onClick={() => navigate(`/booking?branchId=${branch.id}`)}
              >
                Đặt lịch ngay
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BranchDetail;