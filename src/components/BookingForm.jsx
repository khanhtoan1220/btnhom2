import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../untils/api";
import URL from "../contans/URL";

function BookingForm() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate && selectedDate < today) {
      alert(
        "⚠️ Ngày hẹn không được nằm trong quá khứ! Vui lòng chọn từ ngày hôm nay trở đi.",
      );
      setDate("");
      return;
    }

    setDate(selectedDate);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",

    petName: "",
    petType: "",
    breed: "",
    age: "",
    weight: "",
    petNote: "",

    service: serviceId || "",
    branch: "",
    staff: "",
    date: "",
    time: "",

    grooming: false,
    nail: false,
    ear: false,

    note: "",
  });

  const [petTypes, setPetTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [savedVouchers, setSavedVouchers] = useState([]);
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMsg, setVoucherMsg] = useState({ text: "", isError: false });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    try {
      const rawVouchers = localStorage.getItem("my_vouchers");
      if (rawVouchers) {
        const parsed = JSON.parse(rawVouchers);
        setSavedVouchers(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Lỗi đọc mã từ localStorage:", error);
    }

    const fetchData = async () => {
      const [
        resPets,
        resServices,
        resBranches,
        resEmployees,
        resTimes,
        resPromos,
      ] = await Promise.all([
        api.get(URL.PET_TYPES || "/petTypes"),
        api.get(URL.SERVICES || "/services"),
        api.get(URL.BRANCHES || "/branches"),
        api.get(URL.EMPLOYEES || "/employees"),
        api.get(URL.TIME_SLOTS || "/timeSlots"),
        api.get(URL.PROMOTIONS || "/promotions"),
      ]);

      setPetTypes(resPets.data || []);
      setServices(resServices.data || []);
      setBranches(resBranches.data || []);
      setEmployees(resEmployees.data || []);
      setTimeSlots(resTimes.data || []);
      setPromotions(resPromos.data || []);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Chọn khung giờ
  const handleTimeSelect = (slotId) => {
    setFormData({ ...formData, time: slotId });
  };

  // XỬ LÝ ÁP DỤNG MÃ GIẢM GIÁ
  const handleApplyVoucher = (codeToApply) => {
    const code = (codeToApply || voucherInput).trim().toUpperCase();

    if (!code) {
      setVoucherMsg({ text: "Vui lòng nhập hoặc chọn mã!", isError: true });
      return;
    }

    // Đem mã đi tìm trong API promotions
    const found = promotions.find(
      (p) => p.code && p.code.toUpperCase() === code,
    );

    if (found) {
      setAppliedVoucher(found);
      setVoucherInput(found.code);
      setVoucherMsg({
        text: `🎉 Áp dụng thành công mã "${found.code}"!`,
        isError: false,
      });
    } else {
      setAppliedVoucher(null);
      setVoucherMsg({
        text: "❌ Mã giảm giá không hợp lệ hoặc chưa có trong hệ thống!",
        isError: true,
      });
    }
  };

  const handleSelectSavedVoucher = (e) => {
    const selectedCode = e.target.value;
    setVoucherInput(selectedCode);
    if (selectedCode) {
      handleApplyVoucher(selectedCode);
    } else {
      setAppliedVoucher(null);
      setVoucherMsg({ text: "", isError: false });
    }
  };

  const selectedService = services.find(
    (item) => String(item.id) === String(formData.service),
  );
  const servicePrice = selectedService ? Number(selectedService.price) : 0;

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === "percent") {
      discountAmount =
        (servicePrice * Number(appliedVoucher.discountValue)) / 100;
    } else if (appliedVoucher.discountType === "fixed") {
      discountAmount = Number(appliedVoucher.discountValue);
    }
  }

  const finalTotal = Math.max(0, servicePrice - discountAmount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.time) {
      setMessage("⚠️ Vui lòng chọn khung giờ hẹn!");
      setIsSuccess(false);
      return;
    }

    const additionalServices = [];
    if (formData.grooming) additionalServices.push("grooming");
    if (formData.nail) additionalServices.push("nail");
    if (formData.ear) additionalServices.push("ear");

    const newBooking = {
      bookingCode: `PC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,

      petName: formData.petName,
      petType: formData.petType,
      petBreed: formData.breed,
      petAge: Number(formData.age) || 0,
      petWeight: Number(formData.weight) || 0,
      petNotes: formData.petNote,

      serviceId: String(formData.service),
      branchId: String(formData.branch),
      employeeId: formData.staff ? String(formData.staff) : null,
      date: formData.date,
      timeSlotId: String(formData.time),

      additionalServices: additionalServices,
      notes: formData.note,

      voucherCode: appliedVoucher ? appliedVoucher.code : null,
      discountAmount: discountAmount,
      totalAmount: finalTotal,
      status: "pending",
      paymentMethod: "cash",
      paymentStatus: "unpaid",
      cancelReason: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await api.post(URL.BOOKINGS || "/bookings", newBooking);
      setMessage("🎉 Đặt lịch thành công! Cảm ơn bạn đã tin tưởng dịch vụ.");
      setIsSuccess(true);
      navigate(`/booking-success/${newBooking.bookingCode}`);
    } catch (error) {
      console.error("Lỗi khi gửi đơn đặt lịch:", error);
      setMessage("❌ Đã có lỗi xảy ra. Vui lòng thử lại!");
      setIsSuccess(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Đặt lịch dịch vụ</h1>
        <p className="text-secondary">
          Đặt lịch chăm sóc tốt nhất cho thú cưng của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4">👤 Thông tin khách hàng</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Họ và tên *</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số điện thoại *</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4">🐾 Thông tin thú cưng</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tên thú cưng *</label>
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  placeholder="Ví dụ: Bông, Miu..."
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Loại thú cưng *</label>
                <select
                  className="form-select"
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn loại thú cưng --</option>
                  {petTypes.map((item) => (
                    <option key={item.id} value={item.value || item.id}>
                      {item.name || item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Giống</label>
                <input
                  type="text"
                  className="form-control"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Ví dụ: Poodle"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Tuổi</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Tuổi"
                  min="0"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Cân nặng (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="kg"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Tình trạng cần lưu ý</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="petNote"
                  value={formData.petNote}
                  onChange={handleChange}
                  placeholder="Ví dụ: dị ứng, sợ máy sấy..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4">📅 Thông tin lịch hẹn</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Dịch vụ *</label>
                <select
                  className="form-select"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {services.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}{" "}
                      {item.price
                        ? `(${Number(item.price).toLocaleString("vi-VN")}đ)`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Cơ sở *</label>
                <select
                  className="form-select"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn cơ sở --</option>
                  {branches.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name || item.address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nhân viên</label>
                <select
                  className="form-select"
                  name="staff"
                  value={formData.staff}
                  onChange={handleChange}
                >
                  <option value="">-- Không yêu cầu --</option>
                  {employees.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name || item.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày hẹn *</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Khung giờ còn trống *
              </label>
              <div className="d-flex flex-wrap gap-2">
                {timeSlots.length > 0 ? (
                  timeSlots.map((item) => {
                    const isSelected =
                      String(formData.time) === String(item.id);
                    const isDisabled = item.isAvailable === false;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        disabled={isDisabled}
                        className={`btn ${
                          isSelected
                            ? "btn-primary fw-bold"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => handleTimeSelect(item.id)}
                      >
                        {item.label || item.time}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-muted">Đang tải khung giờ...</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Dịch vụ bổ sung</label>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="grooming"
                      checked={formData.grooming}
                      onChange={handleChange}
                      id="grooming"
                    />
                    <label className="form-check-label" htmlFor="grooming">
                      Chải lông
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="nail"
                      checked={formData.nail}
                      onChange={handleChange}
                      id="nail"
                    />
                    <label className="form-check-label" htmlFor="nail">
                      Cắt móng
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="ear"
                      checked={formData.ear}
                      onChange={handleChange}
                      id="ear"
                    />
                    <label className="form-check-label" htmlFor="ear">
                      Vệ sinh tai
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Ghi chú</label>
              <textarea
                className="form-control"
                rows="4"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Nhập ghi chú cho nhân viên..."
              />
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-3">🎁 Mã giảm giá</h4>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Chọn từ mã đã lưu của bạn
                </label>
                <select
                  className="form-select"
                  onChange={handleSelectSavedVoucher}
                  value={voucherInput}
                >
                  <option value="">-- Chọn mã đã lưu --</option>
                  {savedVouchers.length > 0 ? (
                    savedVouchers.map((code, index) => (
                      <option key={index} value={code}>
                        {code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Chưa có mã nào trong kho lưu trữ</option>
                  )}
                </select>
              </div>

              {/* Ô Nhập mã thủ công */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Hoặc nhập mã thủ công
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ví dụ: SUMMER20"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => handleApplyVoucher()}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>

            {voucherMsg.text && (
              <div
                className={`mt-2 fw-semibold ${
                  voucherMsg.isError ? "text-danger" : "text-success"
                }`}
              >
                {voucherMsg.text}
              </div>
            )}

            <div className="border-top mt-4 pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Giá dịch vụ gốc:</span>
                <span className="fw-semibold">
                  {servicePrice.toLocaleString("vi-VN")}đ
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Giảm giá ({appliedVoucher?.code}):</span>
                  <span className="fw-semibold">
                    -{discountAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}

              <div className="d-flex justify-content-between fs-5 fw-bold text-danger border-top pt-2">
                <span>Tổng thanh toán:</span>
                <span>{finalTotal.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold">
            🐾 Đặt lịch ngay
          </button>
        </div>

        {message && (
          <div
            className={`alert ${
              isSuccess ? "alert-success" : "alert-danger"
            } text-center mt-4 fs-5`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
