const KEY_USERS="mahjong_users"; const KEY_SETTINGS="mahjong_settings";

function loadUsers(){return JSON.parse(localStorage.getItem(KEY_USERS)||"{}");} function saveUsers(x){localStorage.setItem(KEY_USERS,JSON.stringify(x));} function loadSettings(){return JSON.parse(localStorage.getItem(KEY_SETTINGS)||"{winRate:30,forceWin:false}");} function saveSettings(x){localStorage.setItem(KEY_SETTINGS,JSON.stringify(x));}

function refresh(){ const u=loadUsers(); info.innerText="Balance Player: "+(u.player?.balance||0); const s=loadSettings(); rate.value=s.winRate||30; force.checked=!!s.forceWin; }

function addCoin(){ const u=loadUsers(); if(!u.player)return; u.player.balance+=parseInt(add.value||0); saveUsers(u); refresh(); }

function saveRate(){ saveSettings({ winRate:Math.max(0,Math.min(100,parseInt(rate.value||30))), forceWin:force.checked }); refresh(); }

refresh();
