document.addEventListener('DOMContentLoaded', () => {
  // Verifica se o dispositivo possui mouse (evita criar elementos e rodar animações à toa no mobile/touch)
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  // Cria os elementos do cursor e injeta no corpo da página
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  const follower = document.createElement('div');
  follower.classList.add('custom-cursor-follower');
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  // Captura a posição imediata do mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // O ponto central segue o mouse imediatamente
    cursor.style.setProperty('--x', `${mouseX}px`);
    cursor.style.setProperty('--y', `${mouseY}px`);
  });

  // Animação contínua (easing) para criar a elasticidade do anel transparente
  function animate() {
    followerX += (mouseX - followerX) * 0.2; // Fator de suavidade (0.2)
    followerY += (mouseY - followerY) * 0.2;
    
    follower.style.setProperty('--x', `${followerX}px`);
    follower.style.setProperty('--y', `${followerY}px`);
    
    requestAnimationFrame(animate);
  }
  animate();

  // Atribui o Hover APENAS a elementos realmente clicáveis, ignorando textos, imagens e balões
  const interactableElements = document.querySelectorAll('a, button, .liquid-metal-link');
  interactableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });

  // Estado de clique/drag (Reage globalmente ao pressionar o botão do mouse)
  window.addEventListener('mousedown', () => follower.classList.add('dragging'));
  window.addEventListener('mouseup', () => follower.classList.remove('dragging'));
});