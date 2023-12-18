import styles from './devtools.module.css';
import {useMorpheusStore} from "@/app/store";
import {useEdges, useNodes} from "reactflow";

/**
 * TODO: Convert this to chrome extension based implementation.
 */

export default () => {
  const nodes = useNodes();
  const edges = useEdges();
  const titleBlock = useMorpheusStore(state => state.titleBlock);

  return (
      <div className={styles.container}>
        <div className={styles.header}>Morpheus DevTools</div>
        <div>Edges</div>
        <div className={styles.content}><pre>{JSON.stringify(edges, null, 2)}</pre></div>
        <div>Nodes</div>
        <div className={styles.content}><pre>{JSON.stringify(nodes, null, 2)}</pre></div>
        <div>Title Block</div>
        <div className={styles.content}><pre>{JSON.stringify(titleBlock, null, 2)}</pre></div>
      </div>
  );
}