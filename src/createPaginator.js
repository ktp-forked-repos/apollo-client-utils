import get from "lodash.get"
import mergeWith from "lodash.mergeWith"

export function createPaginator(data, path, cursorVar = "cursor") {
  return function() {
    return data.fetchMore({
      variables: {
        ...data.variables,
        [cursorVar]: get(data, `${path}.pageInfo.endCursor`),
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        // save reference to fetchMoreResult edges
        const newEdges = get(fetchMoreResult, `${path}.edges`)
        // return prevResult and fetchMoreResult merged together
        return mergeWith(
          {}, // merge into new object (apollo prevents mutation)
          prevResult,
          fetchMoreResult,
          // customize merge behavior
          (objValue, srcValue, key) => {
            // concat rather than merge the new edges
            if (srcValue === newEdges) {
              return [...objValue, ...srcValue]
            }
            // otherwise default mergeWith behavior
          }
        )
      },
    })
  }
}
