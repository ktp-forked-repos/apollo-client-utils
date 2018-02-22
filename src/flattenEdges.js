export function flattenEdges(obj) {
  if (!obj || typeof obj !== "object") return obj
  let result = {}
  for (let key in obj) {
    if (key === "edges") {
      result = (obj[key] || []).map(edge => flattenEdges(edge.node))
    } else {
      result[key] = flattenEdges(obj[key])
    }
  }
  return result
}
