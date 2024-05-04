'use client';
import useSWR from 'swr';
import React from 'react';
import Card from './_components/Card';

export default function Home() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .catch((e) => console.log(e));

  const { data, error, isLoading } = useSWR(
    'https://ujzt7hz2i6.execute-api.ap-northeast-2.amazonaws.com/v0',
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const toggle = () => {
    const element = document.documentElement as any;
    if (element.requestFullscreen) return element.requestFullscreen();
    if (element.webkitRequestFullscreen)
      return element.webkitRequestFullscreen();
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen();
    if (element.msRequestFullscreen) return element.msRequestFullscreen();
  };
  return (
    <main>
      <button
        onClick={toggle}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
        }}
      ></button>
      <div className="flex justify-between  w-full  h-screen ">
        {!isLoading && data && (
          <>
            <div className="grid grid-cols-4 grid-rows-3 gap-7 m-auto w-full h-full">
              {data.body &&
                data.body.length > 0 &&
                data.body
                  .slice(0, 5)
                  .map(
                    (
                      el: { message: string; status: string; id: string },
                      index: number
                    ) => {
                      return (
                        <Card key={`${el}_${index}`} idx={index} row={el} />
                      );
                    }
                  )}
              <div></div>
              <div></div>
              {data.body
                .slice(5, 10)
                .map(
                  (
                    el: { message: string; status: string; id: string },
                    index: number
                  ) => {
                    return (
                      <Card key={`${el}_${index}`} idx={index + 5} row={el} />
                    );
                  }
                )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
