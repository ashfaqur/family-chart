import CalculateTree from "./CalculateTree/CalculateTree.js"
import {generateUUID} from "./handlers"

export default function createStore(initial_state) {
  let onUpdate;
  const state = initial_state,
    update = {
      tree: (props) => {
        state.tree = calcTree();
        if (onUpdate) onUpdate(props)
      },
      mainId: main_id => state.main_id = main_id,
      data: data => {state.data = data; update.tree()}
    },
    getData = () => state.data,
    getTree = () => state.tree,
    setOnUpdate = (f) => onUpdate = f,
    methods = {}

  if (!state.data || state.data.length === 0) state.data = [{to_add: true, rels: {}, data: {}, id: generateUUID()}]

  return {state, update, getData, getTree, setOnUpdate, methods}


  function calcTree() {
    return CalculateTree({
      data_stash: state.data, main_id: state.main_id,
      node_separation: state.node_separation, level_separation: state.level_separation
    })
  }
}