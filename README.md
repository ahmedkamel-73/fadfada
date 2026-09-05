# فضفضة 2026 - إدارة إعلانات من لوحة التحكم 🛡️

## الجديد: الأدمن يقدر يحط كود أي شركة إعلانات من لوحة التحكم مباشرة

### كيف؟
1. ادخل كـ أدمن: 01013200000 / 132000aA*
2. افتح لوحة التحكم 🛡️
3. هتلاقي قسم "📢 إدارة الإعلانات - أي شركة"
4. لكل مكان (top_feed, feed_every_5, wallet_banner, login_banner):
   - حط كود الإعلان (HTML, AdSense, Ezoic, صورة, iframe - أي شركة)
   - اضغط حفظ
   - الإعلان يظهر فوراً في الموقع بدون deploy

### أمثلة أكواد:
- AdSense: <ins class="adsbygoogle" ...></ins>
- Ezoic: <div id="ezoic-pub-ad-placeholder-101"></div>
- صورة: <a href="..."><img src="..."></a>
- HTML مخصص: <div style="...">إعلانك</div>
- iframe: <iframe src="https://ad-network.com"></iframe>

### Secrets جاهزة
JWT: fC62wr3dNa-sym3NxEHC...
ADMIN_HASH: 82a10f2ca79e1d9740da...
Admin: 01013200000 / 132000aA*

### DB
- ads table جديد - يحفظ الإعلانات
- schema.sql محدث

### نشر
npm install
npx wrangler d1 execute fadfada --file=schema.sql
npm run deploy
