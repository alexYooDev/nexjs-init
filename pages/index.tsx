import Seo from '../components/Seo';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IMovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Home({
  results,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  const router = useRouter();

  const handleClick = (movie: IMovieProps) => {
    const { id, title } = movie;

    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className='container'>
      <Seo title='Home' />
      {results?.map((movie: IMovieProps) => (
        <div key={movie.id}>
          <div
            onClick={() => handleClick(movie)}
            className='movie'
            key={movie.id}
          >
            <img
              src={`https://images.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <h4>
              <Link
                href={`movies/${movie.original_title}/${movie.id}`}
                key={movie.id}
              >
                <a>{movie.original_title}</a>
              </Link>
            </h4>
          </div>
        </div>
      ))}
      <style jsx>{`
        a {
          text-decoration: none;
          color: black;
        }
        .container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 20px;
          gap: 20px;
        }

        .movie {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .movie img {
          max-width: 70%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-5px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            padding: 20px;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({}: GetServerSideProps) {
  const { results } = await (
    await fetch('http://localhost:3000/api/movies')
  ).json();
  return {
    props: { results },
  };
}
