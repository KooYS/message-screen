'use client';
import useSWR from 'swr';
import React from 'react';
import Card from './_components/Card';
export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error, isLoading } = useSWR(
    'https://ujzt7hz2i6.execute-api.ap-northeast-2.amazonaws.com/v0',
    fetcher
  );

  return (
    <main className="bg-stone-200 py-9">
      {!isLoading && data && (
        <>
          {data.body.map((el, index) => {
            return <Card key={`${el}_${index}`} message={el} />;
          })}
        </>
      )}
    </main>
  );
}
