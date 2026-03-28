document.addEventListener('DOMContentLoaded', () => {
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
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Animação contínua (easing) para criar a elasticidade do anel transparente
  function animate() {
    followerX += (mouseX - followerX) * 0.2; // Fator de suavidade (0.2)
    followerY += (mouseY - followerY) * 0.2;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    
    requestAnimationFrame(animate);
  }
  animate();

  // Atribui os Estados de Hover sobre elementos vitais
  const interactableElements = document.querySelectorAll('a, button, .liquid-metal-link, .timeline-card, .article-about-me, .expertise-card');
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