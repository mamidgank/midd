const KEY_USERS="mahjong_users"; const KEY_SETTINGS="mahjong_settings";

function loadUsers(){return JSON.parse(localStorage.getItem(KEY_USERS)||"{}");} function saveUsers(x){localStorage.setItem(KEY_USERS,JSON.stringify(x));} function loadSettings(){return JSON.parse(localStorage.getItem(KEY_SETTINGS)||"{winRate:30,forceWin:false}");}

let users=loadUsers(); if(!users.player){users.player={balance:1000,lastRefill:null};saveUsers(users);}

const sym=["🀄","🀙","🀚","🀛","🀜","🀝"];

function rand(){return sym[Math.floor(Math.random()*sym.length)]}

function refresh(){document.getElementById("bal").innerText=loadUsers().player.balance}

function show(a,b,c){ r1.textContent=a; r2.textContent=b; r3.textContent=c; }

function spin(){ users=loadUsers(); if(users.player.balance<100){alert("Coin tidak cukup");return} users.player.balance-=100;

const set=loadSettings(); const winChance=set.forceWin?100:set.winRate||30; const win=Math.random()*100<winChance;

let a=rand(),b=rand(),c=rand(); if(win){a=b=c="🀄"}

let i=0; const anim=setInterval(()=>{ show(rand(),rand(),rand()); if(++i>10){ clearInterval(anim); show(a,b,c); if(win){ users.player.balance+=300; result.innerText="MENANG +300"; r1.classList.add("win");r2.classList.add("win");r3.classList.add("win"); setTimeout(()=>{r1.classList.remove("win");r2.classList.remove("win");r3.classList.remove("win")},900); } else result.innerText="Coba lagi"; saveUsers(users); refresh(); } },80); }

function refill(){ users=loadUsers(); const t=new Date().toDateString(); if(users.player.lastRefill===t){alert("Sudah refill hari ini");return} users.player.balance+=500; users.player.lastRefill=t; saveUsers(users); refresh(); }

refresh();
