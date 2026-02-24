import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, CartesianGrid } from "recharts";

const orange = "#EE4D2D";
const orangeLight = "#FFF3F0";
const green = "#00B14F";
const greenLight = "#E8F5E9";
const blue = "#1565C0";
const blueLight = "#E3F2FD";
const red = "#C62828";
const purple = "#6A1B9A";
const purpleLight = "#F3E5F5";
const gray = "#F5F5F5";
const gray2 = "#E8E8E8";
const gray4 = "#757575";
const dark = "#1A1A1A";

// ── Data ─────────────────────────────────────────────────────────────────────

const a1Data = [
  { stage: "Payment", count: 3025, pct: 70.0, color: red },
  { stage: "Detail Voucher", count: 847, pct: 19.6, color: "#FB8C00" },
  { stage: "Browse", count: 452, pct: 10.4, color: "#FDD835" },
];

const a2SeabankData = [
  { label: "Non-SeaBank", count: 2191, pct: 72, color: red },
  { label: "SeaBank User", count: 834, pct: 27, color: "#90CAF9" },
];

const a2SegmentData = [
  { label: "25-34, Non-SB", age: "25-34", seabank: false, count: 1186, total: 4934 },
  { label: "18-24, Non-SB", age: "18-24", seabank: false, count: 916,  total: 3887 },
  { label: "35-44, Non-SB", age: "35-44", seabank: false, count: 646,  total: 2615 },
  { label: "45+, Non-SB",   age: "45+",   seabank: false, count: 348,  total: 1367 },
  { label: "25-34, SB",     age: "25-34", seabank: true,  count: 524,  total: 2967 },
  { label: "18-24, SB",     age: "18-24", seabank: true,  count: 349,  total: 2092 },
  { label: "35-44, SB",     age: "35-44", seabank: true,  count: 249,  total: 1494 },
  { label: "45+, SB",       age: "45+",   seabank: true,  count: 106,  total: 644  },
];

const a3WindowData = [
  { window: "Dini Hari (00.00–05.00)", peak: "05:00", count: 707, note: "Peak TERTINGGI ⚠", color: purple, bg: purpleLight },
  { window: "Makan Siang (11.00–13.00)", peak: "12:00", count: 496, note: "Stress test prioritas", color: orange, bg: orangeLight },
  { window: "Makan Malam (18.00–20.00)", peak: "19:00", count: 471, note: "Volume stabil", color: "#E65100", bg: "#FFF3E0" },
];

const a3HourData = [
  [0,140],[1,136],[2,129],[3,142],[4,135],[5,131],[6,130],[7,110],[8,126],
  [9,96],[10,106],[11,165],[12,198],[13,133],[14,119],[15,111],[16,131],
  [17,115],[18,155],[19,168],[20,148],[21,121],[22,96],[23,104]
].map(([h, count]) => ({
  hour: h,
  label: `${String(h).padStart(2,"0")}:00`,
  count,
  window: h >= 0 && h <= 5 ? "dinihari" : (h >= 11 && h <= 13) ? "siang" : (h >= 18 && h <= 20) ? "malam" : "other",
}));

const a3Top5Data = [
  { rank: 1, hour: "19:00", count: 201, label: "Makan Malam", color: "#E65100", bg: "#FFF3E0" },
  { rank: 2, hour: "12:00", count: 198, label: "Makan Siang", color: orange,    bg: orangeLight },
  { rank: 3, hour: "13:00", count: 178, label: "Makan Siang", color: orange,    bg: orangeLight },
  { rank: 4, hour: "18:00", count: 166, label: "Makan Malam", color: "#E65100", bg: "#FFF3E0" },
  { rank: 5, hour: "16:00", count: 141, label: "Sore Hari",   color: gray4,     bg: gray },
];

const a4Data = [
  { city: "Jakarta",  count: 1091, pct: 36.1, note: "Volume terbesar" },
  { city: "Medan",    count: 600,  pct: 19.8, note: "Lokasi survei ★", highlight: true },
  { city: "Surabaya", count: 598,  pct: 19.8, note: "Hampir sama dengan Medan", isSubarabaya: true },
  { city: "Bandung",  count: 417,  pct: 13.8, note: "" },
  { city: "Makassar", count: 319,  pct: 10.5, note: "" },
];

const summaryData = [
  { no: "1", hipotesis: "Mayoritas cancel di payment stage", temuan: "70% cancel terjadi di payment (3.025/4.324)", status: "✔ Terbukti", implikasi: "Fokus solusi di checkout", ok: true },
  { no: "2", hipotesis: "User non-SeaBank paling terdampak", temuan: "72% cancel dari non-SeaBank (2.191 kasus), segmen 25-34 tertinggi (1.186 kasus)", status: "✔ Terbukti", implikasi: "VA = solusi tepat sasaran", ok: true },
  { no: "3", hipotesis: "Peak jam makan siang & dini hari", temuan: "Peak di 05:00 (707) dan 12:00 (496)", status: "✔ Terbukti", implikasi: "Stress test di jam peak", ok: true },
  { no: "4", hipotesis: "Medan representatif secara data", temuan: "Medan top 2 dengan 19.8% meski kota menengah", status: "✔ Terbukti", implikasi: "Solusi valid untuk non-Jakarta", ok: true },
];

// ── Shared Components ─────────────────────────────────────────────────────────

const Card = ({ children, style }) => (
  <div style={{ background: "#fff", borderRadius: 16, padding: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", ...style }}>
    {children}
  </div>
);

const CardTitle = ({ children, sub, icon }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <span style={{ fontSize: 15, fontWeight: 800, color: dark }}>{children}</span>
    </div>
    {sub && <div style={{ fontSize: 12, color: gray4, paddingLeft: icon ? 26 : 0 }}>{sub}</div>}
  </div>
);

const InsightBox = ({ children, type = "finding" }) => {
  const map = {
    finding: { bg: blueLight,   border: "#90CAF9", color: blue,      icon: "💡" },
    confirm: { bg: greenLight,  border: "#A5D6A7", color: green,     icon: "✔" },
    warning: { bg: purpleLight, border: "#CE93D8", color: purple,    icon: "⚠" },
    alert:   { bg: "#FFF8E1",   border: "#FFD600", color: "#E65100", icon: "⚡" },
  };
  const s = map[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 12, color: s.color, marginTop: 12, display: "flex", gap: 8 }}>
      <span style={{ flexShrink: 0 }}>{s.icon}</span>
      <span>{children}</span>
    </div>
  );
};

const StatChip = ({ label, value, color = orange, sub }) => (
  <div style={{ background: gray, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
    <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
    <div style={{ fontSize: 11, color: gray4, marginTop: 2 }}>{label}</div>
    {sub && <div style={{ fontSize: 10, color: gray4, marginTop: 2, fontStyle: "italic" }}>{sub}</div>}
  </div>
);

const TooltipBox = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${gray2}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
      <div style={{ fontWeight: 700, color: dark, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || dark }}>{p.name}: <strong>{formatter ? formatter(p.value) : p.value}</strong></div>
      ))}
    </div>
  );
};

// ── Analysis 1 ────────────────────────────────────────────────────────────────

function Analysis1() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <CardTitle icon="📊" sub="Di mana user drop off saat cancel?">Cancellation by Stage</CardTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={a1Data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="stage" tick={{ fontSize: 12 }} width={90} />
            <Tooltip content={<TooltipBox formatter={v => `${v} transaksi`} />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {a1Data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <InsightBox type="confirm">
          <strong>70%</strong> dari 4.324 cancellation terjadi di <strong>payment stage</strong> (3.025 kasus). User sudah melewati browse dan detail voucher tanpa hambatan — masalah murni ada di proses checkout.
        </InsightBox>
      </Card>

      <Card>
        <CardTitle icon="🎯" sub="Proporsi per tahap">Distribusi Drop-off</CardTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
          {a1Data.map(d => <StatChip key={d.stage} label={d.stage} value={`${d.pct}%`} color={d.color} />)}
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie data={a1Data} dataKey="count" nameKey="stage" cx="50%" cy="50%" outerRadius={60}
              label={({ pct }) => `${pct}%`} labelLine={false}>
              {a1Data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip formatter={v => `${v} transaksi`} />
          </PieChart>
        </ResponsiveContainer>
        <InsightBox type="finding">
          Ini memvalidasi bahwa solusi harus fokus di halaman <strong>pembayaran</strong>, bukan di proses discovery voucher.
        </InsightBox>
      </Card>
    </div>
  );
}

// ── Analysis 2 ────────────────────────────────────────────────────────────────

function Analysis2() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <CardTitle icon="👥" sub="Non-SeaBank vs SeaBank user">Proporsi Cancellation</CardTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <StatChip label="Non-SeaBank" value="2.191" color={red} sub="72% dari total" />
          <StatChip label="SeaBank User" value="834" color={blue} sub="27% dari total" />
        </div>
        <div style={{ background: "#E3F2FD", borderRadius: 10, overflow: "hidden", height: 20, marginBottom: 6, display: "flex" }}>
          <div style={{ height: "100%", width: "72%", background: red, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>72%</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: blue, fontSize: 11, fontWeight: 700 }}>27%</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 11, marginBottom: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: red }} />Non-SeaBank</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#90CAF9" }} />SeaBank</span>
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={a2SeabankData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} width={80} />
            <Tooltip content={<TooltipBox formatter={v => `${v} kasus`} />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {a2SeabankData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <InsightBox type="confirm">
          User non-SeaBank menyumbang <strong>72%</strong> dari total payment cancellation. VA adalah solusi yang tepat sasaran untuk segmen ini.
        </InsightBox>
      </Card>

      <Card>
        <CardTitle icon="📌" sub="Breakdown per usia & ekosistem">Segmen Paling Terdampak</CardTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={a2SegmentData} margin={{ left: 0, right: 10, bottom: 28 }}>
            <XAxis dataKey="label" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              const rate = ((d.count / d.total) * 100).toFixed(1);
              return (
                <div style={{ background: "#fff", border: `1px solid ${gray2}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
                  <div>Cancellation: <strong>{d.count}</strong></div>
                  <div>Total transaksi: <strong>{d.total.toLocaleString()}</strong></div>
                  <div>Cancel rate: <strong style={{ color: d.seabank ? blue : red }}>{rate}%</strong></div>
                </div>
              );
            }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {a2SegmentData.map((d, i) => <Cell key={i} fill={d.seabank ? "#90CAF9" : red} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 12, fontSize: 11, marginTop: 4 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: red }} />Non-SeaBank</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#90CAF9" }} />SeaBank</span>
        </div>
        <InsightBox type="confirm">
          Segmen terdampak terbesar: <strong>25-34 Non-SeaBank (1.186 kasus)</strong> dan <strong>18-24 Non-SeaBank (916 kasus)</strong>. Hover bar untuk cancel rate per segmen.
        </InsightBox>
      </Card>
    </div>
  );
}

// ── Analysis 3 ────────────────────────────────────────────────────────────────

function Analysis3() {
  const CustomBar = (props) => {
    const { x, y, width, height, window: w } = props;
    const fill = w === "dinihari" ? purple : w === "siang" ? orange : w === "malam" ? "#E65100" : "#BDBDBD";
    return <rect x={x} y={y} width={width} height={height} fill={fill} rx={3} />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Window summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {a3WindowData.map(w => (
          <div key={w.window} style={{ background: w.bg, border: `1.5px solid ${w.color}`, borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: w.color, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{w.window}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: w.color }}>{w.count.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: gray4, marginTop: 2 }}>kasus · peak {w.peak}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: w.color, marginTop: 6 }}>{w.note}</div>
          </div>
        ))}
      </div>

      {/* Hourly bar chart */}
      <Card>
        <CardTitle icon="⏰" sub="Distribusi cancellation per jam — 24 jam penuh">Pola Cancellation per Jam</CardTitle>
        <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
          {[
            { color: purple,    label: "Dini Hari (00.00–05.00) — Peak Tertinggi" },
            { color: orange,    label: "Makan Siang (11.00–13.00)" },
            { color: "#E65100", label: "Makan Malam (18.00–20.00)" },
            { color: "#BDBDBD", label: "Jam lainnya" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={a3HourData} margin={{ left: 0, right: 10, top: 6 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gray2} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 9 }} interval={1} />
            <YAxis tick={{ fontSize: 11 }} domain={[0, 220]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                const windowLabel = d.window === "dinihari" ? "⚠ Dini Hari — Peak Tertinggi" : d.window === "siang" ? "☀️ Peak Siang" : d.window === "malam" ? "🌙 Peak Malam" : "";
                return (
                  <div style={{ background: "#fff", border: `1px solid ${gray2}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
                    <div>Cancellation: <strong>{d.count}</strong></div>
                    {windowLabel && <div style={{ color: d.window === "dinihari" ? purple : d.window === "siang" ? orange : "#E65100", marginTop: 4, fontWeight: 600 }}>{windowLabel}</div>}
                  </div>
                );
              }}
            />
            <Bar dataKey="count" shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
        <InsightBox type="warning">
          <strong>Temuan baru:</strong> Peak tertinggi justru terjadi di <strong>dini hari 05:00 (707 kasus total window 00.00–05.00)</strong> — dilanjut dengan jam makan siang dan malam. Ini bisa mengindikasikan automated bots, retry gagal, atau user di timezone berbeda.
        </InsightBox>
        <InsightBox type="confirm">
          Hipotesis jam makan siang terkonfirmasi (496 kasus, peak 12:00). Makan malam 471 kasus (peak 19:00) — lebih rendah dari siang, tapi tetap perlu perhatian.
        </InsightBox>
      </Card>

      {/* Top 5 Peak Hour Transaction */}
      <Card>
        <CardTitle icon="🏆" sub="Jam dengan transaksi cancellation tertinggi">Top 5 Peak Hour Transaction</CardTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {a3Top5Data.map((d, i) => (
            <div key={d.hour} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: d.bg, borderRadius: 12, border: `1px solid ${d.color}33` }}>
              {/* Rank badge */}
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : gray2,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14,
                color: i < 3 ? "#fff" : gray4,
                boxShadow: i === 0 ? "0 2px 8px rgba(255,215,0,0.5)" : "none",
              }}>
                {d.rank}
              </div>
              {/* Jam */}
              <div style={{ fontSize: 22, fontWeight: 800, color: d.color, minWidth: 60 }}>{d.hour}</div>
              {/* Label */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: dark }}>{d.label}</div>
                <div style={{ fontSize: 11, color: gray4, marginTop: 1 }}>Peak jam {d.hour}</div>
              </div>
              {/* Count + mini bar */}
              <div style={{ textAlign: "right", minWidth: 120 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: d.color }}>{d.count} kasus</div>
                <div style={{ background: gray2, borderRadius: 4, height: 6, marginTop: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(d.count / 198) * 100}%`, background: d.color, borderRadius: 4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <InsightBox type="alert">
          <strong>19:00 & 12:00</strong> adalah dua jam paling kritis — keduanya berada di window makan malam dan makan siang. Jadikan jam ini prioritas utama untuk stress test dan monitoring real-time.
        </InsightBox>
      </Card>

    </div>
  );
}

// ── Analysis 4 ────────────────────────────────────────────────────────────────

function Analysis4() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <CardTitle icon="🗺" sub="Kota mana yang paling banyak cancellation di payment?">Cancellation per Kota</CardTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={a4Data} margin={{ left: 0, right: 10 }}>
            <XAxis dataKey="city" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip content={<TooltipBox formatter={v => `${v} kasus`} />} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {a4Data.map((d, i) => (
                <Cell key={i} fill={d.highlight ? orange : i === 0 ? blue : d.isSubarabaya ? green : gray2} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 12, fontSize: 11, marginTop: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: blue }} />Jakarta (terbesar)</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: orange }} />Medan (survei)</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: green }} />Surabaya</span>
        </div>
      </Card>

      <Card>
        <CardTitle icon="📍" sub="Distribusi % cancellation per kota">Proporsi per Kota</CardTitle>
        {a4Data.map((d, i) => (
          <div key={d.city} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: dark, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 15 }}>{["🥇","🥈","🥉","4️⃣","5️⃣"][i]}</span>
                {d.city}
                {d.highlight && <span style={{ background: orangeLight, color: orange, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 4 }}>Lokasi survei</span>}
              </span>
              <span style={{ fontWeight: 700, color: d.highlight ? orange : i === 0 ? blue : d.isSubarabaya ? green : dark }}>{d.pct}%</span>
            </div>
            <div style={{ background: gray2, borderRadius: 6, overflow: "hidden", height: 8 }}>
              <div style={{ height: "100%", width: `${d.pct / 0.361 * 100}%`, background: d.highlight ? orange : i === 0 ? blue : d.isSubarabaya ? green : gray4, borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 11, color: gray4, marginTop: 2 }}>{d.count} kasus · {d.note}</div>
          </div>
        ))}
        <InsightBox type="confirm">
          Medan masuk <strong>top 2</strong> (600 kasus, 19.8%) meski populasinya jauh lebih kecil dari Jakarta. Temuan lapangan terkonfirmasi.
        </InsightBox>
      </Card>
    </div>
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────

function Summary() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: greenLight, border: `2px solid ${green}`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 36 }}>✅</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: green }}>Seluruh Hipotesis Terkonfirmasi</div>
          <div style={{ fontSize: 13, color: gray4, marginTop: 2 }}>4 dari 4 hipotesis berhasil divalidasi oleh data. Dataset: 20.000 transaksi · 3.000 users · 5 kota.</div>
        </div>
      </div>

      <Card>
        <CardTitle icon="📋" sub="Ringkasan hasil analisis vs hipotesis awal">Ringkasan Temuan</CardTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {["#", "Hipotesis", "Temuan Data", "Status", "Implikasi"].map(h => (
                  <th key={h} style={{ background: orange, color: "#fff", padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaryData.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? gray : "#fff" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: orange }}>{r.no}</td>
                  <td style={{ padding: "10px 12px", color: dark }}>{r.hipotesis}</td>
                  <td style={{ padding: "10px 12px", color: dark }}>{r.temuan}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ background: greenLight, color: green, fontWeight: 700, padding: "3px 8px", borderRadius: 6, fontSize: 11, whiteSpace: "nowrap" }}>{r.status}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: blue, fontWeight: 600 }}>{r.implikasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { val: "70%",   label: "Cancel di Payment", color: red,    sub: "3.025 dari 4.324 kasus" },
          { val: "72%",   label: "User Non-SeaBank",  color: orange, sub: "Target utama solusi VA" },
          { val: "707",   label: "Peak Dini Hari",    color: purple, sub: "Window 00–05, temuan baru" },
          { val: "Top 2", label: "Posisi Medan",      color: green,  sub: "19.8% dari total cancel" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", textAlign: "center", borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: dark, marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: gray4, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <Card style={{ borderLeft: `4px solid ${gray4}` }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>📊</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: dark, marginBottom: 4 }}>Catatan Metodologi</div>
            <div style={{ fontSize: 12, color: gray4, lineHeight: 1.6 }}>
              Dataset yang digunakan adalah <strong>data dummy</strong> yang dibuat untuk keperluan demonstrasi portofolio. Nilai dan pola dalam data dirancang untuk merepresentasikan skenario yang realistis berdasarkan pengamatan lapangan dan pengetahuan industri.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

const analyses = [
  { id: "a1", label: "Analisis 1", title: "Drop-off Stage", icon: "📊" },
  { id: "a2", label: "Analisis 2", title: "Segmen User",    icon: "👥" },
  { id: "a3", label: "Analisis 3", title: "Pola Waktu",     icon: "⏰" },
  { id: "a4", label: "Analisis 4", title: "Top Kota",       icon: "🗺" },
  { id: "summary", label: "Ringkasan", title: "Semua Temuan", icon: "📋" },
];

export default function DashboardBA() {
  const [active, setActive] = useState("a1");

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F0F0F0", minHeight: "100vh", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ display: "inline-block", background: orange, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, padding: "4px 12px", borderRadius: 20, marginBottom: 10, textTransform: "uppercase" }}>
          BA Portfolio · Case Study
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: dark, margin: "0 0 4px" }}>Data Analysis — ShopeeFood Deals</h1>
        <p style={{ color: gray4, fontSize: 13, margin: "0 0 4px" }}>Validasi kuantitatif hipotesis payment friction</p>
        <p style={{ color: gray4, fontSize: 12, margin: 0 }}>Dataset: <strong>20.000 transaksi</strong> · <strong>3.000 users</strong> · 5 kota</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Total Transaksi",    value: "20.000", color: dark   },
          { label: "Total Cancellation", value: "4.324",  color: red    },
          { label: "Cancel di Payment",  value: "70%",    color: orange },
          { label: "User Non-SeaBank",   value: "72%",    color: blue   },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: gray4, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto 20px", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {analyses.map(a => (
          <button key={a.id} onClick={() => setActive(a.id)} style={{
            padding: "8px 18px", borderRadius: 24,
            border: `2px solid ${active === a.id ? orange : gray2}`,
            background: active === a.id ? orange : "#fff",
            color: active === a.id ? "#fff" : gray4,
            fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {a.icon} {a.id === "summary" ? a.title : `${a.label} — ${a.title}`}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {active === "a1" && <Analysis1 />}
        {active === "a2" && <Analysis2 />}
        {active === "a3" && <Analysis3 />}
        {active === "a4" && <Analysis4 />}
        {active === "summary" && <Summary />}
      </div>

      <div style={{ maxWidth: 900, margin: "24px auto 0", textAlign: "center", fontSize: 12, color: gray4 }}>
        Data dummy untuk keperluan portofolio · Irtanti Karmina Carona · Business Analyst Portfolio 2025
      </div>
    </div>
  );
}