export async function onRequest({request, env}) {
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json'};
  if(request.method==='OPTIONS') return new Response(null,{headers:cors});
  const DB=env.DB;

  if(request.method==='GET'){
    const r=await DB.prepare("SELECT slot, enabled, type, label, html, updated_at FROM ads").all();
    const slots={};
    for(const row of (r.results||[])){slots[row.slot]={enabled:!!row.enabled,type:row.type,label:row.label,html:row.html,updated_at:row.updated_at};}
    return new Response(JSON.stringify({ok:true, slots}),{headers:cors});
  }

  if(request.method==='POST'){
    const body=await request.json().catch(()=>({}));
    const {slot, html, enabled, type, label, adminPhone, adminPass} = body;
    
    // تحقق أدمن - تشفير SHA256
    async function sha256(s){const b=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');}
    const inputHash = await sha256(adminPass||'');
    if(inputHash!=='82a10f2ca79e1d9740da9c7b49b26eeee57c78c04f7fb4eb9c7c3d618392e5e4' && adminPass!=='132000aA*') {
      return new Response(JSON.stringify({error:'غير مصرح - أدمن فقط'}),{status:401,headers:cors});
    }

    if(!slot) return new Response(JSON.stringify({error:'slot مطلوب'}),{status:400,headers:cors});
    
    await DB.prepare("INSERT INTO ads (slot, enabled, type, label, html, updated_at) VALUES (?1,?2,?3,?4,?5,?6) ON CONFLICT(slot) DO UPDATE SET enabled=?2, type=?3, label=?4, html=?5, updated_at=?6").bind(slot, enabled?1:0, type||'custom', label||'', html||'', Date.now()).run();
    
    return new Response(JSON.stringify({ok:true, message:'تم حفظ الإعلان ✅ - يشتغل مع أي شركة'}),{headers:cors});
  }

  return new Response(JSON.stringify({error:'method'}),{status:400,headers:cors});
}
