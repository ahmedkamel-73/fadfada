# فضفضة - FadFada

فضفضة هي مساحة آمنة ومجهولة للفضفضة والمشاركة مع ناس زيك. بدون اسم حقيقي، بدون أحكام، مجرد كلام من القلب.

> 💜 فكرة بسيطة: تكتب اللي جواك، وتلاقي ناس تحس بيك.

## ✨ المميزات

- **مجهول وآمن**: اسم مستعار ورمز تعبيري فقط، لا بيانات شخصية
- **4 مراحل يومية**: صباحية (8-11) ☀️، جدعنة (12-3) 🔥، روقان (4-11) 🌙، سهرانين (12-7) 🌃
- **تفاعل لطيف**: لايك 👍، قلب ❤️، قهوة ☕ مع نظام نقاط
- **محفظة ونقاط**: اكسب نقاط من التفاعل واطلب سحب
- **مشاركة سهلة**: شارك أي بوست على واتساب، فيسبوك، تويتر، تليجرام
- **يعمل بدون إنترنت**: PWA قابل للتثبيت على الموبايل
- **لوحة تحكم للإدارة**: إدارة المستخدمين، البوستات، السحوبات، والإعلانات

## 🛠️ التقنيات المستخدمة

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Cloudflare Pages Functions
- **قاعدة البيانات**: Cloudflare D1 (SQLite)
- **المصادقة**: JWT + تشفير SHA-256
- **PWA**: Service Worker + Web Manifest

## 📁 هيكل المشروع

```
fadfada/
├── index.html          # الواجهة الرئيسية
├── manifest.json       # إعدادات PWA
├── sw.js              # Service Worker
├── ads.loader.js      # محمل الإعلانات
├── ads.config.json    # إعدادات الإعلانات
├── schema.sql         # هيكل قاعدة البيانات
├── wrangler.toml      # إعدادات Cloudflare
└── functions/
    └── api/
        ├── auth.js           # تسجيل الدخول والتسجيل
        ├── posts.js          # إدارة البوستات
        ├── react.js          # التفاعلات
        ├── wallet.js         # المحفظة
        ├── withdrawals.js    # السحوبات
        └── admin/
            ├── stats.js      # إحصائيات
            └── ads.js        # إدارة الإعلانات
```

## 🚀 التثبيت والتشغيل

### 1. إنشاء قاعدة البيانات

```bash
npx wrangler d1 create fadfada
```

### 2. إعداد الجداول

```bash
npx wrangler d1 execute fadfada --file=schema.sql
```

### 3. إعداد متغيرات البيئة

أنشئ ملف `wrangler.toml`:

```toml
name = "fadfada"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "fadfada"
database_id = "YOUR_D1_DATABASE_ID"

[vars]
APP_NAME = "فضفضة"
JWT_SECRET = "YOUR_JWT_SECRET_HERE"
ADMIN_PHONE = "YOUR_ADMIN_PHONE"
ADMIN_PASSWORD_HASH = "YOUR_ADMIN_PASSWORD_HASH"
```

> **ملاحظة**: استخدم `openssl rand -base64 48` لتوليد `JWT_SECRET` آمن.

### 4. النشر على Cloudflare Pages

```bash
# ربط المشروع
npx wrangler pages project create fadfada

# النشر
git push origin main
```

أو من لوحة تحكم Cloudflare Pages: ربط مستودع GitHub مباشرة.

### 5. ربط D1 بالمشروع

من لوحة تحكم Cloudflare Pages:
- Settings → Functions → D1 Database Bindings
- أضف binding باسم `DB` واختر قاعدة `fadfada`

## 🗄️ هيكل قاعدة البيانات

### users
- `phone` (TEXT, PK) - رقم الموبايل
- `username` (TEXT, UNIQUE) - اسم المستخدم
- `emoji` (TEXT) - الرمز التعبيري
- `points` (INTEGER) - النقاط
- `role` (TEXT) - الدور (user/admin)
- `created_at` (INTEGER) - تاريخ الإنشاء

### posts
- `id` (TEXT, PK) - معرف البوست
- `authorPhone` - رقم الكاتب
- `text` - محتوى البوست
- `phase` - المرحلة (sabah/gad/rawaqan/sehhar)
- `likes`, `hearts`, `coffees` - التفاعلات

### withdrawals
- طلبات السحب ومتابعتها

### ads
- إعدادات الإعلانات (slot, html, enabled)

## 🔐 الأمان

- كلمات المرور مشفرة بـ SHA-256
- جلسات آمنة بـ JWT
- حماية من الـ Rate Limiting
- تحقق من صحة المدخلات في كل مكان

## 📱 PWA

التطبيق يدعم التثبيت على الموبايل:
- يعمل Offline بعد أول زيارة
- أيقونة على الشاشة الرئيسية
- تجربة تطبيق أصلي

## 📄 الترخيص

هذا المشروع مفتوح المصدر للاستخدام الشخصي والتعليمي.

---

<p align="center">
  <b>فضفضة 💜</b><br>
  مساحة آمنة للفضفضة - فكرة بسيطة، أثر كبير
</p>
