document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.article-about-me');

  if (!aboutSection) {
    return;
  }

  // Seleciona os elementos de texto para animar
  const title = aboutSection.querySelector('.text-wrapper');
  const paragraphs = aboutSection.querySelectorAll('.about-text-block');
  const elementsToAnimate = [title, ...paragraphs];

  // Inicialmente, esconde os elementos para a animação de entrada
  elementsToAnimate.forEach(el => {
    if(el) el.style.opacity = '0';
  });

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Inicia a animação quando a seção se torna visível
      anime({
        targets: elementsToAnimate,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(200),
        // Garante que o translateY não persista após a animação
        complete: () => {
          elementsToAnimate.forEach(el => {
            if(el) el.style.transform = '';
          });
        }
      });
      
      // Para a observação após a animação ser acionada uma vez
      observer.unobserve(aboutSection);
    }
  }, {
    threshold: 0.2 // A animação começa quando 20% da seção estiver visível
  });

  // Inicia a observação da seção
  observer.observe(aboutSection);
});
