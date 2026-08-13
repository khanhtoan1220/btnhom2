import React, { useState } from "react";
import api from "../untils/api";
import URL from "../contans/URL";

function BookingLookup() {
  const [searchCode, setSearchCode] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [branch, setBranch] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [canceling, setCanceling] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const codeInput = searchCode.trim().toUpperCase();
    const phoneInput = searchPhone.trim();

    if (!codeInput || !phoneInput) {
      setErrorMsg("Vui lòng nhập đầy đủ Mã đặt lịch và Số điện thoại!");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setBooking(null);
    setSearched(true);
    setCancelSuccessMsg("");
    setShowCancelForm(false);

    try {
      const resBookings = await api.get(URL.BOOKINGS || "/bookings");
      const allBookings = Array.isArray(resBookings.data)
        ? resBookings.data
        : [];

      const foundBooking = allBookings.find((item) => {
        const itemCode = String(item.bookingCode || "")
          .trim()
          .toUpperCase();
        const itemPhone = String(item.customerPhone || item.phone || "").trim();

        return itemCode === codeInput && itemPhone === phoneInput;
      });

      if (!foundBooking) {
        setErrorMsg(
          "Không tìm thấy lịch hẹn phù hợp. Vui lòng kiểm tra lại thông tin!",
        );
        setLoading(false);
        return;
      }

      setBooking(foundBooking);

      const [resServices, resBranches, resEmployees, resTimes] =
        await Promise.all([
          api.get(URL.SERVICES || "/services"),
          api.get(URL.BRANCHES || "/branches"),
          api.get(URL.EMPLOYEES || "/employees"),
          api.get(URL.TIME_SLOTS || "/timeSlots"),
        ]);

      setService(
        resServices.data?.find(
          (s) => String(s.id) === String(foundBooking.serviceId),
        ),
      );
      setBranch(
        resBranches.data?.find(
          (b) => String(b.id) === String(foundBooking.branchId),
        ),
      );
      setEmployee(
        resEmployees.data?.find(
          (e) => String(e.id) === String(foundBooking.employeeId),
        ),
      );
      setTimeSlot(
        resTimes.data?.find(
          (t) => String(t.id) === String(foundBooking.timeSlotId),
        ),
      );
    } catch (err) {
      console.error("Lỗi khi tra cứu lịch hẹn:", err);
      setErrorMsg("Đã xảy ra lỗi hệ thống khi tra cứu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Vui lòng nhập lý do hủy lịch!");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      return;
    }

    setCanceling(true);
    try {
      const updatedData = {
        status: "cancelled",
        cancelReason: cancelReason.trim(),
        updatedAt: new Date().toISOString(),
      };

      await api.patch(
        `${URL.BOOKINGS || "/bookings"}/${booking.id}`,
        updatedData,
      );

      setBooking((prev) => ({
        ...prev,
        ...updatedData,
      }));

      setShowCancelForm(false);
      setCancelReason("");
      setCancelSuccessMsg("🎉 Đã hủy lịch hẹn thành công!");
    } catch (err) {
      console.error("Lỗi khi hủy lịch hẹn:", err);
      alert("Hủy lịch thất bại. Vui lòng thử lại sau!");
    } finally {
      setCanceling(false);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge bg-warning text-dark fs-6">
            ⏳ Chờ xác nhận (Pending)
          </span>
        );
      case "confirmed":
        return <span className="badge bg-primary fs-6">✅ Đã xác nhận</span>;
      case "completed":
        return <span className="badge bg-success fs-6">🎉 Hoàn thành</span>;
      case "cancelled":
        return <span className="badge bg-danger fs-6">❌ Đã hủy</span>;
      default:
        return <span className="badge bg-secondary fs-6">{status}</span>;
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">🔍 Tra cứu lịch hẹn</h2>
        <p className="text-muted">
          Nhập mã đặt lịch và số điện thoại để kiểm tra thông tin lịch hẹn của
          bạn
        </p>
      </div>

      {/* 1. FORM TRA CỨU */}
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body p-4">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Mã đặt lịch *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: PC-20260807-975"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Ví dụ: 0987654321"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary px-5 fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Đang tra cứu...
                  </>
                ) : (
                  "🔍 Tra cứu ngay"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {errorMsg && (
        <div className="alert alert-danger text-center shadow-sm">
          {errorMsg}
        </div>
      )}

      {cancelSuccessMsg && (
        <div className="alert alert-success text-center shadow-sm fw-semibold">
          {cancelSuccessMsg}
        </div>
      )}

      {booking && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted small d-block">MÃ LỊCH HẸN</span>
              <strong className="fs-4 text-primary">
                {booking.bookingCode}
              </strong>
            </div>
            <div>{renderStatusBadge(booking.status)}</div>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              {/* KHÁCH HÀNG & THÚ CƯNG */}
              <div className="col-md-6">
                <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">
                  👤 Khách hàng & Thú cưng
                </h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <strong>Họ tên:</strong> {booking.customerName}
                  </li>
                  <li className="mb-2">
                    <strong>Số điện thoại:</strong> {booking.customerPhone}
                  </li>
                  <li className="mb-2">
                    <strong>Email:</strong> {booking.customerEmail}
                  </li>
                  {booking.customerAddress && (
                    <li className="mb-2">
                      <strong>Địa chỉ:</strong> {booking.customerAddress}
                    </li>
                  )}
                  <hr className="my-2" />
                  <li className="mb-2">
                    <strong>Tên thú cưng:</strong> {booking.petName}
                  </li>
                  <li className="mb-2">
                    <strong>Loại / Giống:</strong> {booking.petType}{" "}
                    {booking.petBreed ? `(${booking.petBreed})` : ""}
                  </li>
                  {(booking.petAge || booking.petWeight) && (
                    <li className="mb-2">
                      <strong>Đặc điểm:</strong>{" "}
                      {booking.petAge ? `${booking.petAge} tuổi` : ""}{" "}
                      {booking.petWeight ? `- ${booking.petWeight} kg` : ""}
                    </li>
                  )}
                </ul>
              </div>

              <div className="col-md-6">
                <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">
                  📅 Dịch vụ & Lịch hẹn
                </h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <strong>Dịch vụ chính:</strong>{" "}
                    <span className="fw-semibold">
                      {service ? service.name : "Đang cập nhật"}
                    </span>
                  </li>
                  {booking.additionalServices &&
                    booking.additionalServices.length > 0 && (
                      <li className="mb-2">
                        <strong>Dịch vụ bổ sung:</strong>{" "}
                        {booking.additionalServices.join(", ")}
                      </li>
                    )}
                  <li className="mb-2">
                    <strong>Cơ sở thực hiện:</strong>{" "}
                    {branch ? branch.name || branch.address : "Pet Care"}
                  </li>
                  {branch?.address && (
                    <li className="mb-2 text-muted small">
                      📍 {branch.address}
                    </li>
                  )}
                  <li className="mb-2">
                    <strong>Ngày hẹn:</strong>{" "}
                    <span className="badge bg-info text-dark fs-6 ms-1">
                      {booking.date}
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Khung giờ:</strong>{" "}
                    <span className="badge bg-warning text-dark fs-6 ms-1">
                      {timeSlot?.label || timeSlot?.time || booking.timeSlotId}
                    </span>
                  </li>
                  {employee && (
                    <li className="mb-2">
                      <strong>Nhân viên:</strong>{" "}
                      {employee.name || employee.fullName}
                    </li>
                  )}
                  <li className="mb-2 mt-3 pt-2 border-top">
                    <strong>Tổng tiền dự kiến:</strong>{" "}
                    <span className="fs-5 fw-bold text-danger">
                      {booking.totalAmount?.toLocaleString("vi-VN")}đ
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {booking.status === "cancelled" && booking.cancelReason && (
              <div className="alert alert-danger mt-4 mb-0">
                <strong>Lý do hủy lịch:</strong> {booking.cancelReason}
              </div>
            )}

            {booking.status === "pending" && !showCancelForm && (
              <div className="mt-4 pt-3 border-top text-end">
                <button
                  type="button"
                  className="btn btn-outline-danger fw-bold"
                  onClick={() => setShowCancelForm(true)}
                >
                  ❌ Hủy lịch hẹn này
                </button>
              </div>
            )}

            {showCancelForm && (
              <div className="card border-danger mt-4 bg-light-subtle">
                <div className="card-body">
                  <h6 className="fw-bold text-danger mb-2">
                    ⚠️ Xác nhận hủy lịch hẹn
                  </h6>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Nhập lý do hủy lịch *:
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Ví dụ: Bận đột xuất, thay đổi kế hoạch..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowCancelForm(false)}
                      disabled={canceling}
                    >
                      Quay lại
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={handleConfirmCancel}
                      disabled={canceling}
                    >
                      {canceling ? "Đang xử lý..." : "Xác nhận hủy"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {searched && !booking && !errorMsg && !loading && (
        <div className="text-center py-4 text-muted">
          Không tìm thấy thông tin lịch hẹn.
        </div>
      )}
    </div>
  );
}

export default BookingLookup;
