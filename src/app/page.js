import Results from "./components/Results";

const API_KEY = process.env.API_KEY;
const TOTAL_PAGES = 7; // Adjust based on the API's pagination limits

async function fetchAllResults(genre) {
  let allResults = [];
  let page = 1;

  while (page <= TOTAL_PAGES) {
    const res = await fetch(`https://api.themoviedb.org/3/${genre === 'fetchTopRated' ? "movie/top_rated" : "trending/all/week"}?api_key=${API_KEY}&language=en-US&page=${page}`, { next: { revalidate: 100000 } });

    if (!res.ok) {
      throw new Error('Failed To Load Movie Data');
    }

    const data = await res.json();
    allResults = allResults.concat(data.results);

    // If the current page is the last page, break the loop
    if (data.page === data.total_pages) {
      break;
    }

    page += 1;
  }

  return allResults;
}

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || 'fetchTrending';
  const results = await fetchAllResults(genre);

  return (
    <>
      <div>
        <Results results={results} />
      </div>
    </>
  );
}
