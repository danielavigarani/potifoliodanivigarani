// =========================================
// BILINGUAL SYSTEM (PT/EN)
// =========================================
function initLanguageSwitcher() {
  console.log('🟢 Language Switcher: Script inicializado!');
  const langBtn = document.getElementById('lang-toggle-btn');
  if (!langBtn) {
    console.error('🔴 Language Switcher: Botão não encontrado no HTML!');
    return;
  }

  const htmlTag = document.documentElement;

  // Tenta usar o localStorage. Em arquivos locais (file://), isso pode gerar erro e travar o script.
  let currentLang = 'pt';
  try {
    const savedLang = localStorage.getItem('siteLang');
    if (savedLang) {
      currentLang = savedLang;
    } else {
      // Regionalização Automática: Lê o idioma do navegador (Ex: 'pt-BR' ou 'en-US')
      const browserLang = navigator.language || navigator.userLanguage;
      // Se for português, mostra em PT. Qualquer outro idioma, muda direto para o Inglês.
      currentLang = browserLang.toLowerCase().includes('pt') ? 'pt' : 'en';
    }
    console.log(`🟢 Language Switcher: Idioma atual -> ${currentLang.toUpperCase()}`);
  } catch (error) {
    console.warn('Acesso ao localStorage bloqueado. Usando idioma padrão.');
  }

  const updateLanguage = (lang) => {
    console.log(`🟢 Language Switcher: Atualizando a página para -> ${lang.toUpperCase()}`);
    const elementsToTranslate = document.querySelectorAll('[data-pt][data-en]');
    console.log(`🟢 Language Switcher: Encontrados ${elementsToTranslate.length} textos para traduzir.`);

    // Atualiza o texto (ou HTML interno) de cada elemento
    elementsToTranslate.forEach(el => {
      const newText = el.getAttribute(`data-${lang}`);
      if (newText) el.innerHTML = newText;
    });
    
    // Atualiza a tag <html> para ajudar no SEO e acessibilidade
    htmlTag.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    
    // O botão sempre mostra a opção de linguagem "oposta" à atual
    langBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
    
    // Tenta salvar a preferência do usuário
    try {
      localStorage.setItem('siteLang', lang);
    } catch (error) {
      // Ignora erro
    }
  };

  // Inicializa o site na linguagem correta no momento em que a página carrega
  updateLanguage(currentLang);

  // Adiciona evento de clique no botão de idioma
  langBtn.addEventListener('click', (e) => {
    console.log('🟢 Language Switcher: Botão CLICADO!');
    e.preventDefault(); // Impede qualquer comportamento padrão (como scrollar pro topo sem querer)
    e.stopPropagation(); // Impede que o clique seja barrado por outros scripts
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage(currentLang);
  });
}

// Garante que o script rode mesmo se o DOMContentLoaded já tiver disparado (comum com a tag 'defer')
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}