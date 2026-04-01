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
    // Seleciona os títulos (que contêm o h3) e todos os cards para a animação sequencial
    const portfolioFrames = portfolioSection.querySelectorAll('.title, .frame, .frame-2');
    
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
    // EFEITO MUDANÇA DE ESTAÇÃO (COLOR MORPHING MULTI-SEÇÕES)
    // =========================================
    const bgSections = [
      { element: document.querySelector('.section-about'), bgClass: 'theme-base' },
      { element: document.querySelector('.section-portfolio'), bgClass: 'theme-brown' },
      { element: document.querySelector('.section-socialmedia'), bgClass: 'theme-dark' },
      { element: document.querySelector('.creator-section'), bgClass: 'theme-ink' },
      { element: document.querySelector('.design-section'), bgClass: 'theme-design' }
    ];

    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove todas as classes de background antes de aplicar a nova
          document.body.classList.remove('theme-base', 'theme-brown', 'theme-dark', 'theme-ink', 'theme-design');
          
          const activeSec = bgSections.find(sec => sec.element === entry.target);
          if (activeSec && activeSec.bgClass) {
            document.body.classList.add(activeSec.bgClass);
          }
        }
      });
    }, {
      rootMargin: '-40% 0px -40% 0px' // A mágica: Só troca a cor quando a seção atinge perfeitamente o MEIO da tela!
    });

    bgSections.forEach(sec => {
      if (sec.element) bgObserver.observe(sec.element);
    });
  }
  
  // =========================================
  // ANIMAÇÃO DA SEÇÃO SOCIAL MEDIA (FADE IN SEQUENCIAL)
  // =========================================
  const socialMediaSection = document.querySelector('.section-socialmedia');
  if (socialMediaSection) {
    const smItems = socialMediaSection.querySelectorAll('.creator-profile, .section-title, .section-title-results, .card, .result-card');
    
    const smObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: smItems,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(100), // Cascata perfeita
          duration: 800,
          easing: 'easeOutQuart',
          complete: function(anim) {
            anim.animatables.forEach(a => a.target.style.transform = '');
          }
        });
        smObserver.unobserve(socialMediaSection);
      }
    }, { threshold: 0.15 });
    
    smObserver.observe(socialMediaSection);
  }

  // =========================================
  // ANIMAÇÃO DA SEÇÃO CRIADORA DE CONTEÚDO (FADE IN SEQUENCIAL)
  // =========================================
  const creatorSection = document.querySelector('.creator-section');
  if (creatorSection) {
    const creatorItems = creatorSection.querySelectorAll('.creator-profile, .brand-title, .card');
    
    const creatorObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: creatorItems,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(100),
          duration: 800,
          easing: 'easeOutQuart',
          complete: function(anim) {
            anim.animatables.forEach(a => a.target.style.transform = '');
          }
        });
        creatorObserver.unobserve(creatorSection);
      }
    }, { threshold: 0.15 });
    
    creatorObserver.observe(creatorSection);
  }

  // =========================================
  // ANIMAÇÃO DA SEÇÃO DESIGN (FADE IN)
  // =========================================
  const designSection = document.querySelector('.design-section');
  if (designSection) {
    const designItems = designSection.querySelectorAll('.article');
    
    const designObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: designItems,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
          easing: 'easeOutQuart',
          complete: function(anim) {
            anim.animatables.forEach(a => a.target.style.transform = '');
          }
        });
        designObserver.unobserve(designSection);
      }
    }, { threshold: 0.15 });
    
    designObserver.observe(designSection);
  }

  // =========================================
  // ANIMAÇÃO DA SEÇÃO FOOTER (FADE IN)
  // =========================================
  const footerSection = document.querySelector('.site-footer');
  if (footerSection) {
    const footerContainer = footerSection.querySelector('.footer-container');
    
    const footerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: footerContainer,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
          easing: 'easeOutQuart',
          complete: function(anim) {
            anim.animatables.forEach(a => a.target.style.transform = '');
          }
        });
        footerObserver.unobserve(footerSection);
      }
    }, { threshold: 0.15 });
    
    footerObserver.observe(footerSection);
  }
});
