"use strict";

// ====== Набор изображений ======
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

  
  const altText = els.imgAlt.value.trim() || `Зображення ${safeIdx}`;
  els.mainImage.alt = altText;

  els.currentInfo.textContent = `Поточне: ${els.mainImage.alt}`;
}

function applyParams() {
  const w = Number(els.imgWidth.value);
  const h = Number(els.imgHeight.value);
  const b = Number(els.imgBorder.value);
  const alt = els.imgAlt.value.trim();

  // style через DOM
  els.mainImage.style.width = `${w}px`;
  els.mainImage.style.height = `${h}px`;
  els.mainImage.style.border = `${b}px solid #000`;

  // alt через DOM-атрибут
  els.mainImage.alt = alt || els.mainImage.alt;


  const idx = Number(els.imgSelect.value);
 els.currentInfo.textContent = `Поточне: ${els.mainImage.alt}`;
}

function resetAll() {
  els.imgSelect.value = String(defaults.imgIndex);

  els.imgWidth.value = String(defaults.width);
  els.imgHeight.value = String(defaults.height);
  els.imgBorder.value = String(defaults.border);
  els.imgAlt.value = defaults.alt;

  
  els.mainImage.style.width = `${defaults.width}px`;
  els.mainImage.style.height = `${defaults.height}px`;
  els.mainImage.style.border = `${defaults.border}px solid #000`;

  setImageByIndex(defaults.imgIndex);

 
 els.currentInfo.textContent = `Поточне: ${els.mainImage.alt}`;
}

function init() {
  fillSelect();

  
  els.imgSelect.value = String(defaults.imgIndex);

  
  els.mainImage.style.width = `${defaults.width}px`;
  els.mainImage.style.height = `${defaults.height}px`;
  els.mainImage.style.border = `${defaults.border}px solid #000`;

  
  els.imgAlt.value = defaults.alt;

  setImageByIndex(defaults.imgIndex);

  
  els.imgSelect.addEventListener("change", () => {
    const idx = Number(els.imgSelect.value);
    
    if (!els.imgAlt.value.trim()) els.imgAlt.value = `Зображення ${idx}`;
    setImageByIndex(idx);
  });

  els.applyBtn.addEventListener("click", applyParams);
  els.resetBtn.addEventListener("click", resetAll);
}

init();
