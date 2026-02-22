import{i as f,a as _,A as h}from"./font-controls-Ckzg3v5W.js";document.addEventListener("DOMContentLoaded",async()=>{f(),await b()});async function b(){const t=new URLSearchParams(window.location.search).get("id"),i=document.getElementById("loading-state"),s=document.getElementById("content-detail");if(!t){y(i,"Conteúdo não encontrado","Nenhum conteúdo foi selecionado.");return}try{const e=await _(t);if(!e){y(i,"Conteúdo não encontrado","O conteúdo que você procura não existe ou foi removido.");return}i.style.display="none",s.style.display="block",document.title=`${e.titulo} - Saúde Acessível`;const r=document.querySelector('meta[name="description"]');r&&r.setAttribute("content",e.resumo);const o=document.getElementById("detail-meta"),c=A(e.categoria);o.innerHTML=`
      <span class="content-card__badge content-card__badge--${e.categoria}">
        ${c.icon} ${c.text}
      </span>
    `,document.getElementById("detail-title").textContent=e.titulo,e.conteudo_texto&&(document.getElementById("section-texto").style.display="block",document.getElementById("detail-texto").innerHTML=e.conteudo_texto),e.benefit_cards&&E(e.benefit_cards),e.time_goal&&I(e.time_goal),e.activities&&B(e.activities),e.tips&&$(e.tips),e.caution&&M(e.caution),e.audio_url&&(document.getElementById("section-audio").style.display="block",document.getElementById("detail-audio").src=e.audio_url),e.video_url&&k(e),e.videos&&e.videos.length>0&&w(e.videos),e.cta&&C(e.cta),e.cta&&T(),e.imagem_url&&(document.getElementById("section-imagem").style.display="block",document.getElementById("detail-imagem").innerHTML=`
        <img src="${e.imagem_url}" alt="${e.imagem_legenda||e.titulo}" loading="lazy" />
        ${e.imagem_legenda?`<div class="image-gallery__caption">${x(e.imagem_legenda)}</div>`:""}
      `)}catch(e){console.error("Erro ao carregar conteúdo:",e),y(i,"Erro ao carregar","Não foi possível carregar o conteúdo. Tente novamente.")}}function E(n){const t=document.getElementById("section-benefits");if(!t)return;t.style.display="block";const i=document.getElementById("benefits-scroll");n.forEach(s=>{const e=document.createElement("div");e.className="benefit-card",e.innerHTML=`
      <span class="benefit-card__icon">${s.icon}</span>
      <strong class="benefit-card__title">${s.title}</strong>
      <span class="benefit-card__desc">${s.desc}</span>
    `,i.appendChild(e)})}function I(n){const t=document.getElementById("section-time-goal");t&&(t.style.display="block",document.getElementById("time-goal-card").innerHTML=`
    <div class="time-goal__number">${n.number}</div>
    <div class="time-goal__unit">${n.unit}</div>
    <div class="time-goal__detail">${n.detail}</div>
  `)}function B(n){const t=document.getElementById("section-activities");if(!t)return;t.style.display="block";const i=document.getElementById("activities-grid");n.forEach(s=>{const e=document.createElement("div");e.className="activity-tile",e.innerHTML=`
      <span class="activity-tile__icon">${s.icon}</span>
      <strong class="activity-tile__name">${s.name}</strong>
      <span class="activity-tile__tip">${s.tip}</span>
    `,i.appendChild(e)})}function $(n){const t=document.getElementById("section-tips");if(!t)return;t.style.display="block";const i=document.getElementById("tips-container");n.forEach(s=>{const e=document.createElement("div");e.className="tip-pill",e.textContent=s,i.appendChild(e)})}function M(n){const t=document.getElementById("section-caution");t&&(t.style.display="block",document.getElementById("caution-text").textContent=n)}function k(n){const t=document.getElementById("section-video");t.style.display="block";const i=document.getElementById("detail-video"),s=v(n.video_url);s&&(i.innerHTML=`
      <iframe src="https://www.youtube.com/embed/${s}" title="${n.titulo} - Vídeo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>
    `)}function w(n){const t=document.getElementById("section-video-reels");t.style.display="block";const i=document.getElementById("reels-viewport"),s=document.getElementById("reels-indicators"),e=document.getElementById("reels-prev"),r=document.getElementById("reels-next");let o=0;n.forEach((l,a)=>{const d=v(l);if(!d)return;const g=document.createElement("div");g.className=`reels-slide ${a===0?"reels-slide--active":""}`,g.innerHTML=`
      <div class="reels-video-wrapper">
        <iframe src="https://www.youtube.com/embed/${d}?rel=0&modestbranding=1"
          title="Vídeo ${a+1}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>
    `,i.appendChild(g);const p=document.createElement("button");p.className=`reels-dot ${a===0?"reels-dot--active":""}`,p.setAttribute("aria-label",`Ir para vídeo ${a+1}`),p.addEventListener("click",()=>c(a)),s.appendChild(p)});function c(l){const a=i.querySelectorAll(".reels-slide"),d=s.querySelectorAll(".reels-dot");a[o].classList.remove("reels-slide--active"),d[o].classList.remove("reels-dot--active"),o=l,a[o].classList.add("reels-slide--active"),d[o].classList.add("reels-dot--active"),i.style.transform=`translateX(-${o*100}%)`,e.style.opacity=o===0?"0.3":"1",r.style.opacity=o===a.length-1?"0.3":"1"}e.addEventListener("click",()=>{o>0&&c(o-1)}),r.addEventListener("click",()=>{const l=i.querySelectorAll(".reels-slide");o<l.length-1&&c(o+1)});let m=0;const u=document.getElementById("reels-container");u.addEventListener("touchstart",l=>{m=l.changedTouches[0].screenX},{passive:!0}),u.addEventListener("touchend",l=>{const a=m-l.changedTouches[0].screenX,d=i.querySelectorAll(".reels-slide");Math.abs(a)>50&&(a>0&&o<d.length-1?c(o+1):a<0&&o>0&&c(o-1))},{passive:!0}),e.style.opacity="0.3"}function C(n){const t=document.getElementById("section-cta");t.style.display="block",document.getElementById("cta-card").innerHTML=`
    <div class="cta-compact">
      <div class="cta-compact__icon">🏋️</div>
      <div class="cta-compact__content">
        <strong class="cta-compact__title">${n.titulo}</strong>
        <span class="cta-compact__subtitle">${n.subtitulo}</span>
        <span class="cta-compact__detail">${n.horario}</span>
        <span class="cta-compact__desc">${n.descricao}</span>
      </div>
    </div>
  `}function T(){const n=document.getElementById("section-mapa");n.style.display="block";const t=L.map("map-container").setView([-8.0578,-34.8829],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:18}).addTo(t);const i=L.divIcon({className:"academia-marker",html:'<div class="academia-marker__pin">🏋️</div>',iconSize:[36,36],iconAnchor:[18,36],popupAnchor:[0,-36]}),s=[];h.forEach(o=>{const c=L.marker([o.lat,o.lng],{icon:i}).addTo(t).bindPopup(`
        <div class="map-popup">
          <strong>${o.nome}</strong><br>
          <span class="map-popup__address">${o.endereco}</span><br>
          <span class="map-popup__hours">Seg-sex: 5h30–11h30 / 14h–20h</span>
        </div>
      `);s.push({marker:c,academia:o})});const e=document.getElementById("btn-locate");let r=null;e.addEventListener("click",()=>{if(!navigator.geolocation){alert("Seu navegador não suporta geolocalização.");return}e.textContent="⏳ Localizando...",e.disabled=!0,navigator.geolocation.getCurrentPosition(o=>{const c=o.coords.latitude,m=o.coords.longitude;if(r)r.setLatLng([c,m]);else{const l=L.divIcon({className:"user-marker",html:'<div class="user-marker__pin">📍</div>',iconSize:[36,36],iconAnchor:[18,36],popupAnchor:[0,-36]});r=L.marker([c,m],{icon:l}).addTo(t).bindPopup("<strong>Você está aqui!</strong>").openPopup()}const u=s.map(({marker:l,academia:a})=>{const d=S(c,m,a.lat,a.lng);return{marker:l,academia:a,dist:d}}).sort((l,a)=>l.dist-a.dist)[0];t.setView([c,m],14),u&&u.marker.openPopup(),e.textContent="📍 Atualizar localização",e.disabled=!1},()=>{alert("Não foi possível obter sua localização. Verifique as permissões."),e.textContent="📍 Usar minha localização",e.disabled=!1},{enableHighAccuracy:!0,timeout:1e4})}),setTimeout(()=>t.invalidateSize(),300)}function y(n,t,i){n.innerHTML=`
    <div class="error-state">
      <div class="error-state__icon">😔</div>
      <h2 class="error-state__title">${t}</h2>
      <p class="error-state__message">${i}</p>
    </div>
  `}function A(n){return{hipertensao:{icon:"❤️",text:"Hipertensão"},diabetes:{icon:"🩸",text:"Diabetes"},geral:{icon:"🌿",text:"Saúde Geral"}}[n]||{icon:"📋",text:n}}function v(n){const t=n.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);return t?t[1]:null}function x(n){const t=document.createElement("div");return t.textContent=n,t.innerHTML}function S(n,t,i,s){const r=(i-n)*Math.PI/180,o=(s-t)*Math.PI/180,c=Math.sin(r/2)**2+Math.cos(n*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(o/2)**2;return 6371*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}
