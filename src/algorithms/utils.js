export const calculateDistance = (nodeA, nodeB) => {
  const dx = Math.abs(nodeA.col - nodeB.col);
  const dy = Math.abs(nodeA.row - nodeB.row);
  return Math.sqrt(dx * dx + dy * dy);
};
