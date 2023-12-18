import rules from './ruledef';
import RuleData from './ruledata';

const runRules = async (state) => {
  return new Promise((resolve, reject) => {
    try {
      const ruleData = new RuleData(state);
      const findings = [];
      rules.forEach(r => r(ruleData, findings));
      setTimeout(() => resolve(findings), 100);
      // resolve(findings);
    } catch (ex) {
      reject(ex);
    }
  });
}

const getFindingsForNodeId = (findings, id) => findings.filter(f => f.elementId === id);

export {
  runRules,
  getFindingsForNodeId,
}