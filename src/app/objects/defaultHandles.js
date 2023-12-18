import {Handle, Position} from "reactflow";

const handleStyle = {
  opacity: 0.5
};
export default (isConnectable) => [
  <Handle type="source" key={"lm"} id="lm" position={Position.Left} isConnectable={isConnectable} style={handleStyle} />,
  <Handle type="source" key={"rm"} id="rm" position={Position.Right} isConnectable={isConnectable} style={handleStyle} />,
  <Handle type="source" key={"tm"} id="tm" position={Position.Top} isConnectable={isConnectable} style={handleStyle} />,
  <Handle type="source" key={"bm"} id="bm" position={Position.Bottom} isConnectable={isConnectable} style={handleStyle} />,
];
