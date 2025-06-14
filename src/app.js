import { fetchContributions } from './scripts/graphParser.js';
import { animatePacman } from './scripts/pacman.js';
import { renderGrid } from './scripts/utils.js';

const username = 'Pranam2002'; // replace this
const token = import.meta.env.VITE_GITHUB_TOKEN;

export default async function App() {
  try {
    const data = await fetchContributions(username, token);
    const cells = renderGrid(data);
    animatePacman(cells);
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}
