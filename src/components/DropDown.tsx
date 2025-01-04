import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type DropDownProps = {
  dropDownArray?: Array<dropdownType>;
} & HTMLAttributes<HTMLUListElement>;
export type dropdownType = {
  name: string;
  callback: () => void;
};

const DropDown = ({ dropDownArray, ...props }: DropDownProps) => {
  return (
    <DropDownContainer {...props}>
      {dropDownArray?.map((item, index) => (
        <StyledLi key={index}>
          <button onClick={item.callback}>{item.name}</button>
        </StyledLi>
      ))}
    </DropDownContainer>
  );
};

export default DropDown;

const DropDownContainer = styled.ul`
  position: absolute;
  top: 2.5rem;
  right: 0;
  z-index: 1;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid var(--muted-text-color);
  border-radius: 10px;
  box-shadow: 0 5px 5px 0 rgb(0 0 0 / 30%);
`;

const StyledLi = styled.li`
  margin: 8px 0;
`;
