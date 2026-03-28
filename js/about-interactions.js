document.addEventListener('DOMContentLoaded', () => {

  // Lógica 1: Font Switcher
  const fontButtons = document.querySelectorAll('.glass-btn');
  const paragraph = document.querySelector('.minha-trajet-ria-n-o');

  // Define a fonte inicial com base no botão ativo
  const initialActiveButton = document.querySelector('.glass-btn.active');
  if (initialActiveButton && paragraph) {
    paragraph.style.fontFamily = initialActiveButton.dataset.font;
  }

  fontButtons.forEach(button => {
    button.addEventListener('click', function() { // Usar function para ter acesso ao 'this'
      // Se o botão clicado já estiver ativo, não faz nada
      if (this.classList.contains('active')) {
        return;
      }

      // Animação de clique no botão
      anime({
        targets: this,
        scale: [
          { value: 1.2, duration: 150, easing: 'easeOutQuad' },
          { value: 1, duration: 150, easing: 'easeInQuad' }
        ]
      });
      
      // Remove a classe 'active' de todos os botões
      fontButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adiciona a classe 'active' ao botão clicado
      this.classList.add('active');
      
      // Pega o valor da fonte do atributo data-font
      const newFont = this.dataset.font;
      
      // Aplica a nova fonte ao parágrafo
      if (paragraph) {
        paragraph.style.fontFamily = newFont;
      }
    });
  });

});