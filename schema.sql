CREATE TABLE IF NOT EXISTS users (phone TEXT PRIMARY KEY, username TEXT UNIQUE, emoji TEXT, points INTEGER DEFAULT 0, role TEXT DEFAULT 'user', created_at INTEGER);
CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, authorPhone TEXT, author TEXT, emoji TEXT, text TEXT, phase TEXT, likes INTEGER DEFAULT 0, hearts INTEGER DEFAULT 0, coffees INTEGER DEFAULT 0, likedBy TEXT DEFAULT '[]', heartedBy TEXT DEFAULT '[]', coffeedBy TEXT DEFAULT '[]', timestamp INTEGER, isSehhar INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS withdrawals (id TEXT PRIMARY KEY, phone TEXT, username TEXT, amount INTEGER, points INTEGER, status TEXT DEFAULT 'pending', date INTEGER);
CREATE TABLE IF NOT EXISTS ads (
  slot TEXT PRIMARY KEY,
  enabled INTEGER DEFAULT 1,
  type TEXT DEFAULT 'custom',
  label TEXT,
  html TEXT,
  updated_at INTEGER
);
INSERT OR IGNORE INTO ads (slot, enabled, type, label, html, updated_at) VALUES 
('top_feed', 1, 'custom', 'إعلان • يدعم السحوبات 💰', '<div style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:2px dashed #f59e0b;border-radius:18px;padding:16px;text-align:center"><div style="font-weight:900">🚀 مساحتك الإعلانية هنا - فضفضة</div><div style="font-size:12px;opacity:.7">تواصل: 01013200000</div></div>', 0),
('feed_every_5', 1, 'custom', 'إعلان', '<div style="background:#fff;border:1px solid #eee;border-radius:22px;padding:16px;text-align:center"><b>☕ فضفضة برعاية [شركتك هنا]</b></div>', 0),
('wallet_banner', 1, 'custom', 'إعلان', '<div style="background:#f9fafb;border-radius:12px;padding:12px;text-align:center">🎯 إعلانك هنا يغطي سحب 100 جنيه</div>', 0),
('login_banner', 1, 'custom', 'إعلان', '<div style="background:#f9fafb;border-radius:12px;padding:10px;text-align:center">🎉 انضم لـ 1000+ في فضفضة</div>', 0);
