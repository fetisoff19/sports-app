import React from 'react';

const Previous = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill={fill || 'black'}
         width={width || '32px'}
         height={height || '32px'}
         viewBox="0 0 512 512">
      <g>
        <g>
          <path d="M388.418,240.915L153.752,6.248c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17L343.163,256
			L123.582,475.582c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667
			C396.749,262.754,396.749,249.246,388.418,240.915z"/>
        </g>
      </g>
    </svg>
  )
};

export default Previous;