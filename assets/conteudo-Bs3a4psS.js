import{i as _,a as f,A as h}from"./font-controls-Cd8WZ-v5.js";document.addEventListener("DOMContentLoaded",async()=>{_(),await b()});async function b(){const t=new URLSearchParams(window.location.search).get("id"),s=document.getElementById("loading-state"),a=document.getElementById("content-detail");if(!t){y(s,"Conteúdo não encontrado","Nenhum conteúdo foi selecionado.");return}try{const e=await f(t);if(!e){y(s,"Conteúdo não encontrado","O conteúdo que você procura não existe ou foi removido.");return}s.style.display="none",a.style.display="block",document.title=`${e.titulo} - Saúde Acessível`;const d=document.querySelector('meta[name="description"]');d&&d.setAttribute("content",e.resumo);const o=document.getElementById("detail-meta"),c=x(e.categoria);o.innerHTML=`
      <span class="content-card__badge content-card__badge--${e.categoria}">
        ${c.icon} ${c.text}
      </span>
    `,document.getElementById("detail-title").textContent=e.titulo,e.conteudo_texto&&(document.getElementById("section-texto").style.display="block",document.getElementById("detail-texto").innerHTML=e.conteudo_texto),e.benefit_cards&&E(e.benefit_cards),e.time_goal&&I(e.time_goal),e.activities&&B(e.activities),e.tips&&$(e.tips),e.caution&&M(e.caution),e.audio_url&&(document.getElementById("section-audio").style.display="block",document.getElementById("detail-audio").src=e.audio_url),e.video_url&&k(e),e.videos&&e.videos.length>0&&w(e.videos),e.cta&&C(e.cta),e.cta&&T(),e.imagem_url&&(document.getElementById("section-imagem").style.display="block",document.getElementById("detail-imagem").innerHTML=`
        <img src="${e.imagem_url}" alt="${e.imagem_legenda||e.titulo}" loading="lazy" />
        ${e.imagem_legenda?`<div class="image-gallery__caption">${A(e.imagem_legenda)}</div>`:""}
      `)}catch(e){console.error("Erro ao carregar conteúdo:",e),y(s,"Erro ao carregar","Não foi possível carregar o conteúdo. Tente novamente.")}}function E(n){const t=document.getElementById("section-benefits");if(!t)return;t.style.display="block";const s=document.getElementById("benefits-scroll");n.forEach(a=>{const e=document.createElement("div");e.className="benefit-card",e.innerHTML=`
      <span class="benefit-card__icon">${a.icon}</span>
      <strong class="benefit-card__title">${a.title}</strong>
      <span class="benefit-card__desc">${a.desc}</span>
    `,s.appendChild(e)})}function I(n){const t=document.getElementById("section-time-goal");t&&(t.style.display="block",document.getElementById("time-goal-card").innerHTML=`
    <div class="time-goal__number">${n.number}</div>
    <div class="time-goal__unit">${n.unit}</div>
    <div class="time-goal__detail">${n.detail}</div>
  `)}function B(n){const t=document.getElementById("section-activities");if(!t)return;t.style.display="block";const s=document.getElementById("activities-grid");n.forEach(a=>{const e=document.createElement("div");e.className="activity-tile",e.innerHTML=`
      <span class="activity-tile__icon">${a.icon}</span>
      <strong class="activity-tile__name">${a.name}</strong>
      <span class="activity-tile__tip">${a.tip}</span>
    `,s.appendChild(e)})}function $(n){const t=document.getElementById("section-tips");if(!t)return;t.style.display="block";const s=document.getElementById("tips-container");n.forEach(a=>{const e=document.createElement("div");e.className="tip-pill",e.textContent=a,s.appendChild(e)})}function M(n){const t=document.getElementById("section-caution");t&&(t.style.display="block",document.getElementById("caution-text").textContent=n)}function k(n){const t=document.getElementById("section-video");t.style.display="block";const s=document.getElementById("detail-video"),a=v(n.video_url);a&&(s.innerHTML=`
      <iframe src="https://www.youtube.com/embed/${a}" title="${n.titulo} - Vídeo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>
    `)}function w(n){const t=document.getElementById("section-video-reels");t.style.display="block";const s=document.getElementById("reels-viewport"),a=document.getElementById("reels-indicators"),e=document.getElementById("reels-prev"),d=document.getElementById("reels-next");let o=0;n.forEach((r,i)=>{const l=v(r);if(!l)return;const m=document.createElement("div");m.className=`reels-slide ${i===0?"reels-slide--active":""}`,m.innerHTML=`
      <div class="reels-video-wrapper">
        <iframe src="https://www.youtube.com/embed/${l}?rel=0&modestbranding=1"
          title="Vídeo ${i+1}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>
    `,s.appendChild(m);const g=document.createElement("button");g.className=`reels-dot ${i===0?"reels-dot--active":""}`,g.setAttribute("aria-label",`Ir para vídeo ${i+1}`),g.addEventListener("click",()=>c(i)),a.appendChild(g)});function c(r){const i=s.querySelectorAll(".reels-slide"),l=a.querySelectorAll(".reels-dot");i[o].classList.remove("reels-slide--active"),l[o].classList.remove("reels-dot--active"),o=r,i[o].classList.add("reels-slide--active"),l[o].classList.add("reels-dot--active"),s.style.transform=`translateX(-${o*100}%)`,e.style.opacity=o===0?"0.3":"1",d.style.opacity=o===i.length-1?"0.3":"1"}e.addEventListener("click",()=>{o>0&&c(o-1)}),d.addEventListener("click",()=>{const r=s.querySelectorAll(".reels-slide");o<r.length-1&&c(o+1)});let u=0;const p=document.getElementById("reels-container");p.addEventListener("touchstart",r=>{u=r.changedTouches[0].screenX},{passive:!0}),p.addEventListener("touchend",r=>{const i=u-r.changedTouches[0].screenX,l=s.querySelectorAll(".reels-slide");Math.abs(i)>50&&(i>0&&o<l.length-1?c(o+1):i<0&&o>0&&c(o-1))},{passive:!0}),e.style.opacity="0.3"}function C(n){const t=document.getElementById("section-cta");t.style.display="block",document.getElementById("cta-card").innerHTML=`
    <div class="cta-compact">
      <div class="cta-compact__icon">🏋️</div>
      <div class="cta-compact__content">
        <strong class="cta-compact__title">${n.titulo}</strong>
        <span class="cta-compact__subtitle">${n.subtitulo}</span>
        <span class="cta-compact__detail">${n.horario}</span>
        <span class="cta-compact__desc">${n.descricao}</span>
      </div>
    </div>
  `}function T(){const n=document.getElementById("section-mapa");n.style.display="block";const t=L.map("map-container").setView([-8.0578,-34.8829],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:18}).addTo(t);const s=L.divIcon({className:"academia-marker",html:'<div class="academia-marker__pin">🏋️</div>',iconSize:[36,36],iconAnchor:[18,36],popupAnchor:[0,-36]}),a=[];h.forEach(o=>{const c=L.marker([o.lat,o.lng],{icon:s}).addTo(t).bindPopup(`
        <div class="map-popup">
          <strong>${o.nome}</strong><br>
          <span class="map-popup__address">${o.endereco}</span><br>
          <span class="map-popup__hours">Seg-sex: 5h30–11h30 / 14h–20h</span>
        </div>
      `);a.push({marker:c,academia:o})});const e=document.getElementById("btn-locate");let d=null;e.addEventListener("click",()=>{if(!navigator.geolocation){alert("Seu navegador não suporta geolocalização.");return}e.textContent="⏳ Localizando...",e.disabled=!0,navigator.geolocation.getCurrentPosition(o=>{const c=o.coords.latitude,u=o.coords.longitude;if(d)d.setLatLng([c,u]);else{const i=L.divIcon({className:"user-marker",html:'<div class="user-marker__pin">📍</div>',iconSize:[36,36],iconAnchor:[18,36],popupAnchor:[0,-36]});d=L.marker([c,u],{icon:i}).addTo(t).bindPopup("<strong>Você está aqui!</strong>").openPopup()}const p=a.map(({marker:i,academia:l})=>{const m=S(c,u,l.lat,l.lng);return{marker:i,academia:l,dist:m}}).sort((i,l)=>i.dist-l.dist),r=document.getElementById("map-list");r.innerHTML='<h3 class="map-list__title">Academias mais próximas:</h3>',p.slice(0,5).forEach((i,l)=>{const m=document.createElement("div");m.className="map-list__item",m.innerHTML=`
            <div class="map-list__rank">${l+1}º</div>
            <div class="map-list__info">
              <strong class="map-list__name">${i.academia.nome}</strong>
              <span class="map-list__address">${i.academia.endereco}</span>
              <span class="map-list__distance">~${i.dist.toFixed(1)} km</span>
            </div>
          `,m.addEventListener("click",()=>{t.setView([i.academia.lat,i.academia.lng],16),i.marker.openPopup()}),r.appendChild(m)}),t.setView([c,u],14),e.textContent="📍 Atualizar localização",e.disabled=!1},()=>{alert("Não foi possível obter sua localização. Verifique as permissões."),e.textContent="📍 Usar minha localização",e.disabled=!1},{enableHighAccuracy:!0,timeout:1e4})}),setTimeout(()=>t.invalidateSize(),300)}function y(n,t,s){n.innerHTML=`
    <div class="error-state">
      <div class="error-state__icon">😔</div>
      <h2 class="error-state__title">${t}</h2>
      <p class="error-state__message">${s}</p>
    </div>
  `}function x(n){return{hipertensao:{icon:"❤️",text:"Hipertensão"},diabetes:{icon:"🩸",text:"Diabetes"},geral:{icon:"🌿",text:"Saúde Geral"}}[n]||{icon:"📋",text:n}}function v(n){const t=n.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);return t?t[1]:null}function A(n){const t=document.createElement("div");return t.textContent=n,t.innerHTML}function S(n,t,s,a){const d=(s-n)*Math.PI/180,o=(a-t)*Math.PI/180,c=Math.sin(d/2)**2+Math.cos(n*Math.PI/180)*Math.cos(s*Math.PI/180)*Math.sin(o/2)**2;return 6371*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}
