# 📊 BA Portfolio — ShopeeFood Deals: Payment Cancellation Analysis

> Validasi kuantitatif hipotesis payment friction pada ShopeeFood menggunakan data dummy.  
> Proyek ini mencakup analisis data (Python), wireframe desain, dan dashboard interaktif berbasis web.

---

## 🔗 Live Demo

👉 **[ba-portfolio-dashboard.vercel.app](https://ba-portfolio-dashboard.vercel.app)**

| Halaman | URL |
|---|---|
| Dashboard Analisis | `/` |
| Wireframe Desain | `/wireframe` |

---

## 📌 Highlights Temuan

| # | Hipotesis | Hasil | Status |
|---|---|---|---|
| 1 | Mayoritas cancel di payment stage | 70% cancel terjadi di payment (3.025/4.324 kasus) | ✅ Terbukti |
| 2 | User non-SeaBank paling terdampak | 72% cancel dari non-SeaBank, segmen 25–34 tertinggi | ✅ Terbukti |
| 3 | Peak jam makan siang & dini hari | Peak 05:00 (707 kasus) dan 12:00 (496 kasus) | ✅ Terbukti |
| 4 | Medan representatif secara data | Medan top 2 dengan 19.8% meski kota menengah | ✅ Terbukti |

---

## 🗂️ Struktur Folder

```
ba-portfolio-dashboard/
│
├── 📁 src/
│   ├── 📄 App.jsx               # Root component + konfigurasi routing
│   ├── 📄 main.jsx              # Entry point React
│   └── 📁 pages/
│       ├── 📄 DashboardBA.jsx   # Dashboard analisis data interaktif
│       └── 📄 Wireframe.jsx     # Wireframe desain UI/UX
│
├── 📁 analysis/                 # (disarankan, lihat catatan di bawah)
│   ├── 📓 case_study_shopeedeals.ipynb   # Google Colab — analisis Python
│   └── 📊 transactions.csv              # Data dummy (format CSV, sep=";")
│
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 vercel.json               # Konfigurasi routing Vercel
├── 📄 .gitignore
└── 📄 README.md
```

> 💡 **Catatan:** Letakkan file `.ipynb` dan file Excel/CSV di dalam folder `analysis/` agar lebih rapi dan mudah ditemukan.

---

## 📓 Google Colab — Analisis Data

File notebook: `analysis/case_study_shopeedeals.ipynb`

Notebook ini berisi analisis Python end-to-end untuk memvalidasi 4 hipotesis payment friction:

| Analisis | Deskripsi |
|---|---|
| **A1 — Drop-off Stage** | Identifikasi tahap mana user paling banyak cancel (browse / detail voucher / payment) |
| **A2 — Segmentasi User** | Breakdown cancellation berdasarkan usia dan status SeaBank vs Non-SeaBank |
| **A3 — Pola Waktu** | Analisis jam peak cancellation per 24 jam + top 5 peak hour |
| **A4 — Distribusi Kota** | Perbandingan volume cancellation di 5 kota besar Indonesia |

**Library yang digunakan:**
```
pandas · matplotlib
```

### Cara Buka di Google Colab
1. Buka [colab.research.google.com](https://colab.research.google.com)
2. Klik **File → Upload notebook**
3. Upload file `case_study_shopeedeals.ipynb`
4. Upload juga file `transactions.csv` ke sesi Colab:
   ```python
   # Atau mount Google Drive jika file disimpan di Drive
   from google.colab import files
   files.upload()  # upload transactions.csv
   ```
5. Klik **Runtime → Run all**

---

## 📊 Data Dummy (Excel / CSV)

File data: `analysis/transactions.csv`

Dataset ini adalah **data dummy** yang dirancang untuk merepresentasikan skenario realistis berdasarkan pengamatan lapangan dan pengetahuan industri.

**Struktur data:**

| Kolom | Tipe | Deskripsi |
|---|---|---|
| `transaction_id` | integer | ID unik setiap transaksi |
| `user_id` | integer | ID unik user |
| `transaction_date` | date | Tanggal transaksi (`DD/MM/YYYY`) |
| `transaction_hour` | integer | Jam transaksi (0–23) |
| `voucher_price` | integer | Harga voucher yang dibeli (Rupiah) |
| `payment_method` | string | Metode pembayaran (`shopeepay` / `seabank` / `debit_card`) |
| `age_group` | string | Kelompok usia (`18-24` / `25-34` / `35-44` / `45+`) |
| `city` | string | Kota user (`Jakarta` / `Medan` / `Surabaya` / `Bandung` / `Makassar`) |
| `seabank_user` | boolean | Apakah user terdaftar sebagai pengguna SeaBank (`TRUE` / `FALSE`) |
| `shopeepay_balance` | integer | Saldo ShopeePay user (Rupiah) |
| `registered_payment_methods` | integer | Jumlah metode pembayaran yang terdaftar |
| `avg_monthly_transaction` | integer | Rata-rata transaksi bulanan user (Rupiah) |
| `status` | string | Status transaksi (`completed` / `cancelled`) |
| `cancel_stage` | string | Tahap saat cancel (`payment` / `browse` / `detail`) — kosong jika completed |

**Statistik dataset:**
- Total transaksi: **20.000**
- Total cancellation: **4.324**
- Jumlah kota: **5**
- Metode pembayaran: **3** (ShopeePay, SeaBank, Debit Card)

> ⚠️ Data ini adalah **data dummy** untuk keperluan demonstrasi portofolio.

---
## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React + Vite |
| **Visualisasi** | Recharts |
| **Styling** | Inline CSS (React style) |
| **Routing** | React Router DOM |
| **Analisis Data** | Python, Pandas, Matplotlib |
| **Deploy** | Vercel |
| **Version Control** | GitHub |

---

## 💻 Menjalankan Project Secara Lokal

### Prasyarat
Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) v18 ke atas — cek: `node -v`
- [Git](https://git-scm.com/) — cek: `git -v`

### Langkah-langkah

**1. Clone repository**
```bash
git clone https://github.com/IrtantiCarona/ba-portfolio-dashboard.git
```

**2. Masuk ke folder project**
```bash
cd ba-portfolio-dashboard
```

**3. Install dependencies**
```bash
npm install
```

**4. Jalankan development server**
```bash
npm run dev
```

**5. Buka di browser**
```
http://localhost:5173
```

### Halaman yang tersedia:
| Halaman | URL Lokal |
|---|---|
| Dashboard Analisis | `http://localhost:5173/` |
| Wireframe | `http://localhost:5173/wireframe` |

### Build untuk production
```bash
npm run build
```
Output tersimpan di folder `dist/`

---

## 📁 Cara Menambah File ke Repository

Setelah mengedit atau menambah file baru:
```bash
git add .
git commit -m "deskripsi perubahan"
git push
```
Vercel akan otomatis re-deploy setiap kali ada push ke branch `main`.

---

## 👩‍💼 Author

**Irtanti Karmina Carona**  
Business Analyst Portfolio · 2025

---

*Data dummy untuk keperluan demonstrasi portofolio.*
