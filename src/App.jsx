import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

const NAV = [
  { path: "/", label: "Trang chủ" },
  { path: "/upload", label: "Upload PDF" },
  { path: "/sign", label: "Ký số" },
  { path: "/verify", label: "Xác minh" },
  { path: "/certificate", label: "Chứng thư" },
]

function Navbar() {
  const location = useLocation()
  return (
    <nav style={{ background: "#0f172a", padding: "0 32px", display: "flex", alignItems: "center", gap: 32, height: 56, borderBottom: "1px solid #1e293b" }}>
      <span style={{ color: "white", fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px", whiteSpace: "nowrap" }}>
        Cổng Dịch Vụ Công
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        {NAV.map(l => (
          <Link key={l.path} to={l.path} style={{
            color: location.pathname === l.path ? "white" : "#94a3b8",
            textDecoration: "none", fontSize: 13, fontWeight: location.pathname === l.path ? 600 : 400,
            padding: "6px 12px", borderRadius: 6,
            background: location.pathname === l.path ? "#1e293b" : "transparent"
          }}>{l.label}</Link>
        ))}
      </div>
    </nav>
  )
}

function Card({ children, style }) {
  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "28px 32px", ...style }}>
      {children}
    </div>
  )
}

function Btn({ children, onClick, disabled, variant = "primary", style }) {
  const base = { padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", border: "none", transition: "opacity .15s" }
  const variants = {
    primary: { background: disabled ? "#e2e8f0" : "#1e40af", color: disabled ? "#94a3b8" : "white" },
    ghost: { background: "transparent", color: "#475569", border: "1px solid #e2e8f0" },
  }
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>{children}</button>
}

function Badge({ children, color = "blue" }) {
  const colors = {
    green: { background: "#dcfce7", color: "#166534" },
    red: { background: "#fee2e2", color: "#991b1b" },
    blue: { background: "#dbeafe", color: "#1e40af" },
    gray: { background: "#f1f5f9", color: "#475569" },
  }
  return <span style={{ ...colors[color], fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.3px" }}>{children}</span>
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
      <span style={{ fontSize: 13, color: "#64748b" }}>{label}</span>
      <span style={{ fontSize: 13, color: "#1e293b", maxWidth: "60%", textAlign: "right" }}>{value}</span>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", paddingTop: 64 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#1e40af", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>NT219 — Mật Mã Ứng Dụng</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", margin: "0 0 10px", lineHeight: 1.3 }}>Hệ thống chữ ký số<br />dịch vụ hành chính công</h1>
        <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>Ký số và xác minh tài liệu PDF sử dụng RSA-PSS 2048-bit + X.509</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { path: "/upload", icon: "📄", title: "Upload PDF", desc: "Tải lên hồ sơ cần ký số" },
          { path: "/sign", icon: "✍️", title: "Ký số", desc: "Ký tài liệu bằng RSA-PSS" },
          { path: "/verify", icon: "🔍", title: "Xác minh", desc: "Kiểm tra chữ ký hợp lệ" },
          { path: "/certificate", icon: "📋", title: "Chứng thư X.509", desc: "Xem thông tin certificate" },
        ].map(item => (
          <div key={item.path} onClick={() => navigate(item.path)} style={{
            background: "white", border: "1px solid #e2e8f0", borderRadius: 10,
            padding: "20px 22px", cursor: "pointer",
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 48 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Upload PDF</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Chọn file PDF hồ sơ cần ký số</p>
      <Card>
        <label style={{
          display: "block", border: "1.5px dashed #cbd5e1", borderRadius: 8,
          padding: "36px 16px", textAlign: "center", cursor: "pointer",
          background: file ? "#f0fdf4" : "#fafafa", marginBottom: 16,
          borderColor: file ? "#86efac" : "#cbd5e1"
        }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
          <div style={{ fontSize: 13, color: file ? "#166534" : "#64748b", fontWeight: file ? 600 : 400 }}>
            {file ? file.name : "Bấm để chọn file PDF"}
          </div>
          {!file && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Chỉ chấp nhận .pdf</div>}
          <input type="file" accept=".pdf" onChange={e => { setFile(e.target.files[0]); setUploaded(false) }} style={{ display: "none" }} />
        </label>
        <Btn onClick={() => setUploaded(true)} disabled={!file} style={{ width: "100%" }}>
          Upload hồ sơ
        </Btn>
        {uploaded && (
          <div style={{ marginTop: 16, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "#166534", marginBottom: 4 }}>✓ Upload thành công</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>SHA-256: e3b0c44298fc1c149afbf4c8996fb924...</div>
          </div>
        )}
      </Card>
    </div>
  )
}

function SignPage() {
  const [state, setState] = useState("idle")
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 48 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Ký số tài liệu</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Ký PDF bằng RSA-PSS 2048-bit + SHA-256</p>
      <Card>
        <div style={{ marginBottom: 20 }}>
          <Row label="Tên file" value="don_xin_cap_phep.pdf" />
          <Row label="Người ký" value="Nguyễn Văn A" />
          <Row label="Chứng thư" value="0A:1B:2C:3D" />
          <Row label="Thuật toán" value="RSA-PSS 2048 + SHA-256" />
        </div>
        <Btn
          onClick={() => { setState("signing"); setTimeout(() => setState("done"), 2000) }}
          disabled={state !== "idle"}
          style={{ width: "100%" }}
        >
          {state === "signing" ? "Đang ký..." : state === "done" ? "✓ Đã ký thành công" : "Ký số"}
        </Btn>
        {state === "done" && (
          <div style={{ marginTop: 16, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "#166534", marginBottom: 4 }}>✓ Ký số thành công</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Thời gian ký: 4.2 ms · Signed PDF đã lưu</div>
          </div>
        )}
      </Card>
    </div>
  )
}

function VerifyPage() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 48 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Xác minh chữ ký</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Upload file PDF đã ký để kiểm tra tính hợp lệ</p>
      <Card>
        <label style={{
          display: "block", border: "1.5px dashed #cbd5e1", borderRadius: 8,
          padding: "28px 16px", textAlign: "center", cursor: "pointer",
          background: "#fafafa", marginBottom: 16
        }}>
          <div style={{ fontSize: 13, color: "#64748b" }}>{file ? file.name : "Chọn file PDF đã ký"}</div>
          <input type="file" accept=".pdf" onChange={e => { setFile(e.target.files[0]); setResult(null) }} style={{ display: "none" }} />
        </label>
        <Btn onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setResult("valid") }, 1500) }}
          disabled={!file || loading} style={{ width: "100%" }}>
          {loading ? "Đang xác minh..." : "Xác minh"}
        </Btn>
        {result === "valid" && (
          <div style={{ marginTop: 16, padding: "14px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Badge color="green">VALID</Badge>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>Chữ ký hợp lệ</span>
            </div>
            <Row label="Người ký" value="Nguyễn Văn A" />
            <Row label="Email" value="nguyenvana@citizen.vn" />
            <Row label="Thời điểm ký" value="2025-10-15 09:30:00" />
            <Row label="Chuỗi CA" value="✓ Hợp lệ" />
            <Row label="Trạng thái cert" value="✓ Chưa thu hồi" />
          </div>
        )}
        {result === "invalid" && (
          <div style={{ marginTop: 16, padding: "14px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Badge color="red">INVALID</Badge>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#991b1b" }}>Chữ ký không hợp lệ</span>
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>Tài liệu đã bị chỉnh sửa sau khi ký.</div>
          </div>
        )}
      </Card>
    </div>
  )
}

function CertPage() {
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 48 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Chứng thư số X.509</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Chi tiết certificate của người ký</p>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>Nguyễn Văn A</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>nguyenvana@citizen.vn</div>
          </div>
          <Badge color="green" style={{ marginLeft: "auto" }}>Còn hiệu lực</Badge>
        </div>
        <Row label="Subject" value="CN=Nguyễn Văn A, C=VN" />
        <Row label="Issuer" value="CN=Demo Root CA, O=UIT Lab" />
        <Row label="Serial Number" value="0A:1B:2C:3D:4E:5F" />
        <Row label="Hiệu lực từ" value="2025-01-01" />
        <Row label="Hiệu lực đến" value="2026-12-31" />
        <Row label="Key Usage" value="Digital Signature, Non-Repudiation" />
        <Row label="Thuật toán" value="RSA-PSS 2048-bit + SHA-256" />
      </Card>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <Navbar />
        <div style={{ padding: "0 32px 64px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/sign" element={<SignPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/certificate" element={<CertPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}