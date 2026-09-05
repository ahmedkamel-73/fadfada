export async function onRequest({request, env}) {
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json'};
  if(request.method==='OPTIONS') return new Response(null,{headers:cors});
  const DB=env.DB;
  if(request.method==='GET'){const r=await DB.prepare("SELECT * FROM ads").all(); const slots={}; for(const row of (r.results||[])) slots[row.slot]=row; return new Response(JSON.stringify({ok:true,slots}),{headers:cors});}
  if(request.method==='POST'){const b=await request.json().catch(()=>({})); const {slot,html,adminPass}=b; async function sha256(s){const buf=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));return [...new Uint8Array(buf)].map(x=>x.toString(16).padStart(2,'0')).join('');} const ih=await sha256(adminPass||''); if(ih!=='82a10f2ca79e1d9740da9c7b49b26eeee57c78c04f7fb4eb9c7c3d618392e5e4') return new Response(JSON.stringify({error:'باسورد غلط'}),{status:401,headers:cors}); await DB.prepare("INSERT INTO ads (slot,html,updated_at) VALUES (?1,?2,?3) ON CONFLICT(slot) DO UPDATE SET html=?2, updated_at=?3").bind(slot,html,Date.now()).run(); return new Response(JSON.stringify({ok:true}),{headers:cors});}
  return new Response(JSON.stringify({error:'method'}),{status:400,headers:cors});
}
