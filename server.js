const express=require('express'),http=require('http'),{Server}=require('socket.io'),path=require('path'),fs=require('fs'),cors=require('cors');
const app=express(),server=http.createServer(app),io=new Server(server,{cors:{origin:'*'}});
app.use(cors());app.use(express.json({limit:'20mb'}));app.use(express.static(path.join(__dirname,'public')));
const DB_FILE=path.join(__dirname,'krmu_data.json');
function readDB(){try{if(fs.existsSync(DB_FILE))return JSON.parse(fs.readFileSync(DB_FILE,'utf8'));}catch(e){}return{menu:[],offers:[],orders:[],students:{},qrs:{},canteens:{},feedback:[],settings:{managerPassword:'krmu@admin'}};}
function writeDB(d){fs.writeFileSync(DB_FILE,JSON.stringify(d,null,2),'utf8');}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}

// ─── PASSWORD (priority: ENV VAR → DB → default) ──────────────────────────
// Deploy pe Railway/Render dashboard mein MANAGER_PASSWORD env var set karo
function getMgrPw(){
  if(process.env.MANAGER_PASSWORD)return process.env.MANAGER_PASSWORD;
  const db=readDB();
  return(db.settings&&db.settings.managerPassword)||'krmu@admin';
}

// ─── SEED (fresh install) ──────────────────────────────────────────────────
(function seed(){
  const db=readDB();if(db.menu.length>0)return;
  const now=Date.now();
  db.menu=[
    {id:'a1',name:'Veg Thali',emoji:'🍱',photo:null,price:70,canteen:'A Block',category:'Meals',description:'Dal, sabzi, roti & rice',type:'veg',available:true,createdAt:now},
    {id:'a2',name:'Aloo Paratha',emoji:'🫓',photo:null,price:40,canteen:'A Block',category:'Snacks',description:'Stuffed with curd & pickle',type:'veg',available:true,createdAt:now},
    {id:'a3',name:'Samosa (2 pcs)',emoji:'🔺',photo:null,price:15,canteen:'A Block',category:'Snacks',description:'Crispy with green chutney',type:'veg',available:true,createdAt:now},
    {id:'a4',name:'Masala Chai',emoji:'☕',photo:null,price:12,canteen:'A Block',category:'Beverages',description:'Ginger & cardamom spiced',type:'veg',available:true,createdAt:now},
    {id:'a5',name:'Dal Makhani + Rice',emoji:'🫕',photo:null,price:65,canteen:'A Block',category:'Meals',description:'Creamy black dal, basmati',type:'veg',available:true,createdAt:now},
    {id:'a6',name:'Paneer Bhurji',emoji:'🍳',photo:null,price:55,canteen:'A Block',category:'Meals',description:'Scrambled cottage cheese',type:'veg',available:true,createdAt:now},
    {id:'b1',name:'Veg Burger',emoji:'🍔',photo:null,price:80,canteen:'B Block – Basil',category:'Snacks',description:'Crispy patty, cheese & sauce',type:'veg',available:true,createdAt:now},
    {id:'b2',name:'Club Sandwich',emoji:'🥪',photo:null,price:90,canteen:'B Block – Basil',category:'Snacks',description:'Triple-decker with veggies',type:'veg',available:true,createdAt:now},
    {id:'b3',name:'French Fries',emoji:'🍟',photo:null,price:55,canteen:'B Block – Basil',category:'Snacks',description:'Crispy golden with dip',type:'veg',available:true,createdAt:now},
    {id:'b4',name:'Cold Coffee',emoji:'🧋',photo:null,price:65,canteen:'B Block – Basil',category:'Beverages',description:'Rich blended with ice cream',type:'veg',available:true,createdAt:now},
    {id:'b5',name:'Penne Pasta',emoji:'🍝',photo:null,price:100,canteen:'B Block – Basil',category:'Meals',description:'Arrabbiata or Alfredo',type:'veg',available:true,createdAt:now},
    {id:'b6',name:'Veg Pizza',emoji:'🍕',photo:null,price:120,canteen:'B Block – Basil',category:'Meals',description:'Personal size, loaded veggies',type:'veg',available:true,createdAt:now},
    {id:'n1',name:'Cappuccino',emoji:'☕',photo:null,price:80,canteen:'C Block – Nescafé',category:'Beverages',description:'Espresso with steamed foam',type:'veg',available:true,createdAt:now},
    {id:'n2',name:'Café Latte',emoji:'🥛',photo:null,price:90,canteen:'C Block – Nescafé',category:'Beverages',description:'Smooth espresso, velvety milk',type:'veg',available:true,createdAt:now},
    {id:'n3',name:'Hot Chocolate',emoji:'🍫',photo:null,price:85,canteen:'C Block – Nescafé',category:'Beverages',description:'Rich & creamy cocoa',type:'veg',available:true,createdAt:now},
    {id:'n4',name:'Croissant',emoji:'🥐',photo:null,price:60,canteen:'C Block – Nescafé',category:'Snacks',description:'Flaky butter croissant',type:'veg',available:true,createdAt:now},
    {id:'n5',name:'Cold Brew',emoji:'🧊',photo:null,price:95,canteen:'C Block – Nescafé',category:'Beverages',description:'Slow-steeped iced coffee',type:'veg',available:true,createdAt:now},
    {id:'n6',name:'Matcha Latte',emoji:'🍵',photo:null,price:110,canteen:'C Block – Nescafé',category:'Beverages',description:'Premium Japanese matcha',type:'veg',available:true,createdAt:now},
    {id:'c1',name:'CCD Latte',emoji:'☕',photo:null,price:130,canteen:'C Block – CCD',category:'Beverages',description:'Classic café coffee latte',type:'veg',available:true,createdAt:now},
    {id:'c2',name:'Cold Coffee Blast',emoji:'🧊',photo:null,price:145,canteen:'C Block – CCD',category:'Beverages',description:'Frappe with whipped cream',type:'veg',available:true,createdAt:now},
    {id:'c3',name:'Chocolate Muffin',emoji:'🧁',photo:null,price:90,canteen:'C Block – CCD',category:'Desserts',description:'Moist chocolate chunk',type:'veg',available:true,createdAt:now},
    {id:'c4',name:'Brownie',emoji:'🍫',photo:null,price:95,canteen:'C Block – CCD',category:'Desserts',description:'Warm fudgy brownie',type:'veg',available:true,createdAt:now},
    {id:'c5',name:'Veggie Wrap',emoji:'🌯',photo:null,price:110,canteen:'C Block – CCD',category:'Snacks',description:'Grilled veggies in tortilla',type:'veg',available:true,createdAt:now},
    {id:'m1',name:'Chicken Biryani',emoji:'🍛',photo:null,price:85,canteen:'C Block – Main',category:'Meals',description:'Fragrant basmati & chicken',type:'nonveg',available:true,createdAt:now},
    {id:'m2',name:'Paneer Tikka',emoji:'🧀',photo:null,price:110,canteen:'C Block – Main',category:'Meals',description:'Chargrilled cottage cheese',type:'veg',available:true,createdAt:now},
    {id:'m3',name:'Masala Dosa',emoji:'🫔',photo:null,price:50,canteen:'C Block – Main',category:'Meals',description:'Crispy with sambar & chutney',type:'veg',available:true,createdAt:now},
    {id:'m4',name:'Idli Sambar',emoji:'⬜',photo:null,price:35,canteen:'C Block – Main',category:'Meals',description:'Soft idlis, hot sambar',type:'veg',available:true,createdAt:now},
    {id:'m5',name:'Mango Lassi',emoji:'🥭',photo:null,price:45,canteen:'C Block – Main',category:'Beverages',description:'Fresh mango yoghurt',type:'veg',available:true,createdAt:now},
    {id:'m6',name:'Egg Curry + Rice',emoji:'🍳',photo:null,price:75,canteen:'C Block – Main',category:'Meals',description:'Homestyle egg curry with rice',type:'nonveg',available:true,createdAt:now},
    {id:'m7',name:'Chole Bhature',emoji:'🫓',photo:null,price:60,canteen:'C Block – Main',category:'Meals',description:'Spiced chickpea with bhature',type:'veg',available:true,createdAt:now},
  ];
  db.offers=[
    {id:'o1',title:'Happy Hour',emoji:'⏰',description:'20% off on all Beverages 2–4PM',type:'percent',value:20,scope:'category',scope_val:'Beverages',active:true,createdAt:now},
    {id:'o2',title:'Lunch Rush',emoji:'🍽️',description:'₹10 off on Meals above ₹60',type:'flat',value:10,scope:'category',scope_val:'Meals',active:true,createdAt:now},
  ];
  db.canteens={'A Block':true,'B Block – Basil':true,'C Block – Nescafé':true,'C Block – CCD':true,'C Block – Main':true};
  writeDB(db);console.log('✅ Default data seeded');
})();

// ─── MIGRATIONS (run every boot) ──────────────────────────────────────────
(function migrate(){
  const db=readDB();let changed=false;
  // 1. Rename B Block Nescafé → C Block Nescafé
  if(db.canteens&&db.canteens['B Block – Nescafé']!==undefined){
    db.canteens['C Block – Nescafé']=db.canteens['B Block – Nescafé'];
    delete db.canteens['B Block – Nescafé'];changed=true;
  }
  db.menu.forEach(item=>{
    if(item.canteen==='B Block – Nescafé'){item.canteen='C Block – Nescafé';changed=true;}
    // 2. Add photo field if missing
    if(item.photo===undefined){item.photo=null;changed=true;}
  });
  if(changed){writeDB(db);console.log('✅ Migrations applied');}
})();

// ─── MENU ──────────────────────────────────────────────────────────────────
app.get('/api/menu',(req,res)=>res.json(readDB().menu));
app.post('/api/menu',(req,res)=>{const{name,emoji,price,canteen,category,description,type,photo}=req.body;if(!name||!price||!canteen)return res.status(400).json({error:'name,price,canteen required'});const db=readDB();const item={id:'item_'+uid(),name,emoji:emoji||'🍽️',photo:photo||null,price:+price,canteen,category:category||'Meals',description:description||'',type:type||'veg',available:true,createdAt:Date.now()};db.menu.push(item);writeDB(db);io.emit('menu:updated',{action:'added',item});res.json(item);});
app.put('/api/menu/:id',(req,res)=>{const db=readDB();const i=db.menu.findIndex(m=>m.id===req.params.id);if(i===-1)return res.status(404).json({error:'Not found'});const u=req.body;if(u.price)u.price=+u.price;db.menu[i]={...db.menu[i],...u};writeDB(db);io.emit('menu:updated',{action:'updated',item:db.menu[i]});res.json(db.menu[i]);});
app.delete('/api/menu/:id',(req,res)=>{const db=readDB();if(!db.menu.find(m=>m.id===req.params.id))return res.status(404).json({error:'Not found'});db.menu=db.menu.filter(m=>m.id!==req.params.id);writeDB(db);io.emit('menu:updated',{action:'deleted',id:req.params.id});res.json({success:true});});
app.patch('/api/menu/:id/toggle',(req,res)=>{const db=readDB();const i=db.menu.findIndex(m=>m.id===req.params.id);if(i===-1)return res.status(404).json({error:'Not found'});db.menu[i].available=!db.menu[i].available;writeDB(db);io.emit('menu:updated',{action:'toggled',item:db.menu[i]});res.json(db.menu[i]);});

// ─── CANTEENS ──────────────────────────────────────────────────────────────
app.get('/api/canteens',(req,res)=>{const db=readDB();res.json(db.canteens||{});});
app.patch('/api/canteens/:name/toggle',(req,res)=>{const name=decodeURIComponent(req.params.name);const db=readDB();if(!db.canteens)db.canteens={};db.canteens[name]=db.canteens[name]===false?true:false;writeDB(db);io.emit('canteen:statusChanged',{canteen:name,open:db.canteens[name]!==false});res.json({canteen:name,open:db.canteens[name]!==false});});

// ─── OFFERS ────────────────────────────────────────────────────────────────
app.get('/api/offers',(req,res)=>res.json(readDB().offers));
app.post('/api/offers',(req,res)=>{const{title,emoji,description,type,value,scope,scope_val}=req.body;if(!title||!value)return res.status(400).json({error:'title and value required'});const db=readDB();const offer={id:'offer_'+uid(),title,emoji:emoji||'🎁',description:description||'',type:type||'percent',value:+value,scope:scope||'all',scope_val:scope_val||'',active:true,createdAt:Date.now()};db.offers.push(offer);writeDB(db);io.emit('offers:updated');res.json(offer);});
app.patch('/api/offers/:id/toggle',(req,res)=>{const db=readDB();const i=db.offers.findIndex(o=>o.id===req.params.id);if(i===-1)return res.status(404).json({error:'Not found'});db.offers[i].active=!db.offers[i].active;writeDB(db);io.emit('offers:updated');res.json({success:true,active:db.offers[i].active});});
app.delete('/api/offers/:id',(req,res)=>{const db=readDB();db.offers=db.offers.filter(o=>o.id!==req.params.id);writeDB(db);io.emit('offers:updated');res.json({success:true});});

// ─── ORDERS ────────────────────────────────────────────────────────────────
app.get('/api/orders',(req,res)=>{const db=readDB();res.json([...db.orders].sort((a,b)=>b.createdAt-a.createdAt));});
app.get('/api/orders/student/:sid',(req,res)=>{const db=readDB();res.json(db.orders.filter(o=>o.student_id===req.params.sid).sort((a,b)=>b.createdAt-a.createdAt));});
app.get('/api/orders/:id',(req,res)=>{const db=readDB();const o=db.orders.find(o=>o.id===req.params.id);if(!o)return res.status(404).json({error:'Not found'});res.json(o);});
app.post('/api/orders',(req,res)=>{const{student_id,canteen,items,subtotal,discount,total,eta,notes,payer_name}=req.body;if(!student_id||!canteen||!items||!total)return res.status(400).json({error:'Missing fields'});const db=readDB();const id='KRM'+Date.now().toString().slice(-6);const order={id,student_id,canteen,items,subtotal:subtotal||0,discount:discount||0,total:+total,status:'placed',eta:eta||15,notes:notes||'',payer_name:payer_name||'',createdAt:Date.now()};db.orders.push(order);if(!db.students[student_id])db.students[student_id]={id:student_id,firstSeen:Date.now(),lastSeen:Date.now(),totalOrders:0,totalSpent:0};db.students[student_id].lastSeen=Date.now();db.students[student_id].totalOrders+=1;db.students[student_id].totalSpent+=+total;writeDB(db);io.emit('order:new',order);res.json(order);});
app.patch('/api/orders/:id/status',(req,res)=>{const{status}=req.body;if(!['placed','confirmed','preparing','ready','done'].includes(status))return res.status(400).json({error:'Invalid status'});const db=readDB();const i=db.orders.findIndex(o=>o.id===req.params.id);if(i===-1)return res.status(404).json({error:'Not found'});db.orders[i].status=status;writeDB(db);io.emit('order:statusChanged',{orderId:req.params.id,status,order:db.orders[i]});res.json(db.orders[i]);});
app.delete('/api/orders/all',(req,res)=>{const db=readDB();db.orders=[];writeDB(db);res.json({success:true});});

// ─── STUDENTS ──────────────────────────────────────────────────────────────
app.get('/api/students',(req,res)=>{const db=readDB();res.json(Object.values(db.students||{}).sort((a,b)=>b.lastSeen-a.lastSeen));});
app.get('/api/students/:id',(req,res)=>{const db=readDB();const s=db.students[req.params.id];if(!s)return res.status(404).json({error:'Student not found'});const orders=db.orders.filter(o=>o.student_id===req.params.id).sort((a,b)=>b.createdAt-a.createdAt);res.json({...s,orders});});

// ─── QR (with required account_name) ──────────────────────────────────────
app.get('/api/qr',(req,res)=>res.json(readDB().qrs||{}));
app.post('/api/qr/:canteen',(req,res)=>{
  const{image_data,account_name}=req.body;
  if(!image_data)return res.status(400).json({error:'image_data required'});
  if(!account_name||!account_name.trim())return res.status(400).json({error:'account_name required'});
  const canteen=decodeURIComponent(req.params.canteen);
  const db=readDB();if(!db.qrs)db.qrs={};
  db.qrs[canteen]={image_data,account_name:account_name.trim()};
  writeDB(db);io.emit('qr:updated',{canteen});res.json({success:true});
});
app.delete('/api/qr/:canteen',(req,res)=>{const canteen=decodeURIComponent(req.params.canteen);const db=readDB();if(db.qrs)delete db.qrs[canteen];writeDB(db);io.emit('qr:updated',{canteen});res.json({success:true});});

// ─── AUTH ──────────────────────────────────────────────────────────────────
app.post('/api/auth/manager',(req,res)=>{const{username,password}=req.body;if(username==='admin'&&password===getMgrPw())res.json({success:true,username:'admin'});else res.status(401).json({error:'Invalid credentials'});});
app.patch('/api/auth/manager/password',(req,res)=>{const{currentPassword,newPassword}=req.body;if(!newPassword||newPassword.length<6)return res.status(400).json({error:'New password must be at least 6 characters'});if(currentPassword!==getMgrPw())return res.status(401).json({error:'Current password is incorrect'});const db=readDB();if(!db.settings)db.settings={};db.settings.managerPassword=newPassword;writeDB(db);res.json({success:true});});
// SECRET RESET — set RESET_TOKEN env var, then visit /api/auth/reset?token=YOUR_TOKEN
app.get('/api/auth/reset',(req,res)=>{
  const{token,newpw}=req.query;
  const secret=process.env.RESET_TOKEN;
  if(!secret)return res.status(403).send('<h2>❌ Not configured</h2><p>Add RESET_TOKEN to your environment variables first.</p>');
  if(token!==secret)return res.status(401).send('<h2>❌ Invalid token</h2>');
  const resetTo=newpw&&newpw.length>=6?newpw:'krmu@admin';
  const db=readDB();if(!db.settings)db.settings={};
  db.settings.managerPassword=resetTo;writeDB(db);
  res.send(`<html><body style="font-family:sans-serif;background:#0d0b09;color:#f0e8d8;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;flex-direction:column;gap:12px">
    <div style="font-size:48px">✅</div>
    <h2 style="color:#c8a96e">Password Reset Successful</h2>
    <p>New password: <code style="background:#1a1714;padding:4px 12px;border-radius:6px;color:#c8a96e;font-size:18px">${resetTo}</code></p>
    <p style="color:#554e44;font-size:13px">Username: admin</p>
    <a href="/manager.html" style="margin-top:16px;background:#c8a96e;color:#000;padding:10px 24px;border-radius:10px;text-decoration:none;font-weight:700">Go to Manager Login →</a>
  </body></html>`);
});
app.post('/api/auth/google',(req,res)=>{const{name,email,picture,id}=req.body;const userId=id||email?.split('@')[0]||'student';res.json({success:true,user:{name:name||userId,email:email||userId+'@krmangalam.edu.in',picture:picture||'',id:userId}});});

// ─── ANALYTICS ─────────────────────────────────────────────────────────────
app.get('/api/analytics',(req,res)=>{const db=readDB();const ts=new Date().setHours(0,0,0,0);const tod=db.orders.filter(o=>o.createdAt>=ts);const cr={};db.orders.forEach(o=>{cr[o.canteen]=(cr[o.canteen]||0)+o.total;});res.json({todayOrders:tod.length,todayRevenue:tod.reduce((a,o)=>a+o.total,0),totalOrders:db.orders.length,totalStudents:Object.keys(db.students||{}).length,canteenRevenue:cr,recentOrders:[...db.orders].sort((a,b)=>b.createdAt-a.createdAt).slice(0,10)});});

// ─── FEEDBACK ──────────────────────────────────────────────────────────────
app.get('/api/feedback',(req,res)=>{const db=readDB();res.json((db.feedback||[]).sort((a,b)=>b.createdAt-a.createdAt));});
app.post('/api/feedback',(req,res)=>{
  const{order_id,student_id,canteen,food_rating,service_rating,review,items,payer_name}=req.body;
  if(!order_id||!student_id||!food_rating)return res.status(400).json({error:'Missing fields'});
  const db=readDB();if(!db.feedback)db.feedback=[];
  if(db.feedback.find(f=>f.order_id===order_id))return res.status(400).json({error:'Already submitted'});
  const fb={id:'fb_'+uid(),order_id,student_id,payer_name:payer_name||'',canteen:canteen||'',food_rating:+food_rating,service_rating:+(service_rating||food_rating),review:review||'',items:items||[],createdAt:Date.now()};
  db.feedback.push(fb);writeDB(db);io.emit('feedback:new',fb);res.json(fb);
});
app.delete('/api/feedback/:id',(req,res)=>{const db=readDB();if(!db.feedback)return res.json({success:true});db.feedback=(db.feedback||[]).filter(f=>f.id!==req.params.id);writeDB(db);res.json({success:true});});
// ─── SOCKET ────────────────────────────────────────────────────────────────
io.on('connection',s=>{console.log('📱 Connected:',s.id);s.on('disconnect',()=>console.log('📴 Disconnected'));});

const PORT=process.env.PORT||3000;
server.listen(PORT,()=>{console.log('\n🚀 KRMU Bites → http://localhost:'+PORT+'\n🎓 Student: http://localhost:'+PORT+'/student.html\n🔐 Manager: http://localhost:'+PORT+'/manager.html\n');});
