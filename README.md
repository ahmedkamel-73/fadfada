# فضفضة - FadFada

فضفضة هي مساحة آمنة ومجهولة للفضفضة والمشاركة مع ناس زيك. بدون اسم حقيقي، بدون أحكام، مجرد كلام من القلب.

## ✨ المميزات

- مجهول وآمن: اسم مستعار ورمز تعبيري فقط
- 4 مراحل يومية: صباحية ☀️، جدعنة 🔥، روقان 🌙، سهرانين 🌃
- تفاعل لطيف: لايك، قلب، قهوة مع نظام نقاط
- محفظة ونقاط وسحوبات
- مشاركة سهلة: واتساب، فيسبوك، تويتر، تليجرام
- يعمل بدون إنترنت: PWA قابل للتثبيت
- لوحة تحكم للإدارة

## 🛠️ التقنيات

- Frontend: HTML5, Tailwind CSS, Vanilla JavaScript
- Backend: Cloudflare Pages Functions
- قاعدة البيانات: Cloudflare D1
- المصادقة: JWT + SHA-256
- PWA: Service Worker

## 🚀 التثبيت

```bash
npx wrangler d1 create fadfada
npx wrangler d1 execute fadfada --file=schema.sql
```

إعداد `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "fadfada"
database_id = "YOUR_D1_DATABASE_ID"

[vars]
APP_NAME = "فضفضة"
JWT_SECRET = "YOUR_JWT_SECRET"
ADMIN_PHONE = "YOUR_ADMIN_PHONE"
ADMIN_PASSWORD_HASH = "YOUR_SHA256_HASH"
```
