import { createStore, Plugin, PluginFunctions } from '@react-pdf-viewer/core';
import { useMemo } from 'react';

interface StoreProps {
  jumpToPage?(pageIndex: number): void;
}

interface JumpToPagePlugin extends Plugin {
  jumpToPage(pageIndex: number): void;
}

const JumpToPagePlugin = (): JumpToPagePlugin => {
  const store = useMemo(() => createStore<StoreProps>(), []);

  return {
    install: (pluginFunctions: PluginFunctions) => {
      store.update('jumpToPage', pluginFunctions.jumpToPage);
    },
    jumpToPage: (pageIndex: number) => {
      const fn = store.get('jumpToPage');
      if (fn) {
        fn(pageIndex);
      }
    },
  };
};

export default JumpToPagePlugin;