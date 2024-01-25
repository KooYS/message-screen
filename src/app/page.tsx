'use client';
import useSWR from 'swr';
import React from 'react';
import Card from './_components/Card';
export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error, isLoading } = useSWR(
    'https://ujzt7hz2i6.execute-api.ap-northeast-2.amazonaws.com/v0',
    fetcher
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
      <div className="flex justify-between  w-full  h-screen px-20">
        {!isLoading && data && (
          <>
            <div className="grid grid-cols-4 grid-rows-3 gap-7 m-auto w-full h-full">
              {data.body.slice(0, 5).map((el: string, index: number) => {
                return (
                  <Card key={`${el}_${index}`} idx={index + 1} message={el} />
                );
              })}
              <div></div>
              <div></div>
              {data.body.slice(6, 11).map((el: string, index: number) => {
                return (
                  <Card key={`${el}_${index}`} idx={index + 5} message={el} />
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
