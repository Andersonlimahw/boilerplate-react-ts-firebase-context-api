import React, { MouseEventHandler } from 'react';
import { ImShare2 } from 'react-icons/im';

interface OptionsProps {
  handleClick: MouseEventHandler<SVGElement>
}

export const Options : React.FC<OptionsProps> = ({ handleClick }) => {

  return(
    <span>
      <ImShare2 
        size={32}
        color="#fff"
        onClick={handleClick}
        data-testid="options-icon"
      />
    </span>
  )
}