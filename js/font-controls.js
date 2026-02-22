/**
 * font-controls.js
 * Módulo compartilhado para controle de tamanho de fonte.
 * Salva a preferência do usuário no localStorage.
 */

const FONT_LEVELS = ['font-size-default', 'font-size-large', 'font-size-xlarge'];
const STORAGE_KEY = 'saude-acessivel-font-level';

function getCurrentLevel() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
        const level = parseInt(saved, 10);
        if (level >= 0 && level < FONT_LEVELS.length) return level;
    }
    return 0;
}

function applyFontLevel(level) {
    const html = document.documentElement;
    // Remove todas as classes de font-size
    FONT_LEVELS.forEach(cls => html.classList.remove(cls));
    // Aplica a classe atual (exceto default que não tem classe)
    if (level > 0) {
        html.classList.add(FONT_LEVELS[level]);
    }
    localStorage.setItem(STORAGE_KEY, level.toString());
}

export function initFontControls() {
    let currentLevel = getCurrentLevel();
    applyFontLevel(currentLevel);

    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');

    if (btnIncrease) {
        btnIncrease.addEventListener('click', () => {
            if (currentLevel < FONT_LEVELS.length - 1) {
                currentLevel++;
                applyFontLevel(currentLevel);
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener('click', () => {
            if (currentLevel > 0) {
                currentLevel--;
                applyFontLevel(currentLevel);
            }
        });
    }
}
