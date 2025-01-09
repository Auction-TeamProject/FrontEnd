import { forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

type DropDownProps = {
  dropDownArray?: Array<DropdownType>;
} & HTMLAttributes<HTMLUListElement>;
export type DropdownType = {
  name: string;
  callback: () => void;
};

const DropDown = forwardRef<HTMLUListElement, DropDownProps>(
  ({ dropDownArray, ...props }, ref) => {
    return (
      <DropDownContainer ref={ref} {...props}>
        {dropDownArray?.map((item, index) => (
          <StyledLi key={index}>
            <button onClick={item.callback}>{item.name}</button>
          </StyledLi>
        ))}
      </DropDownContainer>
    );
  }
);

DropDown.displayName = 'DropDown';
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
