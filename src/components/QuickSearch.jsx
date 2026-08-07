import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaSearch,
  FaDog,
  FaConciergeBell,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

import api from "../untils/api";
import URL from "../contans/URL";

function QuickSearch(props) {
  const [searchData, setSearchData] = useState(props.searchData || {});
  const [petTypes, setPetTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);

  const [petType, setPetType] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [searchText, setSearchText] = useState("");

  const get_pet_types = async () => {
    const rs = await api.get(URL.PET_TYPES);
    setPetTypes(rs.data);
  };
  const updateSearchData = (data) => {
    props.updateSearchData(data);
  };
  const get_services = async () => {
    const rs = await api.get(URL.SERVICE_CATEGORIES);
    setServices(rs.data);
  };

  const get_branches = async () => {
    const rs = await api.get(URL.BRANCHES);
    setBranches(rs.data);
  };

  useEffect(() => {
    get_pet_types();
    get_services();
    get_branches();
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const searchData = {
      searchText,
      petType,
      serviceId,
      branchId,
      bookingDate,
    };

    updateSearchData(searchData);
  };

  return (
    <Container className="my-4">
      <Card className="border-0 shadow-lg rounded-4 p-3 bg-white">
        <Card.Body>
          <Form onSubmit={submit}>
            <Row className="g-3 align-items-end">
              <Col lg={3} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-secondary d-flex align-items-center gap-2 fs-7">
                    <FaDog className="text-warning" />
                    <span>Loại thú cưng</span>
                  </Form.Label>
                  <Form.Select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="border-light-subtle py-2 shadow-none"
                  >
                    <option value="">-- Tất cả thú cưng --</option>
                    {petTypes.map((item) => (
                      <option key={item.id} value={item.value || item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={2} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-secondary d-flex align-items-center gap-2 fs-7">
                    <FaSearch className="text-warning" />
                    <span>Từ khóa</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên dịch vụ hoặc từ khóa"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border-light-subtle py-2 shadow-none"
                  />
                </Form.Group>
              </Col>

              <Col lg={2} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-secondary d-flex align-items-center gap-2 fs-7">
                    <FaConciergeBell className="text-warning" />
                    <span>Dịch vụ</span>
                  </Form.Label>
                  <Form.Select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="border-light-subtle py-2 shadow-none"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={2} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-secondary d-flex align-items-center gap-2 fs-7">
                    <FaMapMarkerAlt className="text-warning" />
                    <span>Khu vực / Cơ sở</span>
                  </Form.Label>
                  <Form.Select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="border-light-subtle py-2 shadow-none"
                  >
                    <option value="">-- Chọn cơ sở --</option>
                    {branches.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.address}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={2} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-secondary d-flex align-items-center gap-2 fs-7">
                    <FaCalendarAlt className="text-warning" />
                    <span>Ngày đặt</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="border-light-subtle py-2 shadow-none"
                  />
                </Form.Group>
              </Col>

              <Col lg={1} md={12} className="d-grid">
                <Button
                  variant="warning"
                  type="submit"
                  className="text-white fw-bold py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                  style={{ height: "42px" }}
                >
                  <FaSearch />
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default QuickSearch;
