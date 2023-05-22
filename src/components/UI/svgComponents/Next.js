import React from 'react';

const Next = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill={fill || 'black'}
         width={width || '32px'}
         height={height || '32px'}
         viewBox="0 0 512 512">
      <g>
        <g>
          <path d="M168.837,256L388.418,36.418c8.331-8.331,8.331-21.839,0-30.17c-8.331-8.331-21.839-8.331-30.17,0L123.582,240.915
			c-8.331,8.331-8.331,21.839,0,30.17l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17
			L168.837,256z"/>
        </g>
      </g>
    </svg>
  )
};

export default Next;