import Seo from '../components/Seo';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface IMovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
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
  return (
    <div className='container'>
      <Seo title='Home' />
      {results?.map((movie: IMovieProps) => (
        <div key={movie.id}>
          <div className='movie' key={movie.id}>
            <img
              src={`https://images.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <h4>{movie.original_title}</h4>
          </div>
        </div>
      ))}
      <style jsx>{`
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
        }

        .movie img {
          max-width: 70%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
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
