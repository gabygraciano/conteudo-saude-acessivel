/**
 * conteudo.js
 * Lógica da página de detalhe (conteudo.html).
 *
 * Esta página é aberta diretamente pelo app mobile via webview:
 *   conteudo.html?id=atividade-fisica
 *
 * Cada URL abre UM conteúdo específico.
 */

import { fetchConteudoById, ACADEMIAS_DA_CIDADE } from './data.js';
import { initFontControls } from './font-controls.js';

document.addEventListener('DOMContentLoaded', async () => {
    initFontControls();
    await loadConteudo();
});

async function loadConteudo() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const loadingEl = document.getElementById('loading-state');
    const detailEl = document.getElementById('content-detail');

    if (!id) {
        showError(loadingEl, 'Conteúdo não encontrado', 'Nenhum conteúdo foi selecionado.');
        return;
    }

    try {
        const conteudo = await fetchConteudoById(id);

        if (!conteudo) {
            showError(loadingEl, 'Conteúdo não encontrado', 'O conteúdo que você procura não existe ou foi removido.');
            return;
        }

        loadingEl.style.display = 'none';
        detailEl.style.display = 'block';

        document.title = `${conteudo.titulo} - Saúde Acessível`;

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', conteudo.resumo);

        // Badge de categoria
        const metaEl = document.getElementById('detail-meta');
        const categoryLabel = getCategoryLabel(conteudo.categoria);
        metaEl.innerHTML = `
      <span class="content-card__badge content-card__badge--${conteudo.categoria}">
        ${categoryLabel.icon} ${categoryLabel.text}
      </span>
    `;

        // Título
        document.getElementById('detail-title').textContent = conteudo.titulo;

        // Texto introdutório (breve)
        if (conteudo.conteudo_texto) {
            document.getElementById('section-texto').style.display = 'block';
            document.getElementById('detail-texto').innerHTML = conteudo.conteudo_texto;
        }

        // Benefit cards (carrossel horizontal)
        if (conteudo.benefit_cards) {
            initBenefitCards(conteudo.benefit_cards);
        }

        // Time goal
        if (conteudo.time_goal) {
            initTimeGoal(conteudo.time_goal);
        }

        // Activity tiles
        if (conteudo.activities) {
            initActivities(conteudo.activities);
        }

        // Tips (compact)
        if (conteudo.tips) {
            initTips(conteudo.tips);
        }

        // Caution alert
        if (conteudo.caution) {
            initCaution(conteudo.caution);
        }

        // Áudio
        if (conteudo.audio_url) {
            document.getElementById('section-audio').style.display = 'block';
            document.getElementById('detail-audio').src = conteudo.audio_url;
        }

        // Vídeo único (legacy)
        if (conteudo.video_url) {
            renderSingleVideo(conteudo);
        }

        // Video Reels
        if (conteudo.videos && conteudo.videos.length > 0) {
            initVideoReels(conteudo.videos);
        }

        // CTA
        if (conteudo.cta) {
            initCTA(conteudo.cta);
        }

        // Mapa
        if (conteudo.cta) {
            initMap();
        }

        // Imagem
        if (conteudo.imagem_url) {
            document.getElementById('section-imagem').style.display = 'block';
            document.getElementById('detail-imagem').innerHTML = `
        <img src="${conteudo.imagem_url}" alt="${conteudo.imagem_legenda || conteudo.titulo}" loading="lazy" />
        ${conteudo.imagem_legenda ? `<div class="image-gallery__caption">${escapeHTML(conteudo.imagem_legenda)}</div>` : ''}
      `;
        }

    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        showError(loadingEl, 'Erro ao carregar', 'Não foi possível carregar o conteúdo. Tente novamente.');
    }
}

// ===== BENEFIT CARDS (horizontal scroll) =====
function initBenefitCards(cards) {
    const section = document.getElementById('section-benefits');
    if (!section) return;
    section.style.display = 'block';

    const container = document.getElementById('benefits-scroll');
    cards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'benefit-card';
        el.innerHTML = `
      <span class="benefit-card__icon">${card.icon}</span>
      <strong class="benefit-card__title">${card.title}</strong>
      <span class="benefit-card__desc">${card.desc}</span>
    `;
        container.appendChild(el);
    });
}

// ===== TIME GOAL (big number) =====
function initTimeGoal(goal) {
    const section = document.getElementById('section-time-goal');
    if (!section) return;
    section.style.display = 'block';

    document.getElementById('time-goal-card').innerHTML = `
    <div class="time-goal__number">${goal.number}</div>
    <div class="time-goal__unit">${goal.unit}</div>
    <div class="time-goal__detail">${goal.detail}</div>
  `;
}

// ===== ACTIVITY TILES (grid) =====
function initActivities(activities) {
    const section = document.getElementById('section-activities');
    if (!section) return;
    section.style.display = 'block';

    const grid = document.getElementById('activities-grid');
    activities.forEach(act => {
        const el = document.createElement('div');
        el.className = 'activity-tile';
        el.innerHTML = `
      <span class="activity-tile__icon">${act.icon}</span>
      <strong class="activity-tile__name">${act.name}</strong>
      <span class="activity-tile__tip">${act.tip}</span>
    `;
        grid.appendChild(el);
    });
}

// ===== TIPS (horizontal pills) =====
function initTips(tips) {
    const section = document.getElementById('section-tips');
    if (!section) return;
    section.style.display = 'block';

    const container = document.getElementById('tips-container');
    tips.forEach(tip => {
        const el = document.createElement('div');
        el.className = 'tip-pill';
        el.textContent = tip;
        container.appendChild(el);
    });
}

// ===== CAUTION ALERT =====
function initCaution(text) {
    const section = document.getElementById('section-caution');
    if (!section) return;
    section.style.display = 'block';

    document.getElementById('caution-text').textContent = text;
}

// ===== SINGLE VIDEO =====
function renderSingleVideo(conteudo) {
    const sectionVideo = document.getElementById('section-video');
    sectionVideo.style.display = 'block';
    const videoContainer = document.getElementById('detail-video');

    const youtubeId = extractYouTubeId(conteudo.video_url);
    if (youtubeId) {
        videoContainer.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${youtubeId}" title="${conteudo.titulo} - Vídeo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>
    `;
    }
}

// ===== VIDEO REELS =====
function initVideoReels(videos) {
    const section = document.getElementById('section-video-reels');
    section.style.display = 'block';

    const viewport = document.getElementById('reels-viewport');
    const indicators = document.getElementById('reels-indicators');
    const prevBtn = document.getElementById('reels-prev');
    const nextBtn = document.getElementById('reels-next');

    let currentIndex = 0;

    videos.forEach((url, index) => {
        const youtubeId = extractYouTubeId(url);
        if (!youtubeId) return;

        const slide = document.createElement('div');
        slide.className = `reels-slide ${index === 0 ? 'reels-slide--active' : ''}`;
        slide.innerHTML = `
      <div class="reels-video-wrapper">
        <iframe src="https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1"
          title="Vídeo ${index + 1}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>
    `;
        viewport.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `reels-dot ${index === 0 ? 'reels-dot--active' : ''}`;
        dot.setAttribute('aria-label', `Ir para vídeo ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });

    function goToSlide(index) {
        const slides = viewport.querySelectorAll('.reels-slide');
        const dots = indicators.querySelectorAll('.reels-dot');
        slides[currentIndex].classList.remove('reels-slide--active');
        dots[currentIndex].classList.remove('reels-dot--active');
        currentIndex = index;
        slides[currentIndex].classList.add('reels-slide--active');
        dots[currentIndex].classList.add('reels-dot--active');
        viewport.style.transform = `translateX(-${currentIndex * 100}%)`;
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentIndex === slides.length - 1 ? '0.3' : '1';
    }

    prevBtn.addEventListener('click', () => { if (currentIndex > 0) goToSlide(currentIndex - 1); });
    nextBtn.addEventListener('click', () => {
        const slides = viewport.querySelectorAll('.reels-slide');
        if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    });

    // Touch/swipe
    let touchStartX = 0;
    const container = document.getElementById('reels-container');
    container.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    container.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        const slides = viewport.querySelectorAll('.reels-slide');
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
            else if (diff < 0 && currentIndex > 0) goToSlide(currentIndex - 1);
        }
    }, { passive: true });

    prevBtn.style.opacity = '0.3';
}

// ===== CTA (compact) =====
function initCTA(cta) {
    const section = document.getElementById('section-cta');
    section.style.display = 'block';

    document.getElementById('cta-card').innerHTML = `
    <div class="cta-compact">
      <div class="cta-compact__icon">🏋️</div>
      <div class="cta-compact__content">
        <strong class="cta-compact__title">${cta.titulo}</strong>
        <span class="cta-compact__subtitle">${cta.subtitulo}</span>
        <span class="cta-compact__detail">${cta.horario}</span>
        <span class="cta-compact__desc">${cta.descricao}</span>
      </div>
    </div>
  `;
}

// ===== MAPA =====
function initMap() {
    const section = document.getElementById('section-mapa');
    section.style.display = 'block';

    const map = L.map('map-container').setView([-8.0578, -34.8829], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

    const academiaIcon = L.divIcon({
        className: 'academia-marker',
        html: '<div class="academia-marker__pin">🏋️</div>',
        iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36]
    });

    const markers = [];
    ACADEMIAS_DA_CIDADE.forEach(academia => {
        const marker = L.marker([academia.lat, academia.lng], { icon: academiaIcon })
            .addTo(map)
            .bindPopup(`
        <div class="map-popup">
          <strong>${academia.nome}</strong><br>
          <span class="map-popup__address">${academia.endereco}</span><br>
          <span class="map-popup__hours">Seg-sex: 5h30–11h30 / 14h–20h</span>
        </div>
      `);
        markers.push({ marker, academia });
    });

    // Geolocation
    const locateBtn = document.getElementById('btn-locate');
    let userMarker = null;

    locateBtn.addEventListener('click', () => {
        if (!navigator.geolocation) { alert('Seu navegador não suporta geolocalização.'); return; }

        locateBtn.textContent = '⏳ Localizando...';
        locateBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                if (userMarker) {
                    userMarker.setLatLng([userLat, userLng]);
                } else {
                    const userIcon = L.divIcon({
                        className: 'user-marker',
                        html: '<div class="user-marker__pin">📍</div>',
                        iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36]
                    });
                    userMarker = L.marker([userLat, userLng], { icon: userIcon })
                        .addTo(map).bindPopup('<strong>Você está aqui!</strong>').openPopup();
                }

                const withDistance = markers.map(({ marker, academia }) => {
                    const dist = calculateDistance(userLat, userLng, academia.lat, academia.lng);
                    return { marker, academia, dist };
                }).sort((a, b) => a.dist - b.dist);

                const listEl = document.getElementById('map-list');
                listEl.innerHTML = '<h3 class="map-list__title">Academias mais próximas:</h3>';

                withDistance.slice(0, 5).forEach((item, index) => {
                    const card = document.createElement('div');
                    card.className = 'map-list__item';
                    card.innerHTML = `
            <div class="map-list__rank">${index + 1}º</div>
            <div class="map-list__info">
              <strong class="map-list__name">${item.academia.nome}</strong>
              <span class="map-list__address">${item.academia.endereco}</span>
              <span class="map-list__distance">~${item.dist.toFixed(1)} km</span>
            </div>
          `;
                    card.addEventListener('click', () => {
                        map.setView([item.academia.lat, item.academia.lng], 16);
                        item.marker.openPopup();
                    });
                    listEl.appendChild(card);
                });

                map.setView([userLat, userLng], 14);
                locateBtn.textContent = '📍 Atualizar localização';
                locateBtn.disabled = false;
            },
            () => {
                alert('Não foi possível obter sua localização. Verifique as permissões.');
                locateBtn.textContent = '📍 Usar minha localização';
                locateBtn.disabled = false;
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });

    setTimeout(() => map.invalidateSize(), 300);
}

// ===== Helpers =====
function showError(container, title, message) {
    container.innerHTML = `
    <div class="error-state">
      <div class="error-state__icon">😔</div>
      <h2 class="error-state__title">${title}</h2>
      <p class="error-state__message">${message}</p>
    </div>
  `;
}

function getCategoryLabel(categoria) {
    const labels = {
        hipertensao: { icon: '❤️', text: 'Hipertensão' },
        diabetes: { icon: '🩸', text: 'Diabetes' },
        geral: { icon: '🌿', text: 'Saúde Geral' }
    };
    return labels[categoria] || { icon: '📋', text: categoria };
}

function extractYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
