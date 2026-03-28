// =========================================
// DRAG TO SCROLL & KEYBOARD NAVIGATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  let isDragging = false;
  let startY;
  let scrollTop;

  const body = document.body;
  const html = document.documentElement;

  // Mouse events para Drag to Scroll (como dispositivo touch)
  window.addEventListener('mousedown', (e) => {
    // Evita conflito com links, botões e controles nativos
    if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a') || e.target.tagName.toLowerCase() === 'button') {
      return;
    }
    
    isDragging = true;
    startY = e.clientY;
    scrollTop = window.scrollY || html.scrollTop;
    
    body.style.cursor = 'grabbing';
    body.style.userSelect = 'none'; // Previne seleção de texto acidental durante o drag
  });

  window.addEventListener('mouseleave', () => {
    isDragging = false;
    body.style.cursor = '';
    body.style.userSelect = '';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    body.style.cursor = '';
    body.style.userSelect = '';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Impede comportamento padrão de arrastar imagens ou textos
    
    const y = e.clientY;
    const walk = (y - startY) * 1.5; // Velocidade do arraste (fator 1.5x)
    
    window.scrollTo(0, scrollTop - walk);
  });

  // Navegação extra com as teclas W e S
  window.addEventListener('keydown', (e) => {
    // Ignora atalhos caso o usuário esteja digitando em algum campo de input
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
      return;
    }

    const scrollAmount = 100;

    if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
      e.preventDefault();
      window.scrollBy({ top: -scrollAmount, behavior: 'auto' });
    } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
      e.preventDefault();
      window.scrollBy({ top: scrollAmount, behavior: 'auto' });
    }
  });
});