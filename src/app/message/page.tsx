'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);
  const [delay, setDelay] = React.useState(false);
  const send = () => {
    const message = (document.getElementById('message') as HTMLInputElement)
      .value;

    if (message === '' || message === undefined) {
      toast.error('Please enter your message');
      return;
    }
    if (!delay) {
      setDelay(true);

      setIsLoading(true);
      fetch('https://ujzt7hz2i6.execute-api.ap-northeast-2.amazonaws.com/v0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          if (res.ok) {
            toast.success('Successfully created!');
            setTimeout(() => {
              setDelay(false);
            }, 2000);
          } else {
            toast.error('Plz retry!');
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      if (message === '' || message === undefined) {
        toast.error('Plz waiting');
        return;
      }
    }
  };

  return (
    <>
      <Toaster />
      {isLoading && (
        <div
          id="overlay"
          className="h-full w-full fixed top-0 left-0 bg-black opacity-50"
        ></div>
      )}
      <div className="flex flex-col justify-center gap-3 p-4 border-t border-gray-200 h-full">
        <textarea
          rows={7}
          placeholder="메세지를 입력하세요..."
          id="message"
          className="p-2 border rounded-md focus:outline-none focus:border-blue-500"
          // onKeyDown={(e: React.KeyboardEvent) => {
          //   if (e.key === 'Enter') {
          //     send(); // 작성한 댓글 post 요청하는 함수
          //   }
          // }}
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white fold:text-xs fold:ml-2 mobile:ml-4 mobile:text-base rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            send();
          }}
        >
          전송
        </button>
      </div>
    </>
  );
}
