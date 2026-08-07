import { useState } from "react";
import { useParams } from "react-router-dom";

function BookingForm() {
    const { serviceId } = useParams();
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

        service: "",
        branch: "",
        staff: "",
        date: "",
        time: "",

        grooming: false,
        nail: false,
        ear: false,

        note: ""
    });

    const [message, setMessage] = useState("");
    const timeSlots = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "13:30",
        "14:30",
        "15:30",
        "16:30"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleTime = (time) => {
        setFormData({
            ...formData,
            time: time
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("Service ID:", serviceId);
        console.log("Booking data:", formData);
        setMessage("Đặt lịch thành công!");
    };

    return (

        <div className="container py-5">      
            <div className="text-center mb-5">
                <h1 className="fw-bold">
                    Đặt lịch dịch vụ
                </h1>
                <p className="text-secondary">
                    Đặt lịch chăm sóc tốt nhất cho thú cưng của bạn
                </p>
            </div>


            <form onSubmit={handleSubmit}>               
                <div className="card shadow-sm mb-4">
                    <div className="card-body p-4">
                        <h4 className="fw-bold mb-4">
                            👤 Thông tin khách hàng
                        </h4>
                        <div className="row">                           
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Họ và tên *
                                </label>
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
                                <label className="form-label">
                                    Số điện thoại *
                                </label>
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
                                <label className="form-label">
                                    Email *
                                </label>
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
                                <label className="form-label">
                                    Địa chỉ
                                </label>
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
                        <h4 className="fw-bold mb-4">
                            🐾 Thông tin thú cưng
                        </h4>
                        <div className="row">                       
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Tên thú cưng *
                                </label>
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
                                <label className="form-label">
                                    Loại thú cưng *
                                </label>
                                <select
                                    className="form-select"
                                    name="petType"
                                    value={formData.petType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        -- Chọn loại --
                                    </option>
                                    <option value="Chó">
                                        🐶 Chó
                                    </option>
                                    <option value="Mèo">
                                        🐱 Mèo
                                    </option>
                                    <option value="Khác">
                                        🐾 Khác
                                    </option>
                                </select>
                            </div>
                           
                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Giống
                                </label>
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
                                <label className="form-label">
                                    Tuổi
                                </label>
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
                                <label className="form-label">
                                    Cân nặng (kg)
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="kg"
                                    min="0"
                                />
                            </div>
                         
                            <div className="col-12 mb-3">
                                <label className="form-label">
                                    Tình trạng cần lưu ý
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="petNote"
                                    value={formData.petNote}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: dị ứng, sợ máy sấy, đang điều trị..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card shadow-sm mb-4">
                    <div className="card-body p-4">
                        <h4 className="fw-bold mb-4">
                            📅 Thông tin lịch hẹn
                        </h4>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Dịch vụ *
                                </label>
                                <select
                                    className="form-select"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        -- Chọn dịch vụ --
                                    </option>
                                    <option value="Tắm và vệ sinh">
                                        Tắm và vệ sinh
                                    </option>
                                    <option value="Cắt tỉa lông">
                                        Cắt tỉa lông
                                    </option>
                                    <option value="Spa thú cưng">
                                        Spa thú cưng
                                    </option>
                                    <option value="Chăm sóc móng">
                                        Chăm sóc móng
                                    </option>
                                    <option value="Khám sức khỏe">
                                        Khám sức khỏe
                                    </option>
                                </select>
                            </div>
                            
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Cơ sở *
                                </label>
                                <select
                                    className="form-select"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        -- Chọn cơ sở --
                                    </option>
                                    <option value="Cơ sở Hà Nội">
                                        Cơ sở Hà Nội
                                    </option>
                                    <option value="Cơ sở Hải Phòng">
                                        Cơ sở Hải Phòng
                                    </option>
                                    <option value="Cơ sở Hồ Chí Minh">
                                        Cơ sở Hồ Chí Minh
                                    </option>
                                </select>
                            </div>
                            
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Nhân viên
                                </label>
                                <select
                                    className="form-select"
                                    name="staff"
                                    value={formData.staff}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Không yêu cầu
                                    </option>
                                    <option value="Nhân viên 1">
                                        Nhân viên 1
                                    </option>
                                    <option value="Nhân viên 2">
                                        Nhân viên 2
                                    </option>
                                    <option value="Nhân viên 3">
                                        Nhân viên 3
                                    </option>
                                </select>
                            </div>
                            
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Ngày hẹn *
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
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
                                {timeSlots.map((time) => (
                                    <button
                                        type="button"
                                        key={time}
                                        className={
                                            formData.time === time
                                                ? "btn btn-primary"
                                                : "btn btn-outline-primary"
                                        }
                                        onClick={() => handleTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                       
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Dịch vụ bổ sung
                            </label>
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
                                        <label
                                            className="form-check-label"
                                            htmlFor="grooming"
                                        >
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
                                        <label
                                            className="form-check-label"
                                            htmlFor="nail"
                                        >
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
                                        <label
                                            className="form-check-label"
                                            htmlFor="ear"
                                        >
                                            Vệ sinh tai
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="mb-3">
                            <label className="form-label">
                                Ghi chú
                            </label>
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
             
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5"
                    >
                        🐾 Đặt lịch
                    </button>
                </div>

                {message && (
                    <div className="alert alert-success text-center mt-4">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default BookingForm;