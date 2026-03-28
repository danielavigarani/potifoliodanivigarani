const signature = {
  initialize: () => {
    const svg = document.getElementById('signature-svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    let delay = 0;
    let previousSpeed = 0;

    paths.forEach(path => {
      const length = path.getTotalLength();
      const speed = length * 2; // Animation speed proportional to path length
      
      delay += previousSpeed + 100; // Start each path after the previous one finishes + a small pause

      path.style.transition = 'none';
      path.setAttribute('stroke-dasharray', `${length},${length}`);
      path.setAttribute('stroke-dashoffset', length);
      
      path.dataset.speed = speed;
      path.dataset.delay = delay;
      
      previousSpeed = speed;
    });
  },

  animate: () => {
    const svg = document.getElementById('signature-svg');
    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    paths.forEach(path => {
      const speed = path.dataset.speed;
      const delay = path.dataset.delay;
      path.style.transition = `stroke-dashoffset ${speed}ms ${delay}ms ease-in-out`;
      path.setAttribute('stroke-dashoffset', '0');
    });
  }
};

window.addEventListener('load', () => {
  signature.initialize();
  // Add a small delay before starting the animation to ensure everything is loaded
  setTimeout(() => {
    signature.animate();
  }, 500);
});
