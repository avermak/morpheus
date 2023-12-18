import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  useReactFlow, ConnectionMode, MarkerType, applyEdgeChanges,
} from 'reactflow';
import { useMorpheusStore } from './store';
import { useCallback } from 'react';
import nodeTypes from './nodetypes';
import TitleBlock from './titleblock';

import 'reactflow/dist/style.css';

let nid = 0;

const Canvas = () => {
  const initialNodes = useMorpheusStore(state => state.initialNodes);
  const initialEdges = useMorpheusStore(state => state.initialEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const canvasArmedData = useMorpheusStore(state => state.canvasArmedData);
  const armCanvas = useMorpheusStore(state => state.armCanvas);
  const setReactFlow = useMorpheusStore(state => state.setReactFlow);
  const runRules = useMorpheusStore(state => state.rules.run);
  const addNode = useMorpheusStore(state => state.addNode);
  const {screenToFlowPosition} = useReactFlow();
  const checkpointState = useMorpheusStore(state => state.checkpoint);

  const onConnect = useCallback((connection) => {
    console.log(`onConnect: `, connection);
    setEdges((oldEdges) => addEdge(connection, oldEdges));
  }, [setEdges]);

  const onBeforeEdgesChange = useCallback(e => {
    console.log(`Edges change `, e);
    onEdgesChange(e);
    checkpointState();
  }, []);

  const onBeforeNodesChange = useCallback(e => {
    // console.log(`Nodes change `, e);
    onNodesChange(e);
  }, []);

  const onNodeDragStart = useCallback((e, node, nodes) => {
    console.log(`Drag start `, e, node, nodes);
    // checkpointState();
  }, []);

  const onNodeDragStop = useCallback((e, node, nodes) => {
    console.log(`Drag stop `, e, node, nodes);
    checkpointState();
  }, []);

  const onInit = useCallback(reactFlow => {
    console.log(`ReactFlow initialized:`);
    setReactFlow(reactFlow);
    checkpointState();
    runRules();
  }, []);

  const onClick = useCallback(event => {
    if (canvasArmedData) {
      console.log(`Adding node ${canvasArmedData.objectId}`);
      armCanvas(null);

      const newNode = {
        id: `${canvasArmedData.objectId}_${++nid}`,
        type: `${canvasArmedData.objectId}`,
        position: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        data: { label: `${canvasArmedData.objectId}-${nid}`, userDropped: true },
        origin: [0.5, 0.0],
      };
      addNode(newNode);
    }
  }, [canvasArmedData]);

  return (
      <div className="reactflow-wrapper" id="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onBeforeNodesChange}
          onEdgesChange={onBeforeEdgesChange}
          onConnect={onConnect}
          onClick={onClick}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onInit={onInit}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{type: 'smoothstep', markerEnd: {type: MarkerType.ArrowClosed, width: 20, height: 20}}}
        >
          <Background variant="dots" color="#777d" style={{cursor:'crosshair'}} />
          <Controls />
          <TitleBlock />
        </ReactFlow>
      </div>
  );
}

export default Canvas;