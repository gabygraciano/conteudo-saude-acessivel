import{i as d,f as l}from"./font-controls-uQd4KmIy.js";document.addEventListener("DOMContentLoaded",async()=>{d(),await u(),_()});let a=[],c="todos";async function u(){document.getElementById("content-grid");const t=document.getElementById("loading-state");try{a=await l(),t.style.display="none",i(a)}catch{t.innerHTML=`
      <div class="error-state">
        <div class="error-state__icon">😔</div>
        <h2 class="error-state__title">Ops! Algo deu errado</h2>
        <p class="error-state__message">Não conseguimos carregar os conteúdos. Verifique sua conexão e tente novamente.</p>
        <button class="error-state__btn" onclick="location.reload()">
          🔄 Tentar novamente
        </button>
      </div>
    `}}function i(t){const e=document.getElementById("content-grid");if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <h2 class="empty-state__title">Nenhum conteúdo encontrado</h2>
        <p class="empty-state__message">Não há conteúdos nesta categoria ainda.</p>
      </div>
    `;return}e.innerHTML=t.map(n=>{const s=g(n.categoria),o=m(n);return`
      <a href="conteudo.html?id=${encodeURIComponent(n.id)}"
         class="content-card content-card--${n.categoria}"
         aria-label="${n.titulo}. ${n.resumo}">
        <span class="content-card__badge content-card__badge--${n.categoria}">
          ${s.icon} ${s.text}
        </span>
        <h2 class="content-card__title">${r(n.titulo)}</h2>
        <p class="content-card__summary">${r(n.resumo)}</p>
        ${o?`<div class="content-card__media-icons">${o}</div>`:""}
      </a>
    `}).join("")}function _(){const t=document.querySelectorAll(".category-filter__btn");t.forEach(e=>{e.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("category-filter__btn--active")),e.classList.add("category-filter__btn--active"),c=e.dataset.category;const n=c==="todos"?a:a.filter(o=>o.categoria===c);i(n),document.getElementById("content-grid").setAttribute("aria-label",`Lista de conteúdos - ${e.textContent.trim()}: ${n.length} itens`)})})}function g(t){return{hipertensao:{icon:"❤️",text:"Hipertensão"},diabetes:{icon:"🩸",text:"Diabetes"},geral:{icon:"🌿",text:"Saúde Geral"}}[t]||{icon:"📋",text:t}}function m(t){const e=[];return t.conteudo_texto&&e.push('<span class="content-card__media-icon">📖 Texto</span>'),t.audio_url&&e.push('<span class="content-card__media-icon">🎧 Áudio</span>'),t.video_url&&e.push('<span class="content-card__media-icon">🎬 Vídeo</span>'),t.imagem_url&&e.push('<span class="content-card__media-icon">🖼️ Imagem</span>'),e.join("")}function r(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}
