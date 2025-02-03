import {
  Dispatch,
  HTMLAttributes,
  KeyboardEvent,
  SetStateAction,
  useRef,
} from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

type SearchBarProps = {
  setSearchInputValue: Dispatch<SetStateAction<string | undefined>>;
} & HTMLAttributes<HTMLDivElement>;

const SearchBar = ({ setSearchInputValue, ...props }: SearchBarProps) => {
  const SearchInputRef = useRef<HTMLInputElement>(null);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchInputValue(SearchInputRef.current?.value);
    }
  };

  return (
    <SearchBarContainer {...props}>
      <SearchInput
        ref={SearchInputRef}
        onKeyDown={handleEnterPress}
      ></SearchInput>
      <SearchButtonIcon
        onClick={() => setSearchInputValue(SearchInputRef.current?.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  padding: 0 0 0 1rem;
  background-color: var(--background-color);
  border-radius: 1rem;
`;

const SearchInput = styled.input`
  position: relative;
  flex: 1;
`;

const SearchButtonIcon = styled(FaSearch)`
  position: relative;
  margin: 0 1rem;
  cursor: pointer;
`;
