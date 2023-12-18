import {MarkerType, Position} from 'reactflow';
import {create} from 'zustand';
import {runRules} from '@/app/rules/engine';
import {produce} from 'immer';

const MAX_UNDO_STACK_DEPTH = 1000;

const initialNodes = [
  { id: 'customer_001', type: 'customer', data: { label: 'Customer' }, position: { x: 200, y: 125 }, sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: 'application_001', type: 'application', data: { label: 'Application' }, position: { x: 500, y: 250 }, sourcePosition: Position.Right, targetPosition: Position.Left },
  ];
  
const initialEdges = [
    // {
    //   id: 'customer_001-application_001',
    //   type: 'smoothstep',
    //   source: 'customer_001',
    //   target: 'application_001',
    //   sourceHandle: 'rm',
    //   targetHandle: 'lm',
    //   animated: false,
    //   label: 'https',
    //   markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
    // },
];

const IGNORE_FIELDS_IN_SERIALIZATION = ["selected", "dragging"];
const serializeState = (state) => JSON.stringify({
    nodes: state.reactFlow.getNodes(),
    edges: state.reactFlow.getEdges(),
    // titleBlock: state.titleBlock,
}, (k, v) => (IGNORE_FIELDS_IN_SERIALIZATION.indexOf(k) > -1 ? undefined : v));

const deserializeAndApplyState = (serialState, state) => {
  const state1 = JSON.parse(serialState);
  state.reactFlow.setNodes(state1.nodes);
  state.reactFlow.setEdges(state1.edges);
  // state.titleBlock = state1.titleBlock;
}


const morpheusStore = (set) => ({

  titleBlock: {
    businessUnit: '',
    platform: '',
    documentType: '',
    title: '',
    createdBy: '',
    documentStatus: '',
    createDate: '',
    lastRevisionDate: '',
    version: '',
  },
  setTitleBlock: (titleBlock) => set(state => ({titleBlock})),

  reactFlow: null,
  setReactFlow: reactFlow => set(state => produce(state, draft => {
    draft.reactFlow = reactFlow;
  })),

  initialNodes,
  initialEdges,

  devtool: {
    enabled: false,
    setEnabled: enabled => set(state => produce(state, draft => {
      draft.devtool.enabled = enabled;
    })),
  },

  canvasArmedData: null,
  armCanvas: canvasArmedData => set(state => ({canvasArmedData})),

  addNode: nodeData => set(state => {
    if (!state.reactFlow) {
      return;
    }
    state.reactFlow.addNodes(nodeData);
    state.rules.run();
    return {};
  }),

  setCustomNodeData: (nodeId, data) => set(state => {
    const node = state.reactFlow.getNode(nodeId) || state.reactFlow.getEdge(nodeId);
    if (!node) {
      console.warn(`No node/edge found for id ${nodeId}. This most likely is a code bug. Fix it!`);
      return {};
    }
    node.data = {...node.data, ...data};
    state.reactFlow.setNodes(state.reactFlow.getNodes());
    // state.rules.run();
    return {};
  }),

  undoStack: [],
  undoCursor: -1,
  canUndo: false,
  canRedo: false,
  checkpoint: () => set(state => produce(state, draft => {
    const state1 = serializeState(state);
    const state0 = state.undoCursor > -1 ? state.undoStack[state.undoCursor] : '';
    console.log(`STATES (${state0 === state1 ? '√' : 'x'}):\n\n${state0}\n\n${state1}`);
    if (state1 !== state0) { // Only if change detected.
      draft.undoStack.splice(state.undoCursor + 1, state.undoStack.length - state.undoCursor - 1, state1);
      if (state.undoStack.length > MAX_UNDO_STACK_DEPTH) { // Trim bottom of stack on overflow
        draft.undoStack.splice(0, 1);
      }
      draft.undoCursor = draft.undoStack.length - 1;
      // console.log(`Undo stack [items=${draft.undoStack.length}, cursor=${draft.undoCursor}]`);
      draft.canUndo = draft.undoCursor > 0;
      draft.canRedo = draft.undoCursor < draft.undoStack.length - 1;
    } else {
      console.log(`Checkpoint ignored. No serializable state change detected.`);
    }
  })),
  undo: () => set(state => produce(state, draft => {
    if (state.undoCursor < 1) {
      console.log(`Nothing to undo`);
      return;
    }
    deserializeAndApplyState(draft.undoStack[draft.undoCursor - 1], draft);
    draft.undoCursor--;
    draft.canUndo = draft.undoCursor > 0;
    draft.canRedo = true;
  })),
  redo: () => set(state => produce(state, draft => {
    if (state.undoCursor < state.undoStack.length - 1) {
      const state1 = draft.undoStack[draft.undoCursor + 1];
      draft.undoCursor++;
      deserializeAndApplyState(state1, draft);
      draft.canUndo = draft.undoCursor > 0;
      draft.canRedo = draft.undoCursor < draft.undoStack.length - 1;
    } else {
      console.log(`Nothing to redo`);
    }
  })),

  rules: {
    running: false,
    dirty: false,
    panelVisible: true,
    setPanelVisible: visible => set(state => produce(state, draft => {
      draft.rules.panelVisible = visible;
    })),
    findings: [],
    run: () => {
      set(state => {
        console.log(`Running rules`);
        runRules(state).then(findings => {
          set(state => produce(state, draft => {
            draft.rules.findings = findings;
            draft.rules.running = false;
            draft.rules.dirty = false;
          }));
          });
        return produce(state, draft => {draft.rules.running = true});
      });
    },
    showFindingAlertForElement: (elementId, flag) => {
      if (elementId === "titleBlock") {
        set(state => produce(state, draft => {
          draft.titleBlock.findingAlert = flag;
        }));
      } else {
        set(state => {
          let element = state.reactFlow.getNode(elementId) || state.reactFlow.getEdge(elementId);
          if (!element) {
            console.warn(`No element found with id [${elementId}] when marking for finding alert. This indicates a code defect.`);
            return;
          }
          state.setCustomNodeData(elementId, {findingAlert: flag});
          return {};
        });
      }
    }
  }
});

export const useMorpheusStore = create(morpheusStore);