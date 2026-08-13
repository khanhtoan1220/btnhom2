import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../untils/api";
import URL from "../contans/URL";

function BookingSuccess() {
  const { bookingCode } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [branch, setBranch] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);

        const resBooking = await api.get(
          `${URL.BOOKINGS || "/bookings"}?bookingCode=${bookingCode}`,
        );

        const bookingData = Array.isArray(resBooking.data)
          ? resBooking.data[0]
          : resBooking.data;

        if (!bookingData) {
          setError("Không tìm thấy mã đặt lịch hợp lệ!");
          setLoading(false);
          return;
        }

        setBooking(bookingData);

        // 2. Song song lấy thông tin chi tiết của Dịch vụ, Cơ sở, Nhân viên, Khung giờ
        const [resServices, resBranches, resEmployees, resTimes] =
          await Promise.all([
            api.get(URL.SERVICES || "/services"),
            api.get(URL.BRANCHES || "/branches"),
            api.get(URL.EMPLOYEES || "/employees"),
            api.get(URL.TIME_SLOTS || "/timeSlots"),
          ]);

        const foundService = resServices.data?.find(
          (s) => String(s.id) === String(bookingData.serviceId),
        );
        const foundBranch = resBranches.data?.find(
          (b) => String(b.id) === String(bookingData.branchId),
        );
        const foundEmployee = resEmployees.data?.find(
          (e) => String(e.id) === String(bookingData.employeeId),
        );
        const foundSlot = resTimes.data?.find(
          (t) => String(t.id) === String(bookingData.timeSlotId),
        );

        setService(foundService);
        setBranch(foundBranch);
        setEmployee(foundEmployee);
        setTimeSlot(foundSlot);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết lịch hẹn:", err);
        setError("Không thể tải thông tin lịch hẹn. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };

    if (bookingCode) {
      fetchBookingDetails();
    }
  }, [bookingCode]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary my-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="fs-5 text-muted">Đang lấy thông tin đặt lịch...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger py-4 shadow-sm rounded-3">
          <h4>❌ Lỗi</h4>
          <p className="mb-3">{error || "Dữ liệu không tồn tại!"}</p>
          <Link to="/" className="btn btn-primary fw-bold">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      <div className="card shadow-sm text-center mb-4 border-0 bg-light-subtle">
        <div className="card-body p-4 p-md-5">
          <div className="display-1 text-success mb-2">🎉</div>
          <h2 className="fw-bold text-success mb-2">Đặt lịch thành công!</h2>
          <p className="text-muted fs-6 mb-4">
            Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ tại Pet Care.
          </p>

          <div className="bg-white border rounded-3 p-3 d-inline-block shadow-sm">
            <span className="text-muted d-block small uppercase fw-bold">
              MÃ ĐẶT LỊCH CỦA BẠN
            </span>
            <span className="fs-3 fw-bold text-primary tracking-wider">
              {booking.bookingCode}
            </span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">
                👤 Thông tin khách hàng
              </h5>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <strong>Họ và tên:</strong> {booking.customerName}
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
              </ul>

              <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">
                🐾 Thông tin thú cưng
              </h5>
              <ul className="list-unstyled mb-0">
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
                {booking.petNotes && (
                  <li className="mb-2 text-secondary">
                    <strong>Lưu ý thêm:</strong> {booking.petNotes}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">
                📅 Dịch vụ & Lịch hẹn
              </h5>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <strong>Dịch vụ chính:</strong>{" "}
                  <span className="fw-semibold text-dark">
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
                  {branch ? branch.name || branch.address : "Cơ sở Pet Care"}
                </li>
                {branch?.address && (
                  <li className="mb-2 text-muted small">📍 {branch.address}</li>
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
                    <strong>Nhân viên phụ trách:</strong>{" "}
                    {employee.name || employee.fullName}
                  </li>
                )}
              </ul>

              <div className="bg-light p-3 rounded-3 border">
                <div className="d-flex justify-content-between mb-1">
                  <span>Giá dịch vụ:</span>
                  <span>
                    {(service?.price
                      ? Number(service.price)
                      : booking.totalAmount + (booking.discountAmount || 0)
                    ).toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-1 text-success">
                    <span>Mã giảm giá ({booking.voucherCode}):</span>
                    <span>
                      -{booking.discountAmount.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                )}
                <div className="d-flex justify-content-between fs-5 fw-bold text-danger border-top pt-2 mt-2">
                  <span>Tổng tiền dự kiến:</span>
                  <span>{booking.totalAmount?.toLocaleString("vi-VN")}đ</span>
                </div>
                <small className="text-muted d-block mt-1">
                  * Thanh toán trực tiếp tại cơ sở sau khi hoàn thành dịch vụ.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm my-4 border-warning border-start border-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-warning-emphasis mb-3">
            💡 Hướng dẫn dành cho khách hàng khi đến cơ sở
          </h5>
          <div className="row g-3">
            <div className="col-md-6 d-flex align-items-start">
              <span className="me-2 fs-5">⏰</span>
              <div>
                <strong>Đến đúng giờ:</strong> Quý khách vui lòng đến trước{" "}
                <strong>5 - 10 phút</strong> so với khung giờ đã đăng ký để hoàn
                tất thủ tục đón nhận bé.
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-start">
              <span className="me-2 fs-5">🎫</span>
              <div>
                <strong>Xác nhận lịch hẹn:</strong> Vui lòng xuất trình{" "}
                <strong>Mã đặt lịch ({booking.bookingCode})</strong> hoặc SĐT
                cho lễ tân khi làm thủ tục.
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-start">
              <span className="me-2 fs-5">🐕</span>
              <div>
                <strong>An toàn cho thú cưng:</strong> Hãy đeo xích/vòng cổ đối
                với chó hoặc dùng lồng/túi vận chuyển đối với mèo.
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-start">
              <span className="me-2 fs-5">📞</span>
              <div>
                <strong>Thay đổi / Hủy lịch:</strong> Nếu có thay đổi đột xuất,
                vui lòng liên hệ hotline cơ sở trước ít nhất 1 tiếng.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/" className="btn btn-outline-secondary px-4 fw-semibold">
          🏠 Về trang chủ
        </Link>
        <button
          onClick={() => window.print()}
          className="btn btn-primary px-4 fw-bold"
        >
          🖨️ In phiếu xác nhận
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;
