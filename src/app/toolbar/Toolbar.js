import React, { useCallback, useState } from 'react';
import { useStore, useReactFlow, useStoreApi } from 'reactflow';
import ObjectMenu from './objectMenu';

import './toolbar.css';
import { useMorpheusStore } from '../store';

const transformSelector = (state) => state.transform;

// let nid = 0;

const initialState = {
  showObjectsMenu: false,
};

export default () => {
  const transform = useStore(transformSelector);
  const {getNodes, setNodes, addNodes, screenToFlowPosition} = useReactFlow();
  const [state, setState] = useState(initialState);

  const armCanvas = useMorpheusStore(state => state.armCanvas);
  const devtoolEnabled = useMorpheusStore(state => state.devtool.enabled);
  const setDevtoolEnabled = useMorpheusStore(state => state.devtool.setEnabled);
  const rules = useMorpheusStore(state => state.rules);
  const undoStack = useMorpheusStore(state => state.undoStack);
  const undoCursor = useMorpheusStore(state => state.undoCursor);
  const undo = useMorpheusStore(state => state.undo);
  const redo = useMorpheusStore(state => state.redo);
  const {canUndo, canRedo} = useMorpheusStore(state => ({canUndo: state.canUndo, canRedo: state.canRedo}));

  
  const toggleObjectsMenu = useCallback(event => {
    setState({...state, showObjectsMenu: !state.showObjectsMenu});
  });

  const toggleDevTools = useCallback(event => {
    setDevtoolEnabled(!devtoolEnabled);
  }, [devtoolEnabled]);

  const onObjectSelected = useCallback(event => {
    console.log('Selected: ', event);
    setState({...state, showObjectsMenu: false});
    armCanvas({objectId: event.objectId});
  }, []);

  const toggleRulesPanel = useCallback(event => {
    rules.setPanelVisible(!rules.panelVisible);
    // rules.run();
  }, [rules]);

  const onUndo = useCallback(event => {
    undo();
  }, []);
  const onRedo = useCallback(event => {
    redo();
  }, []);

  return (
    <div className="toolbar">
      <button onClick={toggleObjectsMenu} title={"New diagram object"}>{state.showObjectsMenu ? '−' : '＋'}</button>
      <ObjectMenu visible={state.showObjectsMenu} onObjectSelected={onObjectSelected} />
      <span className={"toolbarSeparator"}>|</span>
      <button onClick={onUndo} title={"Undo"} disabled={!canUndo}>↪</button>
      <button onClick={onRedo} title={"Redo"} disabled={!canRedo}>↩</button>
      <span className={"toolbarSeparator"}>{undoCursor}/{undoStack.length}</span>
      <span className={"toolbarSeparator"}>|</span>
      <button onClick={toggleRulesPanel} title={"Toggle Rules panel"}>{rules.panelVisible ? '-' : '+'} 🏛</button>
      <button onClick={toggleDevTools} title={"Toggle dev tools panel"}>{devtoolEnabled ? '-' : '+'} 🐞</button>
    </div>
  );
};
