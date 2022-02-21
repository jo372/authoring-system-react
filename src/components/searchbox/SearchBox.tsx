import React from 'react';
import { BiSearch } from 'react-icons/bi';
import './searchbox.scss';

interface SearchBoxProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox(props: SearchBoxProps) {
  const { onSearch, placeholder } = props;

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = (e.target as HTMLFormElement);
    const input = target.querySelector('input') as HTMLInputElement;
    const value = input.value.trim();
    const clearInput = () => {
      input.value = '';
    };

    clearInput();

    if (value !== '' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="searchbox">
      <div className="searchbox__input-wrapper">
        <form className="searchbox__input" onSubmit={onFormSubmit}>
          <input type="text" placeholder={placeholder} />
          <button type="submit" className="searchbox__input__icon">
            <BiSearch />
          </button>
        </form>
      </div>
    </div>
  );
}

SearchBox.defaultProps = {
  onSearch: undefined,
  placeholder: 'Search',
};
