import React from 'react';
import CollapisbleMenu from './components/menus/collapsible_menu/CollapsibleMenu';
import SearchBox from './components/searchbox/SearchBox';

function App() {
  const onSearchHandler = (value: string) => {
    console.log(value);
  };

  return (
    <CollapisbleMenu position="left">
      <SearchBox onSearch={onSearchHandler} />
    </CollapisbleMenu>
  );
}

export default App;
