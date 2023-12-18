import styles from './rules.module.css';
import {useMorpheusStore} from "@/app/store";
import {useCallback} from "react";

const severityIcon = s => {
  switch (s) {
    case 'error': return '🚫';
    case 'warning': return '⚠️';
    case 'info': return 'ℹ️';
    default: return 'ℹ️';
  }
}

export default () => {

  const rules = useMorpheusStore(state => state.rules);

  const onRunNow = useCallback(event => {
    rules.run();
  }, []);

  const onRowHover = useCallback((event, finding, show) => {
    try {
      rules.showFindingAlertForElement(finding.elementId, show);
    } catch (e) {
      console.log(`Error processing row hover. ${e.message}`);
    }
  }, []);

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>Rules {rules.running ? '⌛️' : (rules.dirty ? '⚠️' : '✓')}</div>
          <div></div>
          <div>{rules.findings.length} finding{rules.findings.length === 1 ? '' : 's'}</div>
          <div><button onClick={onRunNow} title={"Run rules now"} disabled={rules.running}>▶</button></div>
        </div>
        <div className={styles.content}>
          <div className={styles.findings}>
          {
            rules.findings.map((f, i) => {
              return (
                  <div key={i} data-rowtype={i%2?'odd':'even'} onMouseOver={event => onRowHover(event, f, true)} onMouseOut={event => onRowHover(event, f, false)}>
                    <div>{severityIcon(f.severity)}</div>
                    <div>{f.message}</div>
                  </div>
              );
            })
          }
          </div>
        </div>
      </div>
  );
}