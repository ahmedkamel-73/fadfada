export async function onRequest({request, env}) {
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Content-Type':'application/json'};
  if(request.method==='OPTIONS') return new Response(null,{headers:cors});
  const DB=env.DB; const {phone,action,id}=await request.json().catch(()=>({}));
  if(action==='create'){const u=await DB.prepare("SELECT * FROM users WHERE phone=?1").bind(phone).first(); if(!u||u.points<100000) return new Response(JSON.stringify({error:'نقط غير كافية'}),{status:400,headers:cors}); await DB.prepare("UPDATE users SET points=points-100000 WHERE phone=?1").bind(phone).run(); await DB.prepare("INSERT INTO withdrawals (id,phone,username,amount,points,status,date) VALUES (?1,?2,?3,100,100000,'pending',?4)").bind(id,u.phone,u.username,Date.now()).run(); return new Response(JSON.stringify({ok:true}),{headers:cors});}
  return new Response(JSON.stringify({error:'action'}),{status:400,headers:cors});
}
