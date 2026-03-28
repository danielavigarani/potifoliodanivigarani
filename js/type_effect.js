document.addEventListener('DOMContentLoaded', () => {
  const paragraphs = document.querySelectorAll('.article-about-me .about-text-block');
  const aboutSection = document.querySelector('.article-about-me');

  if (paragraphs.length === 0 || !aboutSection) {
    return;
  }

  // Store original HTML and text content for each paragraph
  const originalContents = Array.from(paragraphs).map(p => {
    const originalHTML = p.innerHTML;
    const originalText = p.textContent;
    p.innerHTML = ''; // Clear for animation
    return { element: p, html: originalHTML, text: originalText };
  });

  let hasAnimated = false;
  const typeSpeed = 10;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;
      animateParagraphs();
      observer.unobserve(aboutSection);
    }
  }, { threshold: 0.3 });

  observer.observe(aboutSection);

  async function animateParagraphs() {
    for (const content of originalContents) {
      await typewriter(content.element, content.text, content.html);
      // Add a small delay between paragraphs if desired
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  function typewriter(element, text, finalHTML) {
    return new Promise(resolve => {
      let charIndex = 0;
      element.innerHTML = ''; // Ensure it's empty before starting

      function typeChar() {
        if (charIndex < text.length) {
          element.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, typeSpeed);
        } else {
          // Once typing is done, restore the original HTML with bold tags
          element.innerHTML = finalHTML;
          resolve();
        }
      }
      typeChar();
    });
  }
});
