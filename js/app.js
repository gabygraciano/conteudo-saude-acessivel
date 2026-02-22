/**
 * app.js
 * Lógica da página principal (index.html).
 * - Carrega conteúdos (da Google Sheets ou mock)
 * - Renderiza cards
 * - Filtra por categoria
 */

import { fetchConteudos } from './data.js';
import { initFontControls } from './font-controls.js';

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', async () => {
    initFontControls();
    await loadContent();
    initCategoryFilter();
});

// ===== Estado da aplicação =====
let allConteudos = [];
let currentCategory = 'todos';

// ===== Carregar conteúdos =====
async function loadContent() {
    const grid = document.getElementById('content-grid');
    const loading = document.getElementById('loading-state');

    try {
        allConteudos = await fetchConteudos();
        loading.style.display = 'none';
        renderCards(allConteudos);
    } catch (error) {
        loading.innerHTML = `
      <div class="error-state">
        <div class="error-state__icon">😔</div>
        <h2 class="error-state__title">Ops! Algo deu errado</h2>
        <p class="error-state__message">Não conseguimos carregar os conteúdos. Verifique sua conexão e tente novamente.</p>
        <button class="error-state__btn" onclick="location.reload()">
          🔄 Tentar novamente
        </button>
      </div>
    `;
    }
}

// ===== Renderizar cards =====
function renderCards(conteudos) {
    const grid = document.getElementById('content-grid');

    if (conteudos.length === 0) {
        grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <h2 class="empty-state__title">Nenhum conteúdo encontrado</h2>
        <p class="empty-state__message">Não há conteúdos nesta categoria ainda.</p>
      </div>
    `;
        return;
    }

    grid.innerHTML = conteudos.map(item => {
        const categoryLabel = getCategoryLabel(item.categoria);
        const mediaIcons = getMediaIcons(item);

        return `
      <a href="conteudo.html?id=${encodeURIComponent(item.id)}"
         class="content-card content-card--${item.categoria}"
         aria-label="${item.titulo}. ${item.resumo}">
        <span class="content-card__badge content-card__badge--${item.categoria}">
          ${categoryLabel.icon} ${categoryLabel.text}
        </span>
        <h2 class="content-card__title">${escapeHTML(item.titulo)}</h2>
        <p class="content-card__summary">${escapeHTML(item.resumo)}</p>
        ${mediaIcons ? `<div class="content-card__media-icons">${mediaIcons}</div>` : ''}
      </a>
    `;
    }).join('');
}

// ===== Filtro por categoria =====
function initCategoryFilter() {
    const buttons = document.querySelectorAll('.category-filter__btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualiza estado visual
            buttons.forEach(b => b.classList.remove('category-filter__btn--active'));
            btn.classList.add('category-filter__btn--active');

            // Filtra
            currentCategory = btn.dataset.category;
            const filtered = currentCategory === 'todos'
                ? allConteudos
                : allConteudos.filter(c => c.categoria === currentCategory);
            renderCards(filtered);

            // Anuncia para leitores de tela
            const grid = document.getElementById('content-grid');
            grid.setAttribute('aria-label', `Lista de conteúdos - ${btn.textContent.trim()}: ${filtered.length} itens`);
        });
    });
}

// ===== Helpers =====
function getCategoryLabel(categoria) {
    const labels = {
        hipertensao: { icon: '❤️', text: 'Hipertensão' },
        diabetes: { icon: '🩸', text: 'Diabetes' },
        geral: { icon: '🌿', text: 'Saúde Geral' }
    };
    return labels[categoria] || { icon: '📋', text: categoria };
}

function getMediaIcons(item) {
    const icons = [];
    if (item.conteudo_texto) icons.push('<span class="content-card__media-icon">📖 Texto</span>');
    if (item.audio_url) icons.push('<span class="content-card__media-icon">🎧 Áudio</span>');
    if (item.video_url) icons.push('<span class="content-card__media-icon">🎬 Vídeo</span>');
    if (item.imagem_url) icons.push('<span class="content-card__media-icon">🖼️ Imagem</span>');
    return icons.join('');
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
