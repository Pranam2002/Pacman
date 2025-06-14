import axios from 'axios';

export async function fetchContributions(username, token) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await axios.post(
    'https://api.github.com/graphql',
    { query },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const weeks = response.data.data.user.contributionsCollection.contributionCalendar.weeks;
  return weeks.map(week => week.contributionDays.map(day => day.contributionCount));
}
