// فضفضة - نظام إعلانات عام - يشتغل مع أي شركة + إدارة من لوحة الأدمن
window.FADFADA_ADS = {
  slots: {},
  async init(){
    try{
      // حاول تحمل من API (لوحة التحكم)
      const r = await fetch('/api/ads');
      if(r.ok){
        const data = await r.json();
        if(data.slots && Object.keys(data.slots).length>0){
          this.slots = data.slots;
          console.log('✅ إعلانات من لوحة التحكم (أي شركة)', this.slots);
          this.renderAll();
          return;
        }
      }
    }catch(e){ console.log('API ads failed, fallback to config'); }
    try{
      // fallback لـ ads.config.json
      const r2 = await fetch('/ads.config.json');
      if(r2.ok){
        const data2 = await r2.json();
        this.slots = data2.slots || {};
        console.log('✅ إعلانات من config', this.slots);
      }
    }catch(e){}
    this.renderAll();
  },
  renderAll(){
    document.querySelectorAll('[data-ad-slot]').forEach(el=>{
      const slotName = el.getAttribute('data-ad-slot');
      this.renderSlot(slotName, el);
    });
  },
  renderSlot(slotName, container){
    const slot = this.slots[slotName];
    if(!slot){ container.innerHTML = `<div style="background:#f9fafb;border:1px dashed #ddd;border-radius:12px;padding:12px;text-align:center;font-size:11px">مساحة إعلانية: ${slotName}<br><span style="font-size:9px;opacity:.5">حط كود أي شركة من لوحة الأدمن 🛡️</span></div>`; return; }
    if(!slot.enabled){ container.style.display='none'; return; }
    container.innerHTML = slot.html || '';
    setTimeout(()=>{ try{ (adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){} },200);
  }
};
document.addEventListener('DOMContentLoaded', ()=>window.FADFADA_ADS.init());
