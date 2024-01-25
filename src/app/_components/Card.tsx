import React from 'react';

interface Props {
  idx: number;
  message: string;
}

const NewlineToBreak = ({ text }: { text: string }) => {
  const textWithBreaks = text.split('\n').map((line, index, array) =>
    index === array.length - 1 ? (
      line
    ) : (
      <React.Fragment key={`${text}-${line}-${index}`}>
        {line}
        <br />
      </React.Fragment>
    )
  );

  return <>{textWithBreaks}</>;
};

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
      200 + one < window.innerWidth / 6 ? window.innerWidth / 6 : 200 + one;

    console.log(msgRef.current, width, height, minSize);
    setSize({
      width: minSize,
      height: minSize,
    });
  }, [msgRef.current]);

  React.useEffect(() => {
    console.log(msgRef.current, size);
  }, [size]);
  return (
    <>
      <div
        className="mx-auto"
        style={{
          background: `url('./card/${(idx % 8) + 1}.png')`,
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
          <NewlineToBreak text={message} />
        </p>
      </div>
    </>
  );
};

export default Card;
