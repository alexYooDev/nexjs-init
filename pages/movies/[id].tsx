import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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

export default function Detail() {
  const router = useRouter();

  const id = router.query.id;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    const getMovieDetail = async () => {
      const response = await (await fetch(`/api/movies/${id}`)).json();
      setDetail(response);
    };
    getMovieDetail();
  }, []);

  return (
    <div>
      <h2>{detail.title}</h2>
      <h4>{detail.original_title}</h4>
      <img
        src={`https://images.tmdb.org/t/p/w500/${detail.poster_path}`}
        alt={detail.original_title}
      />
      <p>released in: {detail.release_date}</p>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h2 {
          margin-bottom: 0;
        }
        img {
          width: 25%;
        }
      `}</style>
    </div>
  );
}
