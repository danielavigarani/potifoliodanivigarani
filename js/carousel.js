document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);
  
  let currentIndex = 0;
  
  const moveToSlide = (targetIndex) => {
    // Lógica para dar a volta (looping infinito)
    if (targetIndex < 0) targetIndex = slides.length - 1;
    if (targetIndex >= slides.length) targetIndex = 0;
    
    // Remove o status 'ativo' do slide e do dot atual
    slides[currentIndex].classList.remove('current-slide');
    dots[currentIndex].classList.remove('current-indicator');
    
    // Adiciona o status 'ativo' no novo slide e dot alvo
    slides[targetIndex].classList.add('current-slide');
    dots[targetIndex].classList.add('current-indicator');
    
    // Atualiza a referência global
    currentIndex = targetIndex;
  };
  
  if (nextButton) nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
  if (prevButton) prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
  
  if (dotsNav) {
    dotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('button');
      if (!targetDot) return;
      const targetIndex = dots.findIndex(dot => dot === targetDot);
      moveToSlide(targetIndex);
    });
  }
});