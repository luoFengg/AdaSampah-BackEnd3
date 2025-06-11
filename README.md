# Dokumentasi API Back-End AdaSampah

## Ringkasan

AdaSampah adalah platform pelaporan sampah. Backend ini menyediakan API RESTful untuk manajemen pengguna, autentikasi, dan pengelolaan laporan sampah. Autentikasi menggunakan JWT yang disimpan pada cookie HTTP-only untuk keamanan sesi.

---

## Base URL

```
https://adasampah-backend3-production.up.railway.app
```

---

## Autentikasi

- **Login** akan mengembalikan token JWT pada cookie HTTP-only (`token`).
- Sebagian besar endpoint membutuhkan autentikasi melalui cookie ini.
- Logout akan memasukkan token ke blacklist dan menghapus cookie.

---

## Endpoint Pengguna

### Registrasi

- **POST** `/user/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "fullName": "string"
  }
  ```
- **Respon:** Data pengguna (tanpa password).

---

### Login

- **POST** `/user/login`
- **Body:**
  ```json
  {
    "username": "string", // atau "email"
    "password": "string"
  }
  ```
- **Respon:** Data pengguna + token JWT (dalam cookie).

---

### Logout

- **POST** `/user/logout`
- **Cookie:** `token` (wajib)
- **Respon:** Pesan sukses.

---

### Ambil Pengguna Berdasarkan ID

- **GET** `/user/{id}`
- **Respon:** Data pengguna (tanpa password).

---

### Update Pengguna

- **PUT** `/user/{id}`
- **Autentikasi:** Wajib
- **Payload:** `multipart/form-data` (untuk upload foto profil)
- **Field:** `username`, `email`, `fullName`, `profileUrl` (file)
- **Respon:** Data pengguna yang telah diperbarui.

---

### Hapus Pengguna

- **DELETE** `/user/{id}`
- **Autentikasi:** Wajib
- **Respon:** Data pengguna yang dihapus.

---

### Refetch Pengguna Terautentikasi

- **GET** `/user/refetch`
- **Autentikasi:** Wajib
- **Respon:** Data pengguna yang sedang login.

---

## Endpoint Laporan

### Ambil Semua Laporan

- **GET** `/reports`
- **Respon:** Array seluruh laporan.

---

### Ambil Semua Laporan (Paginasi)

- **GET** `/reports/limit?page={page}&limit={limit}`
- **Query:** `page` (default: 1), `limit` (default: 9)
- **Respon:** Laporan terpaginasikan, total halaman, halaman saat ini.

---

### Ambil Laporan Berdasarkan ID

- **GET** `/reports/{reportId}`
- **Respon:** Data laporan.

---

### Buat Laporan

- **POST** `/reports`
- **Autentikasi:** Wajib
- **Payload:** `multipart/form-data` (untuk upload foto)
- **Field:**
  - `description` (string)
  - `lat`, `lon`, `latDetail`, `lonDetail` (number)
  - `regency`, `province`, `location`, `detailLocation` (string)
  - `photo` (file)
  - `status`, `saved` (opsional, array JSON)
- **Respon:** ID laporan yang berhasil dibuat.

---

### Edit Deskripsi Laporan

- **PUT** `/reports/{reportId}`
- **Autentikasi:** Wajib
- **Body:**
  ```json
  { "description": "string" }
  ```
- **Respon:** Data laporan yang telah diperbarui.

---

### Update Status Laporan

- **PATCH** `/reports/{reportId}/status`
- **Body:**
  ```json
  { "statusDescription": "string" }
  ```
- **Respon:** Laporan dengan status terbaru.

---

### Hapus Laporan

- **DELETE** `/reports/{reportId}`
- **Autentikasi:** Wajib
- **Respon:** Pesan sukses.

---

### Toggle Simpan Laporan oleh Pengguna

- **PATCH** `/reports/{reportId}/saved/{userId}`
- **Autentikasi:** Wajib
- **Respon:** Pesan status simpan/hapus simpan.

---

### Ambil Daftar User yang Menyimpan Laporan

- **GET** `/reports/{reportId}/saved`
- **Respon:** Array user ID yang menyimpan laporan.

---

### Ambil Laporan Berdasarkan User

- **GET** `/reports/user/{userId}`
- **Autentikasi:** Wajib
- **Respon:** Array laporan yang dibuat oleh user tersebut.

---

## Penanganan Error

- Semua endpoint mengembalikan JSON dengan `status` dan `message`.
- Kode status HTTP digunakan secara tepat (misal: 200, 400, 401, 404, 500).

---

## Catatan

- Semua upload file (foto profil, foto laporan) menggunakan `multipart/form-data`.
- JWT secret dan konfigurasi sensitif lain dikelola melalui environment variable.
- CORS diaktifkan untuk origin frontend yang diizinkan.

---

## Handler/Referensi Kurang?

Jika ada fitur baru atau handler yang belum didokumentasikan (misal: reset password, endpoint admin), silakan lampirkan file handler terkait agar dokumentasi dapat diperbarui.

---
