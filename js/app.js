/* Cube, reveal and unattended (attract) mode logic. Content lives in storylines.js. */

const $=id=>document.getElementById(id);
ROWS.forEach((r,i)=>{
  $('face'+i).innerHTML=ICONS[i]+`<div class="fn">${r.ind}</div><div class="fs">${r.story}</div>`;
  const b=document.createElement('button');b.className='pickbtn';b.textContent=r.ind;
  b.addEventListener('click',()=>{userAct();go(i)});$('actions').appendChild(b);
});
TECH.forEach((t,k)=>{$('c'+k).innerHTML=`<div class="tech">${t.logo}<b>${t.n}</b></div><p>${t.tag}. Roll the cube to see the use case.</p>`});
function demoDefault(){
  $('c3').innerHTML=`<div class="dk">Live demo</div><h4>See it running at our booth</h4>
   <div class="ds">Each storyline is a working demo on Databricks, not slides.</div>
   <ol>${ROWS.map(r=>`<li><span><em>${r.ind}</em>${r.story}</span></li>`).join('')}</ol>
   <div class="foot"><span>Ask the Diggibyte team for a walkthrough</span><b>About 5 min each</b></div>`;
}
demoDefault();

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let ax=0,ay=-180,cur=-1,busy=false;
const cube=$('cube');cube.style.transform=`rotateX(${ax}deg) rotateY(${ay}deg)`;
const next=(now,t,s)=>t+360*Math.ceil((now+s*360-t)/360);
function go(i){
  if(busy)return;busy=true;$('roll').disabled=true;
  [0,1,2,3].forEach(k=>$('c'+k).classList.add('out'));
  const s=reduce?0:2;ax=next(ax,ROWS[i].rot[0],s);ay=next(ay,ROWS[i].rot[1],s+1);
  cube.style.transform=`rotateX(${ax}deg) rotateY(${ay}deg)`;
  setTimeout(()=>reveal(i),reduce?200:1650);
}
function reveal(i){
  cur=i;const r=ROWS[i];
  $('kicker').textContent=r.ind;$('title').textContent=r.story;$('org').textContent=r.org;$('prob').textContent=r.prob;
  $('facts').innerHTML=`<dt>Sources</dt><dd>${r.src}</dd><dt>Shared record</dt><dd><b>${r.key}</b> links all three use cases</dd>`;
  $('uchead').textContent=`${r.story}: use cases & live demo`;$('ucsub').textContent=r.ind;
  document.querySelectorAll('.pickbtn').forEach((b,k)=>b.setAttribute('aria-current',k===i));
  r.cells.forEach((c,k)=>{
    const el=$('c'+k);el.className='card out';
    el.innerHTML=`<div class="tech">${TECH[k].logo}<b>${TECH[k].n}</b></div><div class="tag">${TECH[k].tag}</div>
      <h4>${c.t}</h4>
      <dl class="row"><dt>Problem</dt><dd>${c.p}</dd></dl>
      <dl class="row"><dt>Outcome</dt><dd>${c.v}</dd></dl>
      <div class="meta"><div class="stack">${c.stack.map(s=>`<span>${s}</span>`).join('')}</div><div class="who">${c.who}</div></div>`;
    setTimeout(()=>el.classList.remove('out'),reduce?0:100+k*150);
  });
  const d=$('c3');d.className='card demo out';
  d.innerHTML=`<div class="dk">Live demo · ${r.demo.len}</div><h4>${r.story}</h4><div class="ds">${r.org}</div>
    <ol>${r.demo.steps.map(s=>`<li><span><em>${s[0]}</em>${s[1]}</span></li>`).join('')}</ol>
    <div class="foot"><span>Shared record: <b>${r.key}</b></span><span>Ask us to run it live</span></div>`;
  setTimeout(()=>d.classList.remove('out'),reduce?0:550);
  setTimeout(()=>{busy=false;$('roll').disabled=false},reduce?0:750);
}
function roll(){let i;do{i=Math.floor(Math.random()*3)}while(i===cur);go(i)}
$('roll').addEventListener('click',()=>{userAct();roll()});
document.addEventListener('keydown',e=>{if(e.code==='Space'&&e.target===document.body){e.preventDefault();userAct();roll()}});

// unattended mode: after 40s idle, roll every 20s until a visitor interacts
let idle,attract;
function userAct(){clearInterval(attract);attract=null;clearTimeout(idle);idle=setTimeout(()=>{attract=setInterval(roll,20000);roll()},40000)}
userAct();
