const f = (elementId, severity, message) => {
  return {elementId, severity, message};
}

const isEmpty = val => val === null || val === undefined || (val.trim && val.trim().length === 0);

const titleBlockRules = (ruleData, findings) => {
  const emptyTitleBlockFields = [];
  for (let p in ruleData.titleBlock) {
    if (isEmpty(ruleData.titleBlock[p])) {
      emptyTitleBlockFields.push(p);
    }
  }
  if (emptyTitleBlockFields.length === 1) {
    findings.push(f('titleBlock', 'error', `The field ${emptyTitleBlockFields[0]} in the title block cannot be empty.`));
  }
  if (emptyTitleBlockFields.length > 1) {
    findings.push(f('titleBlock', 'error', `Provide appropriate values for the following fields in the title block ${JSON.stringify(emptyTitleBlockFields, null, 1)}.`));
  }
}

const objectBasicRules = (ruleData, findings) => {
  const nodes = ruleData.nodes;
  nodes.forEach(n => {
    if (n.type === 'application' && isEmpty(n.data.type)) {
      findings.push(f(n.id, 'error', `Must select application type.`));
    }
    if (ruleData.getConnectedNodes(n).length === 0) {
      findings.push(f(n.id, 'error', `Floating ${n.type} nodes are not permitted.`));
    }
  });
}

const ruleDefs = [
  titleBlockRules,
  objectBasicRules,
];



export default ruleDefs;