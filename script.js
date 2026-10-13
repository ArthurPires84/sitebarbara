/* ===== MENU: para criar/editar páginas do menu, mexa só aqui ===== */
const MENU=[["index.html","Início"],["sobre.html","Sobre"],["servicos.html","Serviços"],["pets.html","Pets"],["equipe.html","Equipe"],["contato.html","Contato"]];
const FONE="(51) 99999-0000", EMAIL="contato@petvida.com.br";
const page=location.pathname.split("/").pop()||"index.html";
document.getElementById("topo").innerHTML=`<div class="wrap bar">
<a class="logo" href="index.html"> 🐾 Pit<span>Pet</span></a>
<button class="burger" aria-label="Menu">☰</button><nav>${MENU.map(m=>`<a href="${m[0]}" class="${m[0]===page?"on":""}">${m[1]}</a>`).join("")}</nav></div>`;
document.getElementById("rodape").innerHTML=`<div class="wrap"><div><b>🐾 PitPet Clínica Veterinária</b><br>Cuidado com amor, ciência e carinho.</div>
<div>📞 ${FONE}<br>✉️ ${EMAIL}<br>Seg–Sáb · Emergência 24h</div></div>`;
document.querySelector(".burger").onclick=()=>document.querySelector("nav").classList.toggle("open");
/* imagens: se alguma não carregar, mostra um emoji no lugar (nunca quebra) */
document.querySelectorAll("img").forEach(i=>i.onerror=()=>{i.replaceWith(Object.assign(document.createElement("div"),{textContent:i.dataset.e||"🐶",style:"font-size:4rem;display:grid;place-items:center;height:100%;min-height:150px"}))});
/* animação ao rolar */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
/* contadores: <b data-count="500"> */
document.querySelectorAll("[data-count]").forEach(el=>{const fim=+el.dataset.count;let n=0;const t=setInterval(()=>{n+=Math.ceil(fim/60);if(n>=fim){n=fim;clearInterval(t)}el.textContent="+"+n},25)});
/* abas (equipe) */
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab,.panel").forEach(x=>x.classList.remove("on"));b.classList.add("on");document.getElementById(b.dataset.alvo).classList.add("on")});
/* filtro (pets) */
document.querySelectorAll(".flt").forEach(b=>b.onclick=()=>{document.querySelectorAll(".flt").forEach(x=>x.classList.remove("on"));b.classList.add("on");document.querySelectorAll("[data-cat]").forEach(c=>c.classList.toggle("hide",b.dataset.f!=="todos"&&c.dataset.cat!==b.dataset.f))});
/* formulário (simulado, sem servidor) */
const f=document.getElementById("form");
if(f)f.onsubmit=e=>{e.preventDefault();const m=document.getElementById("msg"),d=Object.fromEntries(new FormData(f));
if(!d.nome.trim()||!/^\S+@\S+\.\S+$/.test(d.email)||d.fone.replace(/\D/g,"").length<10){m.className="msg err";m.textContent="⚠️ Preencha nome, e-mail válido e telefone com DDD.";return}
m.className="msg ok";m.textContent=`✅ Obrigado, ${d.nome.split(" ")[0]}! Recebemos o pedido para ${d.pet||"seu pet"}. Entraremos em contato em breve.`;f.reset()};
/* botão voltar ao topo */
const up=document.createElement("button");up.className="up";up.textContent="↑";up.onclick=()=>scrollTo({top:0});document.body.append(up);
addEventListener("scroll",()=>up.classList.toggle("show",scrollY>400));

/* ===== arrastar a imagem dentro de cada círculo vermelho (.blob) =====
   Duplo clique volta a imagem para o centro. Zoom: mude ESCALA. */
const ESCALA=1.35;
document.querySelectorAll(".blob").forEach(blob=>{
  let x=0,y=0,sx=0,sy=0,ativo=false;
  const dica=document.createElement("span");dica.className="dh";dica.textContent="👆 arraste a imagem";blob.append(dica);
  const alvo=()=>blob.querySelector("img,div:not(.dh)");
  const aplica=()=>{const a=alvo();if(a)a.style.transform=`translate(${x}px,${y}px) scale(${ESCALA})`};
  const limite=()=>blob.offsetWidth*(ESCALA-1)/2;
  blob.addEventListener("pointerdown",e=>{ativo=true;sx=e.clientX-x;sy=e.clientY-y;blob.classList.add("drag");dica.classList.add("off");blob.setPointerCapture(e.pointerId)});
  blob.addEventListener("pointermove",e=>{if(!ativo)return;const m=limite();
    x=Math.max(-m,Math.min(m,e.clientX-sx));y=Math.max(-m,Math.min(m,e.clientY-sy));aplica()});
  const solta=()=>{ativo=false;blob.classList.remove("drag")};
  blob.addEventListener("pointerup",solta);blob.addEventListener("pointercancel",solta);
  blob.addEventListener("dblclick",()=>{x=y=0;aplica()});
});
