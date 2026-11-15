(function(){
var K='holt_issue_v1';
function get(){try{return JSON.parse(localStorage.getItem(K)||'{}')}catch(e){return {}}}
function put(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
var KD='holt_issue_done_v1';
function getd(){try{return JSON.parse(localStorage.getItem(KD)||'{}')}catch(e){return {}}}
function putd(o){try{localStorage.setItem(KD,JSON.stringify(o))}catch(e){}}
function ev(n,p){try{if(window.gtag)gtag('event',n,p||{})}catch(e){}}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('a');if(!t)return;if(t.classList.contains('install'))return ev('install_click');if(t.closest('nav.menu,header nav.right')){try{var u=new URL(t.href),k=u.host!==location.host?u.host.split('.')[0]:(u.pathname.replace(/^\//,'').replace(/(\/?index)?\.html$/,'').replace(/[^a-z0-9]+/g,'_')||'home');ev('menu_'+k.slice(0,30))}catch(e){}}},true); // 1115 사용자: '앱으로 설치' 누름도 방문 요약에
function score(){var s=document.querySelector('.score');if(!s)return;var all=document.querySelectorAll('.q'),d=0,ok=0;if(!all.length)return;
for(var i=0;i<all.length;i++){if(all[i].classList.contains('done')){d++;if(all[i].classList.contains('right'))ok++}}
s.textContent=d?(all.length+'문제 중 '+d+'문제 풀이, '+ok+'문제 정답'):(all.length+'문제');}
function bind(q){var bs=q.querySelectorAll('.ch button'),ans=+q.getAttribute('data-ans'),id=q.getAttribute('data-id');
for(var i=0;i<bs.length;i++)(function(b,i){b.addEventListener('click',function(){
if(q.classList.contains('done'))return;q.classList.add('done');var right=(i===ans);q.classList.add(right?'right':'wrong');
bs[ans].classList.add('ok');if(!right)b.classList.add('no');
var a=q.querySelector('.ex .ans');if(a){a.classList.add(right?'ok':'no');a.textContent=right?'정답이에요. '+a.getAttribute('data-t'):'틀렸어요. 고른 답 '+'①②③④'.charAt(i)+', '+a.getAttribute('data-t')}
bs[ans].insertAdjacentHTML('beforeend','<span class="vh"> (정답)</span>');if(!right)b.insertAdjacentHTML('beforeend','<span class="vh"> (고른 답, 오답)</span>');for(var j=0;j<bs.length;j++)bs[j].setAttribute('aria-disabled','true');if(window.a11ySay)a11ySay((right?'정답이에요. ':'틀렸어요. ')+(a?a.getAttribute('data-t'):'')+'. 해설이 펼쳐졌어요.');
var d=q.querySelector('.ex');if(d)d.open=true;
if(!right&&d&&!document.getElementById('notes')){var up=location.pathname.split('/').length>2?'../':'',nt=document.createElement('p');nt.className='to-notes';nt.appendChild(document.createTextNode('이 문제는 오답 노트에 담았어요. '));var na=document.createElement('a');na.href=up+'notes.html';na.textContent='오답 노트 보기';nt.appendChild(na);d.appendChild(nt)}
var dd=getd();dd[id]=1;dd._d=dd._d||{};dd._d[kst(0)]=1;putd(dd);var s=get();if(right){if(s[id])delete s[id]}else{s[id]={c:i,t:Date.now()}}put(s);
ev('quiz_answer',{qid:id,correct:right?1:0});score();});})(bs[i],i);}
var qs=document.querySelectorAll('.q');for(var i=0;i<qs.length;i++)bind(qs[i]);score();
/* ECON 101 그래프 — 화면에 들어오면 선이 그어짐 */
var egs=document.querySelectorAll('svg.eg');for(i=0;i<egs.length;i++)egs[i].classList.add('anim');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{threshold:.35});for(i=0;i<egs.length;i++)io.observe(egs[i])}else{for(i=0;i<egs.length;i++)egs[i].classList.add('on')}
/* ECON 101 계산 문제 — 숫자 넣고 확인, 천 단위 쉼표 자동 */
function fmt(v){var neg=v.charAt(0)==='-',t=v.replace(/[^0-9.]/g,''),p=t.split('.');p[0]=p[0].replace(/^0+(?=\d)/,'').replace(/\B(?=(\d{3})+(?!\d))/g,',');return (neg?'-':'')+p[0]+(p.length>1?'.'+p.slice(1).join(''):'')}
var cq=document.querySelectorAll('.calc-q');for(i=0;i<cq.length;i++)(function(c){var inp=c.querySelector('input'),bt=c.querySelector('.cin button'),out=c.querySelector('.cres'),a=+c.getAttribute('data-a'),id=c.getAttribute('data-id');
inp.addEventListener('input',function(){var n=inp.value.length-inp.selectionStart;inp.value=fmt(inp.value);try{var k=Math.max(inp.value.length-n,0);inp.setSelectionRange(k,k)}catch(e){}});
function go(){var v=parseFloat(inp.value.replace(/,/g,''));if(isNaN(v)){out.className='cres no';out.textContent='숫자를 넣어 주세요.';return}
var ok=Math.abs(v-a)<=Math.max(Math.abs(a)*0.005,0.01);out.className='cres '+(ok?'ok':'no');
out.textContent=ok?'정답이에요. 풀이로 계산 순서를 확인해 보세요.':'아직이에요. 다시 계산해 보거나 풀이를 보세요.';
if(window.a11ySay)a11ySay(out.textContent);ev('calc_answer',{qid:id,correct:ok?1:0});
if(ok){c.classList.add('done','right');var d=c.querySelector('details');if(d)d.open=true;var dd=getd();dd[id]=1;dd._d=dd._d||{};dd._d[kst(0)]=1;putd(dd)}}
bt.addEventListener('click',go);inp.addEventListener('keydown',function(x){if(x.key==='Enter')go()})})(cq[i]);
/* 진도 띠 — 오답 문제 수, 공부한 날 수 */
function kst(o){var d=new Date(Date.now()+9*3600e3-(o||0)*864e5);return d.toISOString().slice(0,10)}
var pg=document.querySelector('.prog');if(pg){(function(){var dn=getd(),nw=Object.keys(get()).length;
var bb=pg.querySelector('.pg-bar');if(bb)bb.hidden=true;pg.querySelector('.pg-t').textContent=pg.getAttribute('data-l')+' '+nw+'문제';
/* 1115 사용자: 오답 노트에 들어오기만 해도 그날이 하루로 세어짐 — 끊겨도 처음부터 다시 세지 않음 */
var days=dn._d=dn._d||{};if(!days[kst(0)]){days[kst(0)]=1;putd(dn)}var st=Object.keys(days).length;
var sp=pg.querySelector('.pg-s');function add(t,h){var x=document.createElement(h?'a':'span');x.textContent=t;if(h)x.href=h;sp.appendChild(x)}
var up=(location.pathname.match(/\/(d|i|m)\/[^\/]*$/)?'../':'');
add('공부한 날 '+st+'일');})()}
/* 용어집 — 그 용어가 나온 이슈를 다 풀었으면 ✓ */
var gl=document.querySelectorAll('.gl [data-q]'),dg=getd();for(var i2=0;i2<gl.length;i2++){var ok2=gl[i2].getAttribute('data-q').split('|').some(function(s){return s.split(' ').every(function(q){return dg[q]})});
if(ok2)gl[i2].querySelector('.lr').textContent='✓ 관련 문제를 다 풀었어요'}
/* 용어집 — 분야 칸과 첫 글자 칸: 고른 것만 남김. 첫 글자는 다시 누르면 풀림, 고른 분야에 없는 글자는 흐리게 */
var fb=document.querySelectorAll('.fnav button'),gb2=document.querySelectorAll('.gnav button'),selF='',selG='';
function gfil(){var ds=document.querySelectorAll('.gl>div');for(var b=0;b<ds.length;b++)ds[b].hidden=!!selF&&(' '+ds[b].getAttribute('data-f')+' ').indexOf(' '+selF+' ')<0;
var hs=document.querySelectorAll('h2.sec[id^="g"]');for(var c=0;c<hs.length;c++){var dl=hs[c].nextElementSibling,any=!!(dl&&dl.querySelector('div:not([hidden])'));
var bt=document.querySelector('.gnav button[data-g="'+hs[c].id+'"]');if(bt){bt.disabled=!any;if(!any&&selG===hs[c].id)selG=''}
var show=any&&(!selG||selG===hs[c].id);hs[c].hidden=dl.hidden=!show}
for(var g=0;g<gb2.length;g++){var on=gb2[g].getAttribute('data-g')===selG;gb2[g].classList.toggle('on',on);gb2[g].setAttribute('aria-pressed',on?'true':'false')}}
for(var f1=0;f1<fb.length;f1++)fb[f1].addEventListener('click',function(){selF=this.getAttribute('data-f');
for(var a=0;a<fb.length;a++){var on=fb[a]===this;fb[a].classList.toggle('on',on);fb[a].setAttribute('aria-pressed',on?'true':'false')}gfil()});
for(var g1=0;g1<gb2.length;g1++)gb2[g1].addEventListener('click',function(){var g=this.getAttribute('data-g');selG=selG===g?'':g;gfil()});
/* 이슈 제목 목록 — 이 기기에서 푼 문제 수 */
var tc=document.querySelectorAll('.toc [data-q]'),dn=getd();for(i=0;i<tc.length;i++){var ids=tc[i].getAttribute('data-q').split(' '),k=0;
for(var j=0;j<ids.length;j++)if(dn[ids[j]])k++;var c=tc[i].querySelector('.c');if(!c||!k)continue;
if(k===ids.length){c.textContent='✓ 다 풀었어요';c.classList.add('all')}else c.textContent=ids.length+'문제 중 '+k+'문제 풀이'}
var gb=document.querySelectorAll('.goback');for(i=0;i<gb.length;i++)gb[i].addEventListener('click',function(){if(history.length>1&&document.referrer)history.back();else location.href=this.getAttribute('data-to')});
var src=document.querySelectorAll('.ex .src');for(i=0;i<src.length;i++)src[i].addEventListener('click',function(){ev('to_news',{url:this.href})});
/* 오답 노트 — 같은 사이트 q.json에서 틀린 문제만 다시 그림 (textContent만 씀) */
var box=document.getElementById('notes');if(!box)return;
var s=get(),ids=Object.keys(s);
var clr=document.getElementById('notes-clear');
if(!ids.length){box.innerHTML='<p class="empty">틀린 문제가 아직 없어요. 문제를 풀다 틀리면 여기에 모여요.</p>';if(clr)clr.hidden=true;return}
fetch('q.json').then(function(r){return r.json()}).then(function(all){
var by={};all.forEach(function(q){by[q.id]=q});
ids.sort(function(a,b){return s[b].t-s[a].t});
ids.forEach(function(id,n){var q=by[id];if(!q)return;
var el=document.createElement('article');el.className='q';el.setAttribute('data-id',id);el.setAttribute('data-ans',q.answer);
var m=document.createElement('p');m.className='meta';m.textContent=q.dl+' · '+q.kind;el.appendChild(m);
var h=document.createElement('h2');h.textContent='Q'+(n+1)+'. '+q.q;el.appendChild(h);
var ol=document.createElement('ol');ol.className='ch';
q.choices.forEach(function(c,i){var li=document.createElement('li'),b=document.createElement('button');b.type='button';
var k=document.createElement('b');k.textContent='①②③④'.charAt(i);b.appendChild(k);b.appendChild(document.createTextNode(' '+c));li.appendChild(b);ol.appendChild(li)});
el.appendChild(ol);
var d=document.createElement('details');d.className='ex';var su=document.createElement('summary');su.textContent='정답과 해설';d.appendChild(su);
var a=document.createElement('p');a.className='ans';var t='정답 '+'①②③④'.charAt(q.answer)+' '+q.choices[q.answer];a.setAttribute('data-t',t);a.textContent=t;d.appendChild(a);
var w=document.createElement('p');w.textContent=q.why;d.appendChild(w);
var l=document.createElement('a');l.className='src';l.href=q.url;l.target='_blank';l.rel='noopener';l.textContent='기사 자세히 보기: '+q.st+' ↗';d.appendChild(l);
if(q.ip){var ip=document.createElement('a');ip.className='src';ip.style.marginLeft='14px';ip.href=q.ip;ip.textContent='이슈 정리 다시 보기';d.appendChild(ip)}
el.appendChild(d);
/* 1115 사용자: 문제마다 오른쪽 아래 휴지통 — 누르면 오답 노트에서 빠짐 */
var del=document.createElement('button');del.type='button';del.className='del';del.setAttribute('aria-label','이 문제를 오답 노트에서 빼기');del.title='오답 노트에서 빼기';
var NS='http://www.w3.org/2000/svg',sv=document.createElementNS(NS,'svg');sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('aria-hidden','true');
['M4 7h16','M10 11v6','M14 11v6','M6 7l1 13h10l1-13','M9 7V4h6v3'].forEach(function(dd){var pa=document.createElementNS(NS,'path');pa.setAttribute('d',dd);sv.appendChild(pa)});
del.appendChild(sv);del.addEventListener('click',function(){var o=get();delete o[id];put(o);el.parentNode.removeChild(el);var left=document.querySelectorAll('#notes .q').length;
var sc2=document.querySelector('.score');if(sc2)sc2.textContent=left?left+'문제':'';var pt=document.querySelector('.prog .pg-t');if(pt)pt.textContent='오답 '+left+'문제';if(!left){box.innerHTML='<p class="empty">틀린 문제가 아직 없어요. 문제를 풀다 틀리면 여기에 모여요.</p>';if(clr)clr.hidden=true}ev('note_remove',{qid:id})});
el.appendChild(del);box.appendChild(el);bind(el);});
var sc=document.querySelector('.score');if(sc)sc.textContent=ids.length+'문제';
});
if(clr)clr.addEventListener('click',function(){if(confirm('오답 노트를 비울까요?')){put({});location.reload()}});
})();
