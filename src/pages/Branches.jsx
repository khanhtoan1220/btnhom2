import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaSearch } from "react-icons/fa";

import api from "../untils/api";
import URL from "../contans/URL";

function Branches() {
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const [resBranches, resServices] = await Promise.all([
        api.get(URL.BRANCHES),
        api.get(URL.SERVICES),
      ]);

      setBranches(resBranches.data);
      setServices(resServices.data);
    };

    fetchData();
  }, []);

  const districtOptions = useMemo(() => {
    const setDistricts = new Set(
      branches.map((item) => item.district).filter(Boolean),
    );
    return ["All", ...Array.from(setDistricts)];
  }, [branches]);

  const serviceOptions = useMemo(() => {
    const setServiceIds = new Set(branches.flatMap((item) => item.serviceIds));
    return [
      "All",
      ...Array.from(setServiceIds).map((serviceId) => {
        const service = services.find(
          (item) => String(item.id) === String(serviceId),
        );
        return service ? service.name : serviceId;
      }),
    ];
  }, [branches, services]);

  const filteredBranches = branches.filter((item) => {
    const normalizedQuery = query.trim().toLowerCase();
    const name = String(item.name).toLowerCase();
    const address = String(item.address).toLowerCase();

    const matchQuery =
      !normalizedQuery ||
      [name, address].some((text) => text.includes(normalizedQuery));

    const matchDistrict = district === "All" || item.district === district;

    const matchService =
      serviceFilter === "All" ||
      item.serviceIds?.includes(
        services.find((s) => s.name === serviceFilter).id,
      );

    const matchRating =
      ratingFilter === "All" || Number(item.rating) >= Number(ratingFilter);

    return matchQuery && matchDistrict && matchService && matchRating;
  });

  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div>
            <h6 className="text-warning fw-bold text-uppercase mb-1">
              Danh sách cơ sở
            </h6>
            <h3 className="fw-bold text-dark mb-0">Tìm cơ sở gần bạn</h3>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 w-100 justify-content-end">
            <Form.Control
              type="search"
              placeholder="🔍 Tìm theo tên hoặc địa chỉ"
value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="shadow-sm border-0 rounded-3"
              style={{ minWidth: 260 }}
            />

            <Form.Select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="shadow-sm border-0 rounded-3"
              style={{ minWidth: 160 }}
            >
              {districtOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="shadow-sm border-0 rounded-3"
              style={{ minWidth: 200 }}
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="shadow-sm border-0 rounded-3"
              style={{ minWidth: 140 }}
            >
              <option>All</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
            </Form.Select>
          </div>
        </div>

        <Row className="g-4">
          {filteredBranches.length ? (
            filteredBranches.map((branch) => (
              <Col key={branch.id} lg={4} md={6} sm={12}>
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-light">
                  <div style={{ height: "220px", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={branch.thumbnail}
                      alt={branch.name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <Card.Body className="d-flex flex-column p-4">
                    <h5 className="fw-bold text-dark mb-2">{branch.name}</h5>
                    <div className="text-muted fs-7 mb-2 d-flex align-items-center gap-2">
                      <FaMapMarkerAlt className="text-warning" />
                      {branch.address}
                    </div>
                    <div className="text-muted fs-7 mb-2 d-flex align-items-center gap-2">
                      <FaPhoneAlt className="text-warning" />
                      {branch.phone}
                    </div>
                    <div className="mb-3">
                      <Badge
                        bg="warning"
                        className="text-dark fw-semibold me-2"
                      >
                        {branch.district}
                      </Badge>
<Badge bg="secondary" className="fw-semibold">
                        {branch.rating.toFixed(1)} ⭐
                      </Badge>
                    </div>
                    <div className="flex-grow-1 text-muted fs-7 mb-3">
                      {branch.description}
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={`/branches/${branch.id}`}
                        className="text-decoration-none"
                      >
                        <Button
                          variant="warning"
                          className="w-100 text-white fw-bold rounded-pill py-2"
                        >
                          Xem chi tiết cơ sở
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center py-5 text-muted">
                Không có cơ sở phù hợp.
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Branches;