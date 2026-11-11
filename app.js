(function(){
var K='holt_issue_v1';
function get(){try{return JSON.parse(localStorage.getItem(K)||'{}')}catch(e){return {}}}
function put(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
function ev(n,p){try{if(window.gtag)gtag('event',n,p||{})}catch(e){}}
function score(){var s=document.querySelector('.score');if(!s)return;var all=document.querySelectorAll('.q'),d=0,ok=0;
for(var i=0;i<all.length;i++){if(all[i].classList.contains('done')){d++;if(all[i].classList.contains('right'))ok++}}
s.textContent=d?(all.length+'문제 중 '+d+'문제 풀이, '+ok+'문제 정답'):(all.length+'문제');}
function bind(q){var bs=q.querySelectorAll('.ch button'),ans=+q.getAttribute('data-ans'),id=q.getAttribute('data-id');
for(var i=0;i<bs.length;i++)(function(b,i){b.addEventListener('click',function(){
if(q.classList.contains('done'))return;q.classList.add('done');var right=(i===ans);q.classList.add(right?'right':'wrong');
bs[ans].classList.add('ok');if(!right)b.classList.add('no');
var a=q.querySelector('.ex .ans');if(a){a.classList.add(right?'ok':'no');a.textContent=(right?'정답이에요. ':'틀렸어요. ')+a.getAttribute('data-t')}
var d=q.querySelector('.ex');if(d)d.open=true;
var s=get();if(right){if(s[id])delete s[id]}else{s[id]={c:i,t:Date.now()}}put(s);
ev('quiz_answer',{qid:id,correct:right?1:0});score();});})(bs[i],i);}
var qs=document.querySelectorAll('.q');for(var i=0;i<qs.length;i++)bind(qs[i]);score();
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
var m=document.createElement('p');m.className='meta';m.textContent=q.dl+' · '+q.fl+' · '+q.kind;el.appendChild(m);
var h=document.createElement('h2');h.textContent='Q'+(n+1)+'. '+q.q;el.appendChild(h);
var ol=document.createElement('ol');ol.className='ch';
q.choices.forEach(function(c,i){var li=document.createElement('li'),b=document.createElement('button');b.type='button';
var k=document.createElement('b');k.textContent='①②③④'.charAt(i);b.appendChild(k);b.appendChild(document.createTextNode(' '+c));li.appendChild(b);ol.appendChild(li)});
el.appendChild(ol);
var d=document.createElement('details');d.className='ex';var su=document.createElement('summary');su.textContent='정답과 해설';d.appendChild(su);
var a=document.createElement('p');a.className='ans';var t='정답 '+'①②③④'.charAt(q.answer)+' '+q.choices[q.answer];a.setAttribute('data-t',t);a.textContent=t;d.appendChild(a);
var w=document.createElement('p');w.textContent=q.why;d.appendChild(w);
var l=document.createElement('a');l.className='src';l.href=q.url;l.target='_blank';l.rel='noopener';l.textContent='기사 자세히 보기: '+q.st+' ↗';d.appendChild(l);
el.appendChild(d);box.appendChild(el);bind(el);});
var sc=document.querySelector('.score');if(sc)sc.textContent=ids.length+'문제';
});
if(clr)clr.addEventListener('click',function(){if(confirm('오답 노트를 비울까요?')){put({});location.reload()}});
})();
