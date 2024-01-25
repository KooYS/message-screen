import React from 'react';

interface Props {
  idx: number;
  message: string;
}

const Card: React.FC<Props> = ({ idx, message }) => {
  const msgRef = React.useRef<HTMLParagraphElement>(null);

  const [size, setSize] = React.useState({
    width: 300,
    height: 300,
  });

  React.useEffect(() => {
    const { width } = msgRef.current?.getBoundingClientRect() || {
      width: 0,
    };
    setSize({
      width: width + window.innerWidth / 20,
      height: width + window.innerWidth / 20,
    });
  }, [msgRef]);
  return (
    <>
      <div
        className="mx-auto"
        style={{
          background: `url('./card/${idx}.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: size.width,
          height: size.height,
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          ref={msgRef}
          className="text-gray-600 fold:p-10 tablet:p-12 desktop:p-20 m-auto"
        >
          {message}
        </p>
      </div>
    </>
  );
};

export default Card;
