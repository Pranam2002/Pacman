export function animatePacman(cells, delay = 150) {
  const gridWidth = 53;
  const gridHeight = Math.floor(cells.length / gridWidth);

  // Track original state to restore later
  const originalStates = cells.map(cell =>
    cell.classList.contains('contribution-active')
  );

  let x = 0;
  let y = 0;

  function runAnimation() {
    const interval = setInterval(() => {
      const index = y + x * gridHeight;
      const cell = cells[index];

      if (!cell) {
        clearInterval(interval);
        restoreGrid();
        setTimeout(() => {
          x = 0;
          y = 0;
          runAnimation();
        }, 500); // short pause before looping
        return;
      }

      // Clear previous Pacman
      const prev = document.querySelector('.pacman');
      if (prev) {
        prev.classList.remove('pacman');
        prev.textContent = '';
      }

      // Animate Pacman
      cell.classList.add('pacman');
      cell.textContent = '😋';

      // Eat only if it's a contribution cell
      if (!cell.classList.contains('empty')) {
        setTimeout(() => {
          cell.classList.remove('contribution-active');
          cell.textContent = '';
          cell.style.backgroundColor = '#1e1e1e';
        }, delay * 0.8);
      }

      // Move to next cell
      y++;
      if (y >= gridHeight) {
        y = 0;
        x++;
      }

    }, delay);
  }

  // Restore all contribution cells to start state
  function restoreGrid() {
  cells.forEach((cell, i) => {
    cell.textContent = '';
    cell.classList.remove('pacman');

    if (originalStates[i]) {
      cell.classList.add('contribution-active');
      cell.classList.remove('empty');
      cell.style.backgroundColor = ''; // let CSS class take over
    } else {
      cell.classList.add('empty');
      cell.classList.remove('contribution-active');
      cell.style.backgroundColor = '#1e1e1e'; // or whatever your `.empty` color is
    }
  });
  }

  runAnimation(); // start it!
}
