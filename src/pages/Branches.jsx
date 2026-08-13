import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Phone,
  Search,
  Star,
  Stethoscope,
  X,
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const SERVICE_PACKAGES = [
  {
    id: '1',
    name: 'Tắm & Cắt Tỉa Lông Toàn Diện',
    shortName: 'Tắm & Cắt Tỉa Lông',
    icon: '✂️',
  },
  {
    id: '5',
    name: 'Khám Sức Khỏe Định Kỳ',
    shortName: 'Khám Sức Khỏe',
    icon: '🩺',
  },
  {
    id: '3',
    name: 'Tắm Spa Thư Giãn & Khử Mùi Cho Mèo',
    shortName: 'Spa & Khử Mùi Mèo',
    icon: '🐱',
  },
  {
    id: '7',
    name: 'Khách Sạn Thú Cưng VIP (1 Ngày Đêm)',
    shortName: 'Khách Sạn VIP',
    icon: '🏨',
  },
  {
    id: '6',
    name: 'Tiêm Vắc-Xin & Tẩy Giun Trọn Gói',
    shortName: 'Vắc-Xin & Tẩy Giun',
    icon: '💉',
  },
  {
    id: '12',
    name: 'Cắt Mài Móng & Vệ Sinh Tai Chuyên Sâu',
    shortName: 'Móng & Vệ Sinh Tai',
    icon: '🐾',
  },
  {
    id: '8',
    name: 'Huấn Luyện Lệnh Cơ Bản Cho Chó',
    shortName: 'Huấn Luyện Chó',
    icon: '🐶',
  },
]
const BRANCH_CONFIG = [
  {
    dbBranchId: '5',
    name: 'Cơ sở Long Biên',
    district: 'Long Biên',
    address: '56 Nguyễn Văn Cừ, Long Biên, Hà Nội',
    description:
      'Cơ sở Long Biên có không gian rộng rãi, thuận tiện cho khách hàng khu vực phía Đông Hà Nội. Cơ sở phù hợp cho chăm sóc, làm đẹp, khám sức khỏe và huấn luyện thú cưng.',
    phone: '024 3456 7890',
    email: 'longbien@petcare.vn',
    fallbackImage: '/images/cs1.jpg',
  },
  {
    dbBranchId: '6',
    name: 'Cơ sở Nguyễn Trãi',
    district: 'Thanh Xuân',
    address: '302 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    description:
      'Cơ sở Nguyễn Trãi sở hữu không gian hiện đại, thân thiện và thuận tiện đặt lịch online. Đây là lựa chọn phù hợp cho các dịch vụ khám, spa và chăm sóc toàn diện.',
    phone: '024 3678 9012',
    email: 'nguyentrai@petcare.vn',
    fallbackImage: '/images/cs2.webp',
  },
  {
    dbBranchId: '1',
    name: 'Cơ sở Cầu Giấy',
    district: 'Cầu Giấy',
    address: '123 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    description:
      'Cơ sở Cầu Giấy là một trong những cơ sở quy mô lớn, có phòng khám riêng biệt, thiết bị hiện đại và khu vực chăm sóc thú cưng chuyên nghiệp.',
    phone: '024 3789 1234',
    email: 'caugiay@petcare.vn',
    fallbackImage: '/images/cs3.jpg',
  },
  {
    dbBranchId: '4',
    name: 'Cơ sở Hà Tây',
    district: 'Hà Tây',
    address: 'Khu vực Hà Tây, Hà Nội',
    description:
      'Cơ sở Hà Tây phục vụ khách hàng khu vực phía Tây Hà Nội với các gói chăm sóc, làm đẹp, y tế, lưu trú và huấn luyện thú cưng.',
    phone: '024 3890 2345',
    email: 'hatay@petcare.vn',
    fallbackImage: '/images/cs4.jpg',
  },
  {
    dbBranchId: '3',
    name: 'Cơ sở Nam Từ Liêm',
    district: 'Nam Từ Liêm',
    address: 'Khu vực Nam Từ Liêm, Hà Nội',
    description:
      'Cơ sở Nam Từ Liêm hướng đến trải nghiệm chăm sóc thú cưng tiện lợi, sạch sẽ và chuyên nghiệp, phù hợp cho cả chó và mèo.',
    phone: '024 3212 5678',
    email: 'namtuliem@petcare.vn',
    fallbackImage: '/images/cs5.jpg',
  },
  {
    dbBranchId: '2',
    name: 'Cơ sở Đông Anh',
    district: 'Đông Anh',
    address: 'Khu vực Đông Anh, Hà Nội',
    description:
      'Cơ sở Đông Anh mang đến các gói dịch vụ thiết yếu cho thú cưng, giúp khách hàng dễ dàng lựa chọn lịch khám và chăm sóc phù hợp.',
    phone: '024 3567 8901',
    email: 'donganh@petcare.vn',
    fallbackImage: '/images/cs6.png',
  },
]

const DAY_KEYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

const PET_TYPES = [
  { value: 'dog', label: 'Chó' },
  { value: 'cat', label: 'Mèo' },
]

const money = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) throw new Error(`Không thể tải ${path} (HTTP ${response.status})`)
  return response.json()
}

async function postJson(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Không thể lưu lịch đặt (HTTP ${response.status})`)
  return response.json()
}

function today() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

function dayName(date) {
  return date ? DAY_KEYS[new Date(`${date}T12:00:00`).getDay()] : ''
}

function createBookingCode() {
  const date = today().replaceAll('-', '')
  return `PC-${date}-${Math.floor(100 + Math.random() * 900)}`
}

function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="branches-modal-backdrop" onMouseDown={onClose}>
      <div
        className={`branches-modal ${wide ? 'branches-modal-wide' : ''}`}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="branches-modal-header">
          <h2>{title}</h2>
          <button className="branches-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function BranchCard({ branch, image, onBook, onDetail }) {
  return (
    <article className="branch-card">
      <div className="branch-image-wrap">
        <img
          src={image || branch.fallbackImage}
          alt={branch.name}
          className="branch-image"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="branch-rating">
          <Star size={15} fill="currentColor" />
          {branch.rating || '4.7'}
        </div>
      </div>

      <div className="branch-card-body">
        <span className="branch-location">{branch.district}</span>
        <h2>{branch.name}</h2>
        <p className="branch-description">{branch.description}</p>

        <div className="branch-meta">
          <span>
            <MapPin size={16} />
            {branch.address}
          </span>
          <span>
            <Phone size={16} />
            {branch.phone}
          </span>
        </div>

        <div className="package-title">Gói dịch vụ tại cơ sở</div>
        <div className="package-list">
          {SERVICE_PACKAGES.map((service) => (
            <span className="package-chip" key={service.id}>
              <b>{service.icon}</b>
              {service.name}
            </span>
          ))}
        </div>

        <div className="branch-actions">
          <button className="detail-button" type="button" onClick={onDetail}>
            Xem chi tiết <ChevronRight size={17} />
          </button>

          <button className="book-button" type="button" onClick={onBook}>
            <CalendarDays size={18} />
            Đặt lịch
          </button>
        </div>
      </div>
    </article>
  )
}

function BookingModal({ branch, services, employees, timeSlots, bookings, onClose, onSuccess }) {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    petName: '',
    petType: 'dog',
    petBreed: '',
    petAge: '',
    petWeight: '',
    petNotes: '',
    serviceId: services[0]?.id || '1',
    employeeId: '',
    date: today(),
    timeSlotId: timeSlots[0]?.id || '',
    notes: '',
    paymentMethod: 'cash',
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const availableServices = useMemo(() => {
    const ids = services.map((item) => String(item.id))
    return SERVICE_PACKAGES.filter((item) => ids.includes(String(item.id))).length
      ? SERVICE_PACKAGES.filter((item) => ids.includes(String(item.id)))
      : SERVICE_PACKAGES
  }, [services])

  const selectedService = services.find((item) => String(item.id) === String(form.serviceId))

  const branchEmployees = employees.filter((employee) =>
    String(employee.branchId) === String(branch.dbBranchId),
  )

  const availableEmployees = branchEmployees.filter((employee) => {
    const worksToday =
      !employee.workingDays?.length || employee.workingDays.includes(dayName(form.date))

    const servesService =
      !employee.serviceIds?.length ||
      employee.serviceIds.map(String).includes(String(form.serviceId))

    return worksToday && servesService
  })

  const occupiedSlots = new Set(
    bookings
      .filter(
        (booking) =>
          String(booking.branchId) === String(branch.dbBranchId) &&
          booking.date === form.date &&
          ['pending', 'confirmed'].includes(booking.status),
      )
      .map((booking) => String(booking.timeSlotId)),
  )

  const availableSlots = timeSlots.filter((slot) => !occupiedSlots.has(String(slot.id)))

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.customerName || !form.customerPhone || !form.petName) {
      setError('Vui lòng nhập họ tên, số điện thoại và tên thú cưng.')
      return
    }

    if (!form.serviceId || !form.date || !form.timeSlotId) {
      setError('Vui lòng chọn dịch vụ, ngày và khung giờ.')
      return
    }

    setSubmitting(true)

    try {
      const booking = await postJson('/bookings', {
        bookingCode: createBookingCode(),
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        customerAddress: form.customerAddress,
        petName: form.petName,
        petType: form.petType,
        petBreed: form.petBreed,
        petAge: Number(form.petAge) || 0,
        petWeight: Number(form.petWeight) || 0,
        petNotes: form.petNotes,
        serviceId: String(form.serviceId),
        branchId: String(branch.dbBranchId),
        employeeId: form.employeeId || null,
        date: form.date,
        timeSlotId: String(form.timeSlotId),
        additionalServices: [],
        notes: form.notes,
        totalAmount:
          Number(selectedService?.discountPrice ?? selectedService?.price ?? 0) || 0,
        status: 'pending',
        paymentMethod: form.paymentMethod,
        paymentStatus: 'unpaid',
        cancelReason: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      onSuccess(booking)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Không thể đặt lịch. Hãy kiểm tra json-server.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={`Đặt lịch tại ${branch.name}`} onClose={onClose} wide>
      <form className="booking-form" onSubmit={submit}>
        <div className="booking-note">
          <CheckCircle2 size={18} />
          Chọn một trong 7 gói dịch vụ được cung cấp tại cơ sở.
        </div>

        <div className="booking-section">
          <h3>1. Chọn dịch vụ</h3>
          <div className="service-radio-grid">
            {availableServices.map((service) => (
              <label
                className={`service-radio ${
                  String(form.serviceId) === String(service.id) ? 'selected' : ''
                }`}
                key={service.id}
              >
                <input
                  type="radio"
                  name="service"
                  value={service.id}
                  checked={String(form.serviceId) === String(service.id)}
                  onChange={(e) => update('serviceId', e.target.value)}
                />
                <span>{service.icon}</span>
                <b>{service.name}</b>
              </label>
            ))}
          </div>
        </div>

        <div className="booking-section">
          <h3>2. Ngày và khung giờ</h3>
          <div className="form-grid">
            <label>
              Ngày đặt lịch
              <input
                type="date"
                min={today()}
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                required
              />
            </label>

            <label>
              Khung giờ
              <select
                value={form.timeSlotId}
                onChange={(e) => update('timeSlotId', e.target.value)}
                required
              >
                <option value="">Chọn khung giờ</option>
                {availableSlots.map((slot) => (
                  <option value={slot.id} key={slot.id}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Nhân viên / bác sĩ
              <select
                value={form.employeeId}
                onChange={(e) => update('employeeId', e.target.value)}
              >
                <option value="">Hệ thống tự phân công</option>
                {availableEmployees.map((employee) => (
                  <option value={employee.id} key={employee.id}>
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="booking-section">
          <h3>3. Thông tin khách hàng</h3>
          <div className="form-grid">
            <label>
              Họ và tên *
              <input
                value={form.customerName}
                onChange={(e) => update('customerName', e.target.value)}
                required
              />
            </label>
            <label>
              Số điện thoại *
              <input
                value={form.customerPhone}
                onChange={(e) => update('customerPhone', e.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => update('customerEmail', e.target.value)}
              />
            </label>
            <label>
              Địa chỉ
              <input
                value={form.customerAddress}
                onChange={(e) => update('customerAddress', e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="booking-section">
          <h3>4. Thông tin thú cưng</h3>
          <div className="form-grid">
            <label>
              Tên thú cưng *
              <input
                value={form.petName}
                onChange={(e) => update('petName', e.target.value)}
                required
              />
            </label>
            <label>
              Loài
              <select value={form.petType} onChange={(e) => update('petType', e.target.value)}>
                {PET_TYPES.map((type) => (
                  <option value={type.value} key={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Giống
              <input
                value={form.petBreed}
                onChange={(e) => update('petBreed', e.target.value)}
              />
            </label>
            <label>
              Tuổi
              <input
                type="number"
                min="0"
                value={form.petAge}
                onChange={(e) => update('petAge', e.target.value)}
              />
            </label>
            <label>
              Cân nặng (kg)
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.petWeight}
                onChange={(e) => update('petWeight', e.target.value)}
              />
            </label>
            <label>
              Phương thức thanh toán
              <select
                value={form.paymentMethod}
                onChange={(e) => update('paymentMethod', e.target.value)}
              >
                <option value="cash">Tiền mặt tại cơ sở</option>
                <option value="transfer">Chuyển khoản</option>
              </select>
            </label>
          </div>

          <label>
            Lưu ý về thú cưng
            <textarea
              rows="3"
              value={form.petNotes}
              onChange={(e) => update('petNotes', e.target.value)}
              placeholder="Tình trạng sức khỏe, tính cách, dị ứng..."
            />
          </label>
        </div>

        <label>
          Ghi chú đặt lịch
          <textarea
            rows="3"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Yêu cầu thêm của bạn..."
          />
        </label>

        {selectedService && (
          <div className="booking-total">
            <span>Dự kiến từ</span>
            <strong>{money(selectedService.discountPrice ?? selectedService.price)}</strong>
          </div>
        )}

        {error && <div className="form-error">{error}</div>}

        <div className="booking-footer">
          <button type="button" className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="book-button large" type="submit" disabled={submitting}>
            <CalendarDays size={18} />
            {submitting ? 'Đang đặt lịch...' : 'Xác nhận đặt lịch'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function DetailModal({ branch, image, onClose, onBook }) {
  return (
    <Modal title={branch.name} onClose={onClose} wide>
      <div className="detail-layout">
        <div>
          <img className="detail-image" src={image || branch.fallbackImage} alt={branch.name} />
        </div>

        <div>
          <div className="detail-rating">
            <Star size={17} fill="currentColor" />
            <strong>{branch.rating || '4.7'}</strong>
            <span>Đánh giá khách hàng</span>
          </div>

          <p className="detail-description">{branch.description}</p>

          <div className="detail-contact">
            <span><MapPin size={17} /> {branch.address}</span>
            <span><Phone size={17} /> {branch.phone}</span>
            {branch.openingHours?.monday && (
              <span><Clock3 size={17} /> Thứ 2: {branch.openingHours.monday}</span>
            )}
          </div>

          <h3 className="detail-heading">7 gói dịch vụ tại cơ sở</h3>

          <div className="detail-services">
            {SERVICE_PACKAGES.map((service) => (
              <div className="detail-service" key={service.id}>
                <span className="detail-service-icon">{service.icon}</span>
                <div>
                  <strong>{service.name}</strong>
                  <p>Đặt lịch trực tiếp tại {branch.name}.</p>
                </div>
              </div>
            ))}
          </div>

          <button className="book-button detail-book" onClick={onBook} type="button">
            <CalendarDays size={19} />
            Đặt lịch tại cơ sở này
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default function Branches() {
  const [dbBranches, setDbBranches] = useState([])
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [bookingBranch, setBookingBranch] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    let mounted = true

    Promise.all([
      getJson('/branches?isActive=true'),
      getJson('/services?isActive=true'),
      getJson('/employees?isActive=true'),
      getJson('/timeSlots?isAvailable=true'),
      getJson('/bookings'),
    ])
      .then(([branchData, serviceData, employeeData, slotData, bookingData]) => {
        if (!mounted) return
        setDbBranches(Array.isArray(branchData) ? branchData : [])
        setServices(Array.isArray(serviceData) ? serviceData : [])
        setEmployees(Array.isArray(employeeData) ? employeeData : [])
        setTimeSlots(Array.isArray(slotData) ? slotData : [])
        setBookings(Array.isArray(bookingData) ? bookingData : [])
      })
      .catch((err) => {
        if (mounted) {
          setError(
            `${err instanceof Error ? err.message : 'Không thể tải dữ liệu.'} Kiểm tra json-server tại ${API_BASE}.`,
          )
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const branches = useMemo(
    () =>
      BRANCH_CONFIG.map((config) => {
        const dbBranch = dbBranches.find(
          (item) => String(item.id) === String(config.dbBranchId),
        )

        return {
          ...config,
          ...dbBranch,
          dbBranchId: config.dbBranchId,
          name: config.name,
          district: config.district,
          address: config.address,
          description: config.description,
          phone: config.phone,
          email: config.email,
        }
      }),
    [dbBranches],
  )

  const filteredBranches = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    if (!keyword) return branches

    return branches.filter((branch) =>
      [branch.name, branch.district, branch.address, branch.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    )
  }, [branches, query])

  const getImage = (branch) => branch.fallbackImage

  const openBooking = (branch) => {
    setSelectedBranch(null)
    setBookingBranch(branch)
  }

  return (
    <main className="branches-page">
      <style>{styles}</style>

      <section className="branches-hero">
        <div>
          <span className="branches-eyebrow">PETCARE • 6 CƠ SỞ</span>
          <h1>Chọn cơ sở khám & chăm sóc thú cưng</h1>
          <p>
            Tìm cơ sở gần bạn và đặt lịch nhanh chóng cho các gói khám sức khỏe,
            spa, vệ sinh, lưu trú và huấn luyện thú cưng.
          </p>
        </div>

        <div className="hero-number">
          <strong>6</strong>
          <span>cơ sở</span>
        </div>
      </section>

      <section className="branches-toolbar">
        <div className="search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm cơ sở Long Biên, Nguyễn Trãi, Cầu Giấy..."
            aria-label="Tìm kiếm cơ sở"
          />
        </div>
      </section>

      {loading && <div className="branches-state">Đang tải dữ liệu cơ sở...</div>}

      {!loading && error && (
        <div className="branches-state branches-error">
          {error}
          <br />
          Giao diện vẫn có thể hiển thị 6 cơ sở, nhưng chức năng lưu đặt lịch cần json-server.
        </div>
      )}

      {!loading && filteredBranches.length === 0 && (
        <div className="branches-state">Không tìm thấy cơ sở phù hợp.</div>
      )}

      <section className="branches-grid">
        {filteredBranches.map((branch) => (
          <BranchCard
            key={branch.dbBranchId}
            branch={branch}
            image={getImage(branch)}
            onDetail={() => setSelectedBranch(branch)}
            onBook={() => openBooking(branch)}
          />
        ))}
      </section>

      {selectedBranch && (
        <DetailModal
          branch={selectedBranch}
          image={getImage(selectedBranch)}
          onClose={() => setSelectedBranch(null)}
          onBook={() => openBooking(selectedBranch)}
        />
      )}

      {bookingBranch && (
        <BookingModal
          branch={bookingBranch}
          services={services}
          employees={employees}
          timeSlots={timeSlots}
          bookings={bookings}
          onClose={() => setBookingBranch(null)}
          onSuccess={(booking) => {
            setBookingBranch(null)
            setSuccess(booking)
            setBookings((current) => [...current, booking])
          }}
        />
      )}

      {success && (
        <Modal title="Đặt lịch thành công" onClose={() => setSuccess(null)}>
          <div className="success-box">
            <CheckCircle2 size={54} />
            <h3>Đã tiếp nhận yêu cầu đặt lịch</h3>
            <p>Vui lòng lưu mã đặt lịch để tra cứu sau.</p>
            <div className="booking-code">{success.bookingCode}</div>
            <p>
              Cơ sở: <strong>{branches.find((b) => String(b.dbBranchId) === String(success.branchId))?.name}</strong>
            </p>
            <button className="book-button large" onClick={() => setSuccess(null)} type="button">
              Đóng
            </button>
          </div>
        </Modal>
      )}
    </main>
  )
}

const styles = `
.branches-page{min-height:100vh;background:#f7faf9;color:#17211d;padding:36px 5%;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.branches-hero{max-width:1250px;margin:0 auto 28px;background:linear-gradient(135deg,#fff4c2,#fffdf3);border:1px solid #f1df9b;border-radius:24px;padding:38px;display:flex;justify-content:space-between;align-items:center;gap:25px}
.branches-eyebrow{font-size:13px;font-weight:800;color:#15905d;letter-spacing:1.3px}
.branches-hero h1{font-size:clamp(30px,4vw,48px);line-height:1.08;margin:10px 0 12px}
.branches-hero p{max-width:760px;color:#60716a;font-size:16px;line-height:1.7;margin:0}
.hero-number{min-width:135px;height:135px;border-radius:50%;background:#f4b400;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 15px 35px rgba(244,180,0,.2)}
.hero-number strong{font-size:48px;line-height:1}
.hero-number span{font-size:14px;margin-top:5px}
.branches-toolbar{max-width:1250px;margin:0 auto 22px;display:flex;gap:14px}
.search-box{background:#fff;border:1px solid #dce7e2;border-radius:14px;padding:0 15px;display:flex;align-items:center;gap:10px;max-width:680px;width:100%;height:50px;color:#668076}
.search-box input{border:0;outline:0;width:100%;font-size:15px;background:transparent}
.branches-grid{max-width:1250px;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.branch-card{background:#fff;border:1px solid #e2ebe7;border-radius:20px;overflow:hidden;box-shadow:0 8px 25px rgba(20,48,37,.05);transition:.2s}
.branch-card:hover{transform:translateY(-3px);box-shadow:0 14px 35px rgba(20,48,37,.09)}
.branch-image-wrap{
  height:280px;
  position:relative;
  background:#fff8df;
  overflow:hidden;
}

.branch-image{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center top;
  display:block;
}
.branch-rating{position:absolute;right:14px;top:14px;background:#fff;padding:7px 10px;border-radius:99px;display:flex;align-items:center;gap:5px;color:#dc9a00;font-weight:800;box-shadow:0 5px 15px rgba(0,0,0,.1)}
.branch-card-body{padding:23px}
.branch-location{font-size:12px;color:#15905d;text-transform:uppercase;font-weight:800;letter-spacing:.8px}
.branch-card h2{margin:7px 0 9px;font-size:24px}
.branch-description{color:#687970;line-height:1.6;min-height:75px;margin:0 0 14px}
.branch-meta{display:grid;gap:8px;color:#50635a;font-size:14px;margin-bottom:18px}
.branch-meta span,.detail-contact span{display:flex;gap:8px;align-items:flex-start}
.package-title{font-weight:800;font-size:15px;margin-bottom:10px}
.package-list{display:flex;flex-wrap:wrap;gap:7px}
.package-chip{display:inline-flex;align-items:center;gap:5px;padding:7px 9px;border:1px solid #e1ece7;background:#f8fcfa;border-radius:9px;font-size:12px;color:#3d5349;line-height:1.3}
.package-chip b{font-size:14px}
.branch-actions{display:flex;gap:10px;margin-top:20px}
.detail-button,.book-button,.cancel-button{border:0;border-radius:11px;padding:12px 15px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:7px}
.detail-button{background:#edf5f1;color:#176d4b;flex:1}
.book-button{background:#16895b;color:#fff;flex:1;box-shadow:0 8px 18px rgba(22,137,91,.16)}
.book-button:hover{background:#10764d}
.book-button:disabled{opacity:.6;cursor:not-allowed}
.book-button.large{padding:13px 20px}
.branches-state{max-width:1250px;margin:30px auto;padding:24px;border-radius:15px;background:#fff;border:1px solid #e1ebe6;text-align:center;color:#62736b}
.branches-error{color:#a94442;border-color:#f0cccc;background:#fff7f7}
.branches-modal-backdrop{position:fixed;inset:0;background:rgba(11,25,19,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px}
.branches-modal{width:min(620px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:20px;box-shadow:0 25px 70px rgba(0,0,0,.25)}
.branches-modal-wide{width:min(1000px,100%)}
.branches-modal-header{position:sticky;top:0;background:#fff;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:19px 22px;border-bottom:1px solid #e8efec}
.branches-modal-header h2{margin:0;font-size:22px}
.branches-close{border:0;background:#f0f5f3;border-radius:50%;width:36px;height:36px;display:grid;place-items:center;cursor:pointer}
.detail-layout{display:grid;grid-template-columns:360px 1fr;gap:25px;padding:24px}
.detail-image{width:100%;height:280px;object-fit:cover;border-radius:15px;background:#edf5f1}
.detail-rating{display:flex;align-items:center;gap:6px;color:#d49400;margin-bottom:13px}
.detail-rating span{color:#718079;font-size:13px;margin-left:4px}
.detail-description{line-height:1.7;color:#60716a}
.detail-contact{display:grid;gap:10px;color:#4d6259;font-size:14px;margin:18px 0}
.detail-heading{margin:22px 0 12px}
.detail-services{display:grid;gap:9px}
.detail-service{display:flex;gap:11px;border:1px solid #e4ece8;border-radius:12px;padding:11px;background:#fbfdfc}
.detail-service-icon{font-size:21px}
.detail-service strong{font-size:14px}
.detail-service p{margin:3px 0 0;font-size:12px;color:#78867f}
.detail-book{margin-top:18px;width:100%}
.booking-form{padding:22px}
.booking-note{display:flex;gap:9px;align-items:center;background:#eef9f3;color:#176d4b;border-radius:12px;padding:12px 14px;font-size:14px;margin-bottom:18px}
.booking-section{border-bottom:1px solid #edf1ef;padding:0 0 20px;margin-bottom:20px}
.booking-section h3{font-size:17px;margin:0 0 13px}
.service-radio-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
.service-radio{display:grid;grid-template-columns:auto 25px 1fr;align-items:center;gap:7px;border:1px solid #dfe9e5;padding:10px;border-radius:11px;cursor:pointer;font-size:12px}
.service-radio.selected{border-color:#16895b;background:#f0faf5}
.service-radio input{accent-color:#16895b}
.service-radio span{font-size:18px}
.form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}
.booking-form label{display:grid;gap:6px;font-size:13px;font-weight:700;color:#44584f;margin-bottom:13px}
.booking-form input,.booking-form select,.booking-form textarea{width:100%;box-sizing:border-box;border:1px solid #dce6e2;border-radius:9px;padding:11px;background:#fff;color:#25352e;outline:0;font:inherit;font-weight:400}
.booking-form input:focus,.booking-form select:focus,.booking-form textarea:focus{border-color:#16895b;box-shadow:0 0 0 3px rgba(22,137,91,.08)}
.booking-total{display:flex;justify-content:space-between;align-items:center;background:#f5faf7;padding:14px 16px;border-radius:12px;margin-top:8px}
.booking-total strong{font-size:20px;color:#16895b}
.form-error{background:#fff1f1;color:#b23d3d;border:1px solid #f0cccc;border-radius:10px;padding:11px;margin-top:13px;font-size:13px}
.booking-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:18px}
.cancel-button{background:#edf1ef;color:#53645d}
.success-box{text-align:center;padding:35px 25px}
.success-box>svg{color:#16895b}
.success-box h3{font-size:23px;margin:14px 0 8px}
.success-box p{color:#687870}
.booking-code{font-size:25px;font-weight:900;letter-spacing:1.5px;color:#16895b;background:#eef9f3;border:1px dashed #8bc8ac;border-radius:12px;padding:15px;margin:18px auto;max-width:320px}
@media(max-width:900px){.branches-grid{grid-template-columns:1fr}.detail-layout{grid-template-columns:1fr}.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.branches-page{padding:20px 4%}.branches-hero{padding:25px;display:block}.hero-number{margin-top:20px;width:95px;height:95px;min-width:95px}.hero-number strong{font-size:32px}.branch-image-wrap{height:190px}.branch-card-body{padding:18px}.branch-actions{flex-direction:column}.service-radio-grid{grid-template-columns:1fr}.form-grid{grid-template-columns:1fr}.detail-layout{padding:17px}.booking-form{padding:16px}}
`