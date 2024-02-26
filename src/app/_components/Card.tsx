import React from 'react';
import useSWRMutation from 'swr/mutation';

interface Props {
  idx: number;
  row: {
    message: string;
    id: string;
    status: string;
  };
}

const NewlineToBreak = ({
  id,
  message,
  status,
}: {
  id: string;
  message: string;
  status: string;
}) => {
  const textWithBreaks = message.split('\n').map((line, index, array) =>
    index === array.length - 1 ? (
      line
    ) : (
      <React.Fragment key={`${id}-${line}-${index}`}>
        {line}
        <br />
      </React.Fragment>
    )
  );

  return <>{textWithBreaks}</>;
};

const Card: React.FC<Props> = ({ idx, row }) => {
  async function updateStatus(
    url: string,
    { arg }: { arg: { pageId: string; status: string } }
  ) {
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ pageId: arg.pageId, status: arg.status }),
    });
  }

  const { trigger } = useSWRMutation(
    'https://ujzt7hz2i6.execute-api.ap-northeast-2.amazonaws.com/v0',
    updateStatus
  );

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

    // const minSize =
    // 200 + one < window.innerWidth / 6 ? window.innerWidth / 6 : 200 + one;
    const minSize = 300;

    // console.log(msgRef.current, width, height, minSize);
    setSize({
      width: minSize,
      height: minSize,
    });
  }, [msgRef.current]);

  // React.useEffect(() => {
  //   console.log(msgRef.current, size);
  // }, [size]);
  React.useEffect(() => {
    setTimeout(() => {
      trigger({ pageId: row.id, status: 'viewed' });
    }, 30000);
  }, [row]);
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
            wordWrap: 'break-word',
          }}
        >
          <NewlineToBreak
            id={row.id}
            message={row.message}
            status={row.status}
          />
        </p>
      </div>
    </>
  );
};

export default Card;
