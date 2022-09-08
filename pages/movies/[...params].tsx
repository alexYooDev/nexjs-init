import { useRouter, NextRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState, useEffect } from 'react';

export default function Detail({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router: NextRouter = useRouter();

  const [detail, setDetail] = useState({});

  const [title, id] = params || [];

  useEffect(() => {
    const getMovieDetail = async () => {
      const response = await (await fetch(`/api/movies/${id}`)).json();
      setDetail(response);
    };
    getMovieDetail();
  }, []);

  return (
    <div>
      <h2>
        {title}{' '}
        {title !== detail.original_title ? (
          <span>({detail.original_title})</span>
        ) : null}
      </h2>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    params: { params },
  } = ctx;

  console.log(ctx.params);
  return {
    props: {
      params,
    },
  };
};
