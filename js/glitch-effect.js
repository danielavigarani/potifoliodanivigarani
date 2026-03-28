// =========================================
// EFEITO MATRIX/GLITCH NAS LETRAS
// =========================================
// Seleciona todas as linhas de texto
const textRows = document.querySelectorAll('.text-row');
const specialChars = ['@', '!', '%', '$', '#', '&', '*', '?'];

// Armazena o texto original de cada linha na memória para recuperação exata
const originalTexts = Array.from(textRows).map(row => row.textContent);

function applyGlitch() {
  let glitchFlickerCount = 0;
  const maxFlickers = 3; // O texto pisca "errado" 3 vezes rápido (total ~240ms)
  
  const flickerInterval = setInterval(() => {
    textRows.forEach((row, index) => {
      let textArray = originalTexts[index].split('');
      
      // Define a quantidade de letras que vão sofrer glitch (aprox 30%)
      const numGlitches = Math.floor(textArray.length * 0.3); 
      
      for (let i = 0; i < numGlitches; i++) {
        const randomPos = Math.floor(Math.random() * textArray.length);
        // Ignora os espaços para não juntar as palavras
        if (textArray[randomPos] !== ' ') {
          const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
          textArray[randomPos] = randomChar;
        }
      }
      
      // Aplica a nova combinação corrompida no DOM
      row.textContent = textArray.join('');
    });

    glitchFlickerCount++;

    // Para a animação e aciona a restauração após os flickers
    if (glitchFlickerCount >= maxFlickers) {
      clearInterval(flickerInterval);
      
      textRows.forEach((row, index) => {
        row.textContent = originalTexts[index]; // Restaura perfeitamente
      });
    }
  }, 80); // 80ms por frame para ser muito rápido e sutil
}

// Dispara o evento visual a cada 5 segundos
// setInterval(applyGlitch, 5000);