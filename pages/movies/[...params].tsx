import { useRouter, NextRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Detail({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router: NextRouter = useRouter();

  const [title, id] = params || [];

  return (
    <div>
      <h2>{title}</h2>
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
  return {
    props: {
      params,
    },
  };
};
