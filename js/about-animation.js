document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.article-about-me');
  const expertiseSection = document.querySelector('.article-expertise');

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

  // =========================================
  // ANIMAÇÃO DA SEÇÃO EXPERTISE (FADE IN SEQUENCIAL)
  // =========================================
  if (expertiseSection) {
    const expertiseItems = expertiseSection.querySelectorAll('.expertise-title, .expertise-card');
    
    const expertiseObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: expertiseItems,
          opacity: [0, 1],
          translateY: [20, 0], // Leve deslize para cima acompanhando o fade
          delay: anime.stagger(100), // Atraso de 100ms entre cada item (Efeito cascata)
          duration: 800,
          easing: 'easeOutQuart',
          complete: function(anim) {
            anim.animatables.forEach(a => a.target.style.transform = ''); // Restaura o transform para o :hover continuar funcionando
          }
        });
        expertiseObserver.unobserve(expertiseSection);
      }
    }, { threshold: 0.15 }); // Dispara quando 15% do container aparecer na tela
    
    expertiseObserver.observe(expertiseSection);
  }

  // =========================================
  // ANIMAÇÃO DA SEÇÃO PORTFÓLIO (FADE IN SEQUENCIAL)
  // =========================================
  const portfolioSection = document.querySelector('.section-portfolio');
  if (portfolioSection) {
    const portfolioFrames = portfolioSection.querySelectorAll('.frame');
    
    const portfolioObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: portfolioFrames,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(100), // Efeito cascata
          duration: 800,
          easing: 'easeOutQuart',
          complete: function(anim) {
            anim.animatables.forEach(a => a.target.style.transform = ''); // Restaura hover
          }
        });
        portfolioObserver.unobserve(portfolioSection);
      }
    }, { threshold: 0.15 });
    
    portfolioObserver.observe(portfolioSection);

    // =========================================
    // EFEITO MUDANÇA DE ESTAÇÃO (COLOR MORPHING)
    // =========================================
    const themeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe ao body quando a seção do portfólio entra na tela
          document.body.classList.add('theme-brown');
        } else {
          // Remove a classe quando a seção sai da tela (scroll para cima)
          document.body.classList.remove('theme-brown');
        }
      });
    }, {
      threshold: 0.15 // Gatilho mais rápido: a cor muda quando 15% da seção entrar na tela
    });

    themeObserver.observe(portfolioSection);
  }
});
