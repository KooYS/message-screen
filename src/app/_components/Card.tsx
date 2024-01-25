import React from 'react';

interface Props {
  idx: number;
  message: string;
}

const Card: React.FC<Props> = ({ idx, message }) => {
  const msgRef = React.useRef<HTMLParagraphElement>(null);

  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const { width, height } = msgRef.current?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };
    const one = width > height ? width : height;

    const minSize =
      120 + one < window.innerWidth / 6 ? window.innerWidth / 6 : 120 + one;
    setSize({
      width: minSize,
      height: minSize,
    });
  }, [msgRef.current]);
  return (
    <>
      <div
        className="mx-auto"
        style={{
          background: `url('./card/${idx}.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: size.width + 'px',
          height: size.height + 'px',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <p
          ref={msgRef}
          className="text-gray-600 m-auto"
          style={{
            maxWidth: 200,
          }}
        >
          {message}
        </p>
      </div>
    </>
  );
};

export default Card;
