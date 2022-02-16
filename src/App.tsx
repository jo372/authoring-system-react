import React from 'react';
import CollapisbleMenu from './components/menus/collapsible_menu/CollapsibleMenu';
import Modal from './components/modal/Modal';
import SearchBox from './components/searchbox/SearchBox';

function App() {
  return (
    <>
      <CollapisbleMenu position="left">
        <SearchBox />
      </CollapisbleMenu>
      <Modal>
        <h1>Hello World</h1>
      </Modal>
    </>
  );
}

export default App;
