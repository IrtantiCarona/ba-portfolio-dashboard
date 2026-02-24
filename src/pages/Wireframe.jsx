import { useState, useEffect } from "react";

const orange = "#EE4D2D";
const orangeLight = "#FFF3F0";
const gray = "#F5F5F5";
const gray2 = "#E8E8E8";
const gray3 = "#BDBDBD";
const gray4 = "#757575";
const dark = "#222";
const green = "#00B14F";
const greenLight = "#E8F5E9";
const red = "#D0021B";
const blue = "#1565C0";
const blueLight = "#E3F2FD";

// ─── Shared UI ───────────────────────────────────────────────────────────────

function StatusBar({ bg = orange }) {
  return (
    <div style={{ background: bg, padding: "8px 16px 6px", display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>9:41</span>
      <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>●●● ▲ 100%</span>
    </div>
  );
}

function NavBar({ title, onBack }) {
  return (
    <div style={{ background: orange, padding: "10px 16px 14px", display: "flex", alignItems: "center", gap: 10 }}>
      <span
        onClick={onBack}
        style={{ color: "#fff", fontSize: 18, cursor: onBack ? "pointer" : "default", lineHeight: 1, userSelect: "none" }}
      >←</span>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, flex: 1 }}>{title}</span>
    </div>
  );
}

const Phone = ({ children }) => (
  <div style={{
    width: 280, background: "#fff", borderRadius: 32,
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)", overflow: "hidden",
    border: "6px solid #222", display: "flex", flexDirection: "column",
    minHeight: 580,
  }}>
    {children}
  </div>
);

const Section = ({ children, style }) => (
  <div style={{ background: "#fff", margin: "0 0 8px", padding: "14px 16px", ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: gray4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
    {children}
  </div>
);

const Tag = ({ children, color = orange }) => (
  <span style={{
    background: color === green ? greenLight : color === blue ? blueLight : orangeLight,
    color, fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4, marginLeft: 6
  }}>{children}</span>
);

const InfoBox = ({ children, type = "info" }) => {
  const map = {
    info:    { bg: "#FFF8E1", border: "#FFD600", color: "#795548" },
    success: { bg: greenLight, border: "#A5D6A7", color: green },
    error:   { bg: "#FFEBEE", border: "#EF9A9A", color: red },
    blue:    { bg: blueLight, border: "#90CAF9", color: blue },
  };
  const s = map[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 11, color: s.color, margin: "10px 0" }}>
      {children}
    </div>
  );
};

const Btn = ({ children, onClick, disabled, secondary }) => (
  <button
    onClick={!disabled ? onClick : undefined}
    style={{
      width: "100%", border: "none", borderRadius: 10, padding: "13px",
      fontWeight: 800, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? gray3 : secondary ? "#fff" : orange,
      color: disabled ? "#fff" : secondary ? orange : "#fff",
      border: secondary ? `2px solid ${orange}` : "none",
    }}
  >
    {children}
  </button>
);

const CtaArea = ({ children }) => (
  <div style={{ background: "#fff", padding: "12px 16px", borderTop: `1px solid ${gray2}`, marginTop: "auto" }}>
    {children}
  </div>
);

const TotalRow = () => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
    <span style={{ fontSize: 13, color: gray4 }}>Total</span>
    <span style={{ fontSize: 16, fontWeight: 800, color: orange }}>Rp29.995</span>
  </div>
);

const VoucherCard = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0" }}>
    <div style={{ width: 52, height: 52, borderRadius: 10, background: orangeLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🍜</div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: dark, marginBottom: 2 }}>ShopeeFood Voucher 30K</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: orange }}>Rp29.995</div>
    </div>
  </div>
);

function RadioOption({ id, selected, onSelect, disabled, icon, iconBg, name, sub, isNew, rightLabel, children }) {
  return (
    <div>
      <div
        onClick={() => !disabled && onSelect(id)}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 0",
          borderBottom: `1px solid ${gray2}`, opacity: disabled ? 0.4 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <div style={{
          width: 18, height: 18, borderRadius: "50%",
          border: `2px solid ${selected ? orange : gray3}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          {selected && <div style={{ width: 9, height: 9, borderRadius: "50%", background: orange }} />}
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: dark }}>
            {name}
            {isNew && <Tag color={green}>BARU</Tag>}
          </div>
          <div style={{ fontSize: 11, color: gray4 }}>{sub}</div>
        </div>
        {rightLabel && <span style={{ fontSize: 10, color: gray3 }}>{rightLabel}</span>}
      </div>
      {selected && children}
    </div>
  );
}

// ─── CONFIRMATION SCREENS ─────────────────────────────────────────────────────

function VAConfirmScreen({ bank, onBack }) {
  const vaNumbers = { BCA: "8277 0001 2345 6789", BRI: "0081 0001 9876 5432", Mandiri: "8901 0001 1122 3344", BNI: "8009 0001 5566 7788", CIMB: "7022 0001 3344 5566", Permata: "8015 0001 7788 9900" };
  const vaNum = vaNumbers[bank] || "8277 0001 2345 6789";
  const [copied, setCopied] = useState(false);

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Instruksi Pembayaran" onBack={onBack} />
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <Section>
          <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
            <div style={{ fontSize: 11, color: gray4, marginBottom: 4 }}>Transfer ke Virtual Account {bank}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: dark, letterSpacing: 2, background: gray, borderRadius: 10, padding: "12px 16px", margin: "8px 0", border: `2px dashed ${orange}`, fontFamily: "monospace" }}>
              {vaNum}
            </div>
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? greenLight : orangeLight, border: `1px solid ${copied ? green : orange}`, color: copied ? green : orange, borderRadius: 8, padding: "6px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {copied ? "✔ Tersalin!" : "Salin Nomor"}
            </button>
          </div>
        </Section>

        <Section>
          <SectionTitle>Detail Transaksi</SectionTitle>
          {[["Nama", "ShopeeFood Deals"], ["Voucher", "ShopeeFood Voucher 30K"], ["Total", "Rp29.995"], ["Batas Bayar", "24 jam · 25 Feb 2025"]].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${gray2}`, fontSize: 12 }}>
              <span style={{ color: gray4 }}>{label}</span>
              <span style={{ color: label === "Total" ? orange : dark, fontWeight: label === "Total" ? 700 : 400 }}>{val}</span>
            </div>
          ))}
        </Section>

        <Section>
          <SectionTitle>Cara Bayar via {bank}</SectionTitle>
          {[`Buka aplikasi mobile banking ${bank}`, "Pilih Transfer → Virtual Account", "Masukkan nomor VA di atas", "Konfirmasi jumlah & bayar", "Voucher aktif otomatis setelah pembayaran"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: orange, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: dark, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </Section>

        <CtaArea>
          <InfoBox type="info">⏱ Selesaikan pembayaran sebelum batas waktu habis.</InfoBox>
          <Btn onClick={onBack} secondary>← Ganti Metode Bayar</Btn>
        </CtaArea>
      </div>
    </Phone>
  );
}

function QRISConfirmScreen({ onBack, onSuccess }) {
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const expired = seconds <= 0;

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Bayar dengan QRIS" onBack={onBack} />
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column" }}>
        <Section style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: gray4, marginBottom: 8 }}>Scan QR ini dengan aplikasi apapun</div>
          <div style={{ width: 160, height: 160, margin: "0 auto 12px", background: expired ? "#eee" : "#fff", border: `3px solid ${expired ? gray3 : orange}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {expired ? (
              <div style={{ textAlign: "center", color: gray4 }}>
                <div style={{ fontSize: 28 }}>⚠️</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>QR Kedaluwarsa</div>
              </div>
            ) : (
              <svg width="140" height="140" viewBox="0 0 140 140">
                {[...Array(10)].map((_, r) =>
                  [...Array(10)].map((_, c) => {
                    const val = ((r * 7 + c * 13 + r * c) % 3 === 0);
                    return val ? <rect key={`${r}-${c}`} x={c * 14} y={r * 14} width={13} height={13} fill="#222" rx={1} /> : null;
                  })
                )}
                {[[0,0],[0,84],[84,0]].map(([x,y],i) => (
                  <g key={i}>
                    <rect x={x} y={y} width={42} height={42} fill="#222" rx={4}/>
                    <rect x={x+6} y={y+6} width={30} height={30} fill="#fff" rx={2}/>
                    <rect x={x+12} y={y+12} width={18} height={18} fill="#222" rx={2}/>
                  </g>
                ))}
                <rect x={55} y={55} width={30} height={30} fill="#fff" rx={4}/>
                <text x={70} y={76} textAnchor="middle" fontSize={18}>🛒</text>
              </svg>
            )}
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: expired ? "#FFEBEE" : blueLight, border: `1px solid ${expired ? "#EF9A9A" : "#90CAF9"}`, borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 700, color: expired ? red : blue }}>
            ⏱ {expired ? "Kedaluwarsa" : `${mm}:${ss}`}
          </div>
          <div style={{ fontSize: 11, color: gray4, marginTop: 8 }}>Total: <strong style={{ color: orange }}>Rp29.995</strong></div>
        </Section>

        <Section>
          <SectionTitle>Aplikasi yang Didukung</SectionTitle>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["GoPay", "OVO", "Dana", "LinkAja", "ShopeePay", "BCA Mobile"].map(app => (
              <span key={app} style={{ background: gray, borderRadius: 20, padding: "4px 10px", fontSize: 11, color: dark }}>{app}</span>
            ))}
          </div>
        </Section>

        <CtaArea>
          {expired ? (
            <>
              <InfoBox type="error">QR kedaluwarsa. Refresh untuk kode baru.</InfoBox>
              <Btn onClick={() => setSeconds(300)}>🔄 Generate QR Baru</Btn>
            </>
          ) : (
            <>
              <Btn onClick={onSuccess}>✔ Simulasi: Pembayaran Berhasil</Btn>
              <div style={{ height: 8 }} />
              <Btn onClick={onBack} secondary>← Ganti Metode Bayar</Btn>
            </>
          )}
        </CtaArea>
      </div>
    </Phone>
  );
}

function CardConfirmScreen({ onBack, onSuccess }) {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [useSaved, setUseSaved] = useState(true);
  const isValid = useSaved || (card.replace(/\s/g,"").length === 16 && name && expiry.length === 5 && cvv.length === 3);

  const formatCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = v => { const d = v.replace(/\D/g,"").slice(0,4); return d.length > 2 ? d.slice(0,2)+"/"+d.slice(2) : d; };

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Pembayaran Kartu" onBack={onBack} />
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column" }}>
        <Section>
          <InfoBox type="success">✔ Alur ini sama dengan checkout produk Shopee — kartu tersimpan langsung bisa dipakai.</InfoBox>
          <SectionTitle>Pilih Kartu</SectionTitle>

          {/* Saved card */}
          <div onClick={() => setUseSaved(true)} style={{ background: useSaved ? greenLight : "#fff", border: `1.5px solid ${useSaved ? green : gray2}`, borderRadius: 10, padding: "10px 12px", marginBottom: 10, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>💳</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: dark }}>BCA •••• 4521</div>
              <div style={{ fontSize: 11, color: gray4 }}>Kartu tersimpan</div>
            </div>
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${useSaved ? green : gray3}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {useSaved && <div style={{ width: 9, height: 9, borderRadius: "50%", background: green }} />}
            </div>
          </div>

          {/* New card toggle */}
          <div onClick={() => setUseSaved(false)} style={{ fontSize: 12, color: useSaved ? gray4 : orange, fontWeight: 600, cursor: "pointer", marginBottom: 8, textAlign: "center" }}>
            {useSaved ? "+ Gunakan kartu baru" : "▲ Sembunyikan"}
          </div>

          {!useSaved && (
            <div>
              {[
                { label: "Nomor Kartu", val: card, set: v => setCard(formatCard(v)), ph: "0000 0000 0000 0000", maxLen: 19 },
                { label: "Nama Pemegang", val: name, set: setName, ph: "Sesuai kartu" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: gray4, marginBottom: 4 }}>{f.label}</div>
                  <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} maxLength={f.maxLen}
                    style={{ width: "100%", border: `1.5px solid ${gray2}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, boxSizing: "border-box", outline: "none" }} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "Berlaku Hingga", val: expiry, set: v => setExpiry(formatExpiry(v)), ph: "MM/YY", maxLen: 5 },
                  { label: "CVV", val: cvv, set: v => setCvv(v.replace(/\D/g,"").slice(0,3)), ph: "•••", maxLen: 3, type: "password" },
                ].map(f => (
                  <div key={f.label} style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: gray4, marginBottom: 4 }}>{f.label}</div>
                    <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} maxLength={f.maxLen} type={f.type}
                      style={{ width: "100%", border: `1.5px solid ${gray2}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        <CtaArea>
          <TotalRow />
          <Btn onClick={onSuccess} disabled={!isValid}>
            {isValid ? "Bayar Rp29.995 →" : "Lengkapi Data Kartu"}
          </Btn>
          <div style={{ height: 8 }} />
          <Btn onClick={onBack} secondary>← Ganti Metode Bayar</Btn>
        </CtaArea>
      </div>
    </Phone>
  );
}

function MinimarketConfirmScreen({ onBack }) {
  const [copied, setCopied] = useState(false);
  const code = "SPFD-2025-49182";

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Bayar di Minimarket" onBack={onBack} />
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column" }}>
        <Section style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: gray4, marginBottom: 8 }}>Tunjukkan kode ini ke kasir</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
            {["🏪 Indomaret", "🟢 Alfamart"].map(m => (
              <span key={m} style={{ background: gray, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: dark }}>{m}</span>
            ))}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: dark, letterSpacing: 4, background: gray, borderRadius: 12, padding: "14px 16px", margin: "0 0 10px", border: `2px dashed ${orange}`, fontFamily: "monospace" }}>
            {code}
          </div>
          <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: copied ? greenLight : orangeLight, border: `1px solid ${copied ? green : orange}`, color: copied ? green : orange, borderRadius: 8, padding: "6px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            {copied ? "✔ Tersalin!" : "Salin Kode"}
          </button>
        </Section>

        <Section>
          <SectionTitle>Detail Pembayaran</SectionTitle>
          {[["Total Bayar", "Rp29.995"], ["Berlaku Hingga", "25 Feb 2025, 09:41"], ["Biaya Admin", "Rp2.500 (dibayar di kasir)"]].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${gray2}`, fontSize: 12 }}>
              <span style={{ color: gray4 }}>{label}</span>
              <span style={{ color: label === "Total Bayar" ? orange : dark, fontWeight: label === "Total Bayar" ? 700 : 400 }}>{val}</span>
            </div>
          ))}
        </Section>

        <Section>
          <SectionTitle>Cara Bayar</SectionTitle>
          {["Kunjungi Indomaret atau Alfamart terdekat", "Sampaikan ke kasir ingin bayar ShopeeFood", "Tunjukkan atau sebutkan kode di atas", "Bayar sesuai total + biaya admin", "Simpan struk — voucher aktif dalam 10 menit"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: orange, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: dark, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </Section>

        <CtaArea>
          <Btn onClick={onBack} secondary>← Ganti Metode Bayar</Btn>
        </CtaArea>
      </div>
    </Phone>
  );
}

function SuccessScreen({ method, onDone }) {
  const msgs = { qris: "Pembayaran QRIS berhasil dikonfirmasi.", debit: "Pembayaran kartu berhasil diproses." };
  return (
    <Phone>
      <StatusBar bg={green} />
      <div style={{ background: green, padding: "10px 16px 14px" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Pembayaran Berhasil</span>
      </div>
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 16px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: dark, textAlign: "center", marginBottom: 8 }}>Transaksi Berhasil!</div>
        <div style={{ fontSize: 13, color: gray4, textAlign: "center", marginBottom: 24 }}>{msgs[method]}</div>

        <div style={{ background: "#fff", borderRadius: 14, padding: 16, width: "100%", boxSizing: "border-box", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: gray4, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Voucher Aktif</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: orangeLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🍜</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: dark }}>ShopeeFood Voucher 30K</div>
              <div style={{ fontSize: 12, color: green, fontWeight: 600 }}>Siap digunakan</div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: gray, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: gray4 }}>Kode Voucher</div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 3, color: orange, fontFamily: "monospace" }}>SF30K-X9KL</div>
          </div>
        </div>

        <Btn onClick={onDone}>Kembali ke ShopeeFood</Btn>
      </div>
    </Phone>
  );
}

// ─── AFTER SCREEN ─────────────────────────────────────────────────────────────

function AfterScreen() {
  const [selected, setSelected] = useState(null);
  const [selectedBank, setSelectedBank] = useState("BCA");
  const [screen, setScreen] = useState("checkout");
  const [successMethod, setSuccessMethod] = useState(null);
  const banks = ["BCA", "BRI", "Mandiri", "BNI", "CIMB", "Permata"];

  const handlePay = () => {
    if (selected === "va") setScreen("va");
    else if (selected === "qris") setScreen("qris");
    else if (selected === "debit") setScreen("debit");
    else if (selected === "minimarket") setScreen("minimarket");
  };

  const handleSuccess = (method) => { setSuccessMethod(method); setScreen("success"); };
  const goBack = () => setScreen("checkout");

  if (screen === "va") return <VAConfirmScreen bank={selectedBank} onBack={goBack} />;
  if (screen === "qris") return <QRISConfirmScreen onBack={goBack} onSuccess={() => handleSuccess("qris")} />;
  if (screen === "debit") return <CardConfirmScreen onBack={goBack} onSuccess={() => handleSuccess("debit")} />;
  if (screen === "minimarket") return <MinimarketConfirmScreen onBack={goBack} />;
  if (screen === "success") return <SuccessScreen method={successMethod} onDone={() => { setScreen("checkout"); setSelected(null); }} />;

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Konfirmasi Pesanan" onBack={() => {}} />
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column" }}>
        <Section>
          <SectionTitle>Voucher</SectionTitle>
          <VoucherCard />
        </Section>

        <Section>
          <SectionTitle>Metode Pembayaran</SectionTitle>
          <RadioOption id="shopeepay" selected={false} onSelect={() => {}} disabled icon="🟠" iconBg="#FF6600" name="ShopeePay" sub="Saldo: Rp2.500 — tidak cukup" rightLabel="Tidak cukup" />
          <RadioOption id="seabank" selected={false} onSelect={() => {}} disabled icon="🔵" iconBg="#0066FF" name="SeaBank" sub="Saldo: Rp0 — tidak cukup" rightLabel="Tidak cukup" />

          <RadioOption id="va" selected={selected === "va"} onSelect={setSelected} icon="🏦" iconBg={blueLight} name="Transfer Bank" sub="Virtual Account · tanpa registrasi" isNew>
            <div style={{ background: greenLight, border: `1px solid #A5D6A7`, borderRadius: 10, padding: 12, margin: "6px 0 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: green, marginBottom: 8 }}>Pilih Bank</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {banks.map(b => (
                  <button key={b} onClick={() => setSelectedBank(b)} style={{ background: selectedBank === b ? greenLight : "#fff", border: `1.5px solid ${selectedBank === b ? green : gray2}`, borderRadius: 8, padding: "7px 4px", fontSize: 11, fontWeight: 600, color: selectedBank === b ? green : dark, cursor: "pointer" }}>{b}</button>
                ))}
              </div>
            </div>
          </RadioOption>

          <RadioOption id="qris" selected={selected === "qris"} onSelect={setSelected} icon="📱" iconBg="#F3E5F5" name="QRIS / Mobile Banking" sub="GoPay, OVO, Dana, dan lainnya" isNew />
          <RadioOption id="debit" selected={selected === "debit"} onSelect={setSelected} icon="💳" iconBg={gray2} name="Kartu Debit/Kredit" sub="Alur sama seperti checkout Shopee" />
          <RadioOption id="minimarket" selected={selected === "minimarket"} onSelect={setSelected} icon="🏪" iconBg="#FFF8E1" name="Bayar di Minimarket" sub="Indomaret · Alfamart" isNew />

          <InfoBox type="success">✔ Metode ini konsisten dengan checkout produk Shopee lainnya.</InfoBox>
        </Section>

        <CtaArea>
          <TotalRow />
          <Btn onClick={handlePay} disabled={!selected}>
            {selected ? "Bayar Sekarang →" : "Pilih metode pembayaran"}
          </Btn>
        </CtaArea>
      </div>
    </Phone>
  );
}

// ─── BEFORE SCREEN ────────────────────────────────────────────────────────────

function BeforeScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <Phone>
      <StatusBar />
      <NavBar title="Konfirmasi Pesanan" />
      <div style={{ background: gray, flex: 1, display: "flex", flexDirection: "column" }}>
        <Section>
          <SectionTitle>Voucher</SectionTitle>
          <VoucherCard />
        </Section>

        <Section>
          <SectionTitle>Metode Pembayaran</SectionTitle>
          <RadioOption id="shopeepay" selected={false} onSelect={() => {}} disabled icon="🟠" iconBg="#FF6600" name="ShopeePay" sub="Saldo: Rp2.500 — tidak cukup" rightLabel="Tidak cukup" />
          <RadioOption id="seabank" selected={false} onSelect={() => {}} disabled icon="🔵" iconBg="#0066FF" name="SeaBank" sub="Saldo: Rp0 — tidak cukup" rightLabel="Tidak cukup" />
          <RadioOption id="debit" selected={selected === "debit"} onSelect={setSelected} icon="💳" iconBg={gray2} name="Kartu Debit/Kredit" sub="Perlu registrasi dulu">
            <div style={{ background: orangeLight, border: `1px solid ${orange}`, borderRadius: 10, padding: 12, margin: "6px 0 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: orange, marginBottom: 8 }}>⚠ Registrasi Kartu Diperlukan</div>
              {["Nomor kartu (16 digit)", "Nama pemegang kartu", "MM/YY · CVV"].map(ph => (
                <input key={ph} placeholder={ph} style={{ width: "100%", border: `1px solid ${gray2}`, borderRadius: 6, padding: "7px 10px", fontSize: 11, marginBottom: 6, boxSizing: "border-box" }} />
              ))}
              <div style={{ fontSize: 10, color: gray4 }}>Langkah berbeda dari checkout barang biasa.</div>
            </div>
          </RadioOption>
          <InfoBox type="error">✕ Tidak ada metode yang tersedia. Transaksi kemungkinan akan dibatalkan.</InfoBox>
        </Section>

        <CtaArea>
          <TotalRow />
          <Btn disabled>Bayar Sekarang</Btn>
        </CtaArea>
      </div>
    </Phone>
  );
}

// ─── COMPARISON ───────────────────────────────────────────────────────────────

function ComparisonView() {
  const cols = [
    {
      type: "before", emoji: "😤", title: "BEFORE", sub: "Alur saat ini — penuh friction",
      steps: [
        { text: "Buka ShopeeFood Deals", type: "normal" },
        { text: "Pilih voucher", type: "normal" },
        { text: "Halaman checkout muncul", type: "normal" },
        { text: "ShopeePay & SeaBank: saldo tidak cukup", type: "problem", tag: "❌ Dead end" },
        { text: "Kartu Debit: registrasi panjang tiba-tiba", type: "problem", tag: "❌ Friction tinggi" },
        { text: "User meninggalkan checkout", type: "problem", tag: "❌ Drop-off" },
      ],
      stat: "📉  80% user gagal checkout karena hambatan pembayaran",
    },
    {
      type: "after", emoji: "✅", title: "AFTER", sub: "Multi-metode + navigasi sesuai pilihan",
      steps: [
        { text: "Buka ShopeeFood Deals", type: "normal" },
        { text: "Pilih voucher", type: "normal" },
        { text: "Halaman checkout muncul", type: "normal" },
        { text: "Pilih metode (VA / QRIS / Kartu / Minimarket)", type: "solution", tag: "✔ Inklusif" },
        { text: "Klik Bayar → halaman konfirmasi sesuai metode", type: "solution", tag: "✔ Frictionless" },
        { text: "Transaksi selesai ✅", type: "solution", tag: "✔ Konversi" },
      ],
      stat: "📈  Target: checkout conversion naik ≥15% dalam 30 hari",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 720, margin: "0 auto" }}>
      {cols.map(col => {
        const isBefore = col.type === "before";
        const accent = isBefore ? red : green;
        const softBg = isBefore ? "#FFEBEE" : greenLight;
        const softBorder = isBefore ? "#FFCDD2" : "#C8E6C9";

        return (
          <div key={col.type} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `2px solid ${softBorder}` }}>
            <div style={{ background: softBg, padding: "12px 16px", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{col.emoji}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: accent }}>{col.title}</div>
                <div style={{ fontSize: 11, color: gray4 }}>{col.sub}</div>
              </div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              {col.steps.map((s, i) => {
                const dotBg = s.type === "problem" ? "#FFCDD2" : s.type === "solution" ? "#C8E6C9" : blueLight;
                const dotColor = s.type === "problem" ? red : s.type === "solution" ? green : blue;
                const tagColor = isBefore ? red : green;
                const tagBg = isBefore ? "#FFEBEE" : greenLight;
                return (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: dotBg, color: dotColor, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 12, color: dark, lineHeight: 1.5 }}>{s.text}</div>
                      {s.tag && <span style={{ display: "inline-block", background: tagBg, color: tagColor, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, marginTop: 2 }}>{s.tag}</span>}
                    </div>
                  </div>
                );
              })}
              <div style={{ background: softBg, border: `1px solid ${softBorder}`, borderRadius: 8, padding: "10px 12px", fontSize: 11, color: accent, marginTop: 14 }}>
                {col.stat}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function wireframe() {
  const [tab, setTab] = useState("after");
  const tabs = [
    { id: "before", label: "❌ Before" },
    { id: "after", label: "✅ After (Interaktif)" },
    { id: "compare", label: "⚖ Perbandingan" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F0F0F0", minHeight: "100vh", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ display: "inline-block", background: orange, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, padding: "4px 12px", borderRadius: 20, marginBottom: 10, textTransform: "uppercase" }}>
          BA Portfolio · Case Study
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: dark, margin: "0 0 6px" }}>ShopeeFood Deals — Payment UX</h1>
        <p style={{ color: gray4, fontSize: 14, margin: 0 }}>Wireframe Solusi Konsistensi Checkout · Fully Interaktif</p>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 18px", borderRadius: 24, border: `2px solid ${tab === t.id ? orange : gray2}`, background: tab === t.id ? orange : "#fff", color: tab === t.id ? "#fff" : gray4, fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {tab === "before" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: red, textTransform: "uppercase", letterSpacing: 1 }}>Kondisi Saat Ini</div>
              <BeforeScreen />
              <div style={{ fontSize: 12, color: gray4, textAlign: "center", maxWidth: 240 }}>User terjebak: saldo tidak cukup, registrasi kartu panjang → abandon</div>
            </div>
          </div>
        )}

        {tab === "after" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ background: greenLight, border: `1px solid #A5D6A7`, borderRadius: 10, padding: "8px 20px", fontSize: 12, color: green, fontWeight: 600 }}>
              💡 Pilih metode pembayaran → klik "Bayar Sekarang" → halaman konfirmasi sesuai pilihan
            </div>
            <AfterScreen />
          </div>
        )}

        {tab === "compare" && <ComparisonView />}
      </div>
    </div>
  );
}
