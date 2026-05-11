# Development Plan: Professional Portfolio Website
**Owner:** Dinar Abdul Hollik Firdaus  
**Role:** Full Stack & Backend Developer  

---

## 1. Tech Stack & Architecture
- **Backend:** Laravel 9
- **Frontend SPA:** React.js via Inertia.js (Tanpa full page reload)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (untuk animasi halus & micro-interactions)
- **Database:** MySQL
- **Pattern:** Clean Architecture (Repository Pattern, Service Layer, API Resource, Form Request)

---

## 2. UI/UX Design Direction
- **Theme:** Modern Tech Portfolio / SaaS Landing Page.
- **Visual Style:** Dark Mode Modern, Premium Gradient (Subtle Neon Glow), Light Glassmorphism.
- **Interactions:** Smooth scrolling, hover glow effects, typing effect di Hero section, custom modern cursor, scroll-triggered animations (Framer Motion).
- **Typography:** Modern Sans-serif (seperti Inter, Plus Jakarta Sans, atau Roboto).

---

## 3. Database Schema
Desain database relasional untuk mengelola konten dinamis dari Admin Panel.

1. **`users`** (Admin Access)
   - `id`, `name`, `email`, `password`, `remember_token`
2. **`settings`** (Hero & About Section)
   - `id`, `key`, `value` (ex: hero_title, hero_tagline, about_text, cv_file_path, profile_picture)
3. **`skills`** (Tech Stack)
   - `id`, `category` (Backend, Frontend, Database, Tools), `name`, `icon_url`, `order`
4. **`experiences`**
   - `id`, `company_name`, `role`, `start_date`, `end_date`, `is_current`, `description` (JSON/Text), `tech_stack` (JSON)
5. **`projects`**
   - `id`, `title`, `description`, `thumbnail_url`, `demo_url`, `github_url`, `is_featured`, `category`
6. **`project_tech_stack`** (Pivot)
   - `project_id`, `skill_id`
7. **`certifications`**
   - `id`, `title`, `issuer`, `date_obtained`, `image_url`
8. **`educations`**
   - `id`, `institution`, `degree`, `major`, `gpa`, `start_year`, `end_year`
9. **`social_medias`**
   - `id`, `platform`, `url`, `icon_url`
10. **`messages`**
    - `id`, `name`, `email`, `message`, `is_read`, `created_at`

---

## 4. Folder & React Component Structure

### Laravel Folder Structure (Customized)
```text
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/      # Admin Panel Controllers
│   │   └── Web/        # Frontend Controllers
│   ├── Requests/       # Form Request Validation
│   └── Resources/      # API Resources (Data Transformation)
├── Models/
├── Repositories/       # Repository Pattern untuk DB Query
├── Services/           # Business Logic Layer
```

### React Component Structure (`resources/js`)
```text
resources/js/
├── Components/
│   ├── Admin/          # Sidebar, Navbar, PageHeader, DataTable
│   ├── Frontend/
│   │   ├── Sections/   # Hero, About, TechStack, Experience, Projects, Contact
│   │   ├── UI/         # Button, Card, SectionHeading, FloatingWhatsApp
│   │   └── Layouts/    # FrontendLayout, Footer, Navbar
│   └── Shared/         # FormInput, Modal, ToastNotification
├── Pages/
│   ├── Admin/          # Dashboard, Project/Index, Experience/Index, etc.
│   ├── Frontend/       # Home (Single Page)
│   └── Auth/           # Login Admin
├── Utils/              # Helper functions, Framer Motion variants
└── app.js              # Inertia setup
```

---

## 5. Routing Structure

### Frontend Routes (`routes/web.php`)
- `GET /` -> `Web\HomeController@index`
- `POST /contact` -> `Web\ContactController@store` (Kirim pesan + Email)
- `GET /download-cv` -> `Web\HomeController@downloadCv`

### Admin Routes (`routes/web.php` with `/admin` prefix & `auth` middleware)
- `GET /admin/dashboard` -> `Admin\DashboardController@index`
- `RESOURCE /admin/projects` -> `Admin\ProjectController`
- `RESOURCE /admin/experiences` -> `Admin\ExperienceController`
- `RESOURCE /admin/skills` -> `Admin\SkillController`
- `RESOURCE /admin/certifications` -> `Admin\CertificationController`
- `RESOURCE /admin/educations` -> `Admin\EducationController`
- `RESOURCE /admin/messages` -> `Admin\MessageController`
- `RESOURCE /admin/settings` -> `Admin\SettingController` (Hero & About)

---

## 6. Daftar Halaman

### Halaman Frontend (Single Page Application)
1. **Home / Landing Page**
   - **Hero Section:** Nama, Peran (Typing Animation), Tagline, CTA (Hire Me, Download CV), Social Media Icons, Animated Blob Background.
   - **About Me:** Deskripsi profesional, Foto profil placeholder, 4 Card Statistik (Experience, Projects, etc.).
   - **Tech Stack:** Grid icon modern dikelompokkan berdasarkan kategori (Backend, Frontend, DB, Tools) dengan hover glow effect.
   - **Experience:** Timeline vertikal dengan scroll animation untuk riwayat kerja (Log In Megastore, PT Shirobyte, PT Authentic Guard).
   - **Projects:** Grid cards dengan thumbnail image, tech badge, deskripsi, hover animation, dan tombol Demo/Github (Recruitment App, POS, KADIN, dll).
   - **Certification & Education:** Grid card sertifikat (PRIME, Android) & Timeline Edukasi (UTB, SMK PI).
   - **Contact Form:** Form (Name, Email, Message) dengan validasi real-time, SweetAlert/Toast success, dan Floating WhatsApp Button.
   - **Footer:** Copyright, Quick Links, Back to top.

### Halaman Admin (Dashboard Panel)
1. **Login Page:** Autentikasi untuk admin.
2. **Dashboard Overview:** Analytics sederhana (Total Projects, Unread Messages, Total Views).
3. **Manage Projects:** DataTables, Upload Image Thumbnail (Drag & drop preview), Rich Text untuk deskripsi, Add/Edit/Delete.
4. **Manage Experiences:** List pengalaman, Tech stack selector.
5. **Manage Skills/Tech Stack:** Upload SVG/Icon, Category.
6. **Manage Settings:** Update Hero Title, Tagline, Upload CV PDF, Update About Text.
7. **Inbox Messages:** List pesan dari Contact Form (baca, hapus).

---

## 7. Optimasi & Production Readiness
- **Performance:** Lazy loading untuk gambar project, Inertia router caching.
- **SEO Dasar:** Meta tags dinamis menggunakan fitur Head dari Inertia.js.
- **Security:** CSRF Protection bawaan Laravel, XSS filtering, Form Request rules (wajib).
- **Clean Code:** Memisahkan logic dari Controller ke dalam **Service Layer**, dan query ke dalam **Repository Pattern**. API Resource untuk memformat response data.
