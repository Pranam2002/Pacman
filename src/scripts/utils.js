export function renderGrid(data) {
  const container = document.getElementById('game-container');
  container.innerHTML = '';

  const cols = data.length;       // weeks (usually 53)
  const rows = data[0].length;    // days (usually 7)
  const flat = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const count = data[x][y];
      const div = document.createElement('div');
      div.className = 'contribution-cell';

      if (count > 0) {
        div.classList.add('contribution-active');
      } else {
        div.classList.add('empty');
      }

      container.appendChild(div);
      flat.push(div);
    }
  }

  return flat;
}
