"use strict";

// ====== Набор изображений (можно изменить количество) ======
const IMAGE_COUNT = 3;

const els = {
  mainImage: document.getElementById("mainImage"),
  currentInfo: document.getElementById("currentInfo"),

  imgSelect: document.getElementById("imgSelect"),

  imgWidth: document.getElementById("imgWidth"),
  imgHeight: document.getElementById("imgHeight"),
  imgBorder: document.getElementById("imgBorder"),
  imgAlt: document.getElementById("imgAlt"),

  applyBtn: document.getElementById("applyBtn"),
  resetBtn: document.getElementById("resetBtn"),
};

// Значения по умолчанию (можешь поменять)
const defaults = {
  imgIndex: 1,
  width: 800,
  height: 450,
  border: 2,
  alt: "Зображення 1",
};

function imgPath(idx) {
  return `images/${idx}.jpg`;
}

function fillSelect() {
  els.imgSelect.innerHTML = "";
  for (let i = 1; i <= IMAGE_COUNT; i++) {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = `${i}.jpg`;
    els.imgSelect.appendChild(opt);
  }
}

function setImageByIndex(idx) {
  const safeIdx = Math.min(Math.max(Number(idx), 1), IMAGE_COUNT);
  const path = imgPath(safeIdx);

  els.mainImage.src = path;

  // Если alt пустой — ставим автотекст по номеру
  const altText = els.imgAlt.value.trim() || `Зображення ${safeIdx}`;
  els.mainImage.alt = altText;

  els.currentInfo.textContent = `Поточне: ${els.mainImage.alt}`;
}

function applyParams() {
  const w = Number(els.imgWidth.value);
  const h = Number(els.imgHeight.value);
  const b = Number(els.imgBorder.value);
  const alt = els.imgAlt.value.trim();

  // Применяем style через DOM
  els.mainImage.style.width = `${w}px`;
  els.mainImage.style.height = `${h}px`;
  els.mainImage.style.border = `${b}px solid #000`;

  // alt через DOM-атрибут
  els.mainImage.alt = alt || els.mainImage.alt;

  // Обновим подпись
  const idx = Number(els.imgSelect.value);
 els.currentInfo.textContent = `Поточне: ${els.mainImage.alt}`;
}

function resetAll() {
  els.imgSelect.value = String(defaults.imgIndex);

  els.imgWidth.value = String(defaults.width);
  els.imgHeight.value = String(defaults.height);
  els.imgBorder.value = String(defaults.border);
  els.imgAlt.value = defaults.alt;

  // Сброс стилей и установка заново
  els.mainImage.style.width = `${defaults.width}px`;
  els.mainImage.style.height = `${defaults.height}px`;
  els.mainImage.style.border = `${defaults.border}px solid #000`;

  setImageByIndex(defaults.imgIndex);

  // обновим info
 els.currentInfo.textContent = `Поточне: ${els.mainImage.alt}`;
}

function init() {
  fillSelect();

  // Стартовое состояние: первое изображение
  els.imgSelect.value = String(defaults.imgIndex);

  // поставим размеры/рамку
  els.mainImage.style.width = `${defaults.width}px`;
  els.mainImage.style.height = `${defaults.height}px`;
  els.mainImage.style.border = `${defaults.border}px solid #000`;

  // alt
  els.imgAlt.value = defaults.alt;

  setImageByIndex(defaults.imgIndex);

  // ====== События ======
  els.imgSelect.addEventListener("change", () => {
    const idx = Number(els.imgSelect.value);
    // При смене картинки — автоматически меняем alt на номер, если поле пустое
    if (!els.imgAlt.value.trim()) els.imgAlt.value = `Зображення ${idx}`;
    setImageByIndex(idx);
  });

  els.applyBtn.addEventListener("click", applyParams);
  els.resetBtn.addEventListener("click", resetAll);
}

init();
