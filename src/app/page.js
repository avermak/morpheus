'use client'

import React, {useCallback, useState} from 'react';
import { ReactFlowProvider } from 'reactflow';
import Toolbar from './toolbar/Toolbar';
import Canvas from './canvas';
import { useMorpheusStore } from './store';
import DevTools from "@/app/devtools";
import Modal from "react-modal";
import RulesPanel from '@/app/rules/panel';

import './index.css';
// import styles from './page.module.css'

try {
  Modal.setAppElement("#reactflow-wrapper");
} catch (e) {
  console.warn(`Error setting appElement in react-modal. Some modal functionality may be limited.`, e);
}

export default function Home() {
  const title = useMorpheusStore(state => state.title);
  const canvasArmedData = useMorpheusStore(state => state.canvasArmedData);
  const dtEnabled = useMorpheusStore(state => state.devtool.enabled);
  const rulesPanelVisible = useMorpheusStore(state => state.rules.panelVisible);

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <Toolbar />
        <div className={"contentWrapper"}>
          <Canvas />
          {rulesPanelVisible ? <RulesPanel /> : null}
          {dtEnabled ? <DevTools/> : null}
        </div>
      </ReactFlowProvider>
    </div>
  );}
