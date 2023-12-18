import {useMorpheusStore} from "@/app/store";

const RuleData = function(state)  {
  this.titleBlock = state.titleBlock;
  this.nodes = state.reactFlow.getNodes();
  this.edges = state.reactFlow.getEdges();

  this.hasTitle = function() {
    return this.titleBlock.title.trim().length > 0;
  };

  this.getNodeCount = function() {
    return this.nodes.length;
  };

  this.getConnectedNodes = function(node, downstream) {
    const cn = [];
    const nid = typeof node === 'string' ? node : (node.id || '');
    const both = downstream === undefined;
    this.edges.forEach(e => {
      if (e.source === nid && (downstream || both)) {
        cn.push(e.target);
      }
      if (e.target === nid && (!downstream || both)) {
        cn.push(e.source);
      }
    });
    return cn;
  };

  this.getUpstreamNodes = function(node) {
    return this.getConnectedNodes(node, false);
  };

  this.getDownstreamNodes = function(node) {
    return this.getConnectedNodes(node, true);
  };
}


export default RuleData;
