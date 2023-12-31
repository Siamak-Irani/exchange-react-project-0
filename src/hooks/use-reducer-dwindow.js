import { useReducer } from "react";

export function useReducer_DWindow(actions) {
  const actionKeys = [];
  actions.forEach((action) => {
    actionKeys.push(Object.keys(action)[0]);
  });

  function DCWreduverMaker(actionTypes) {
    // Dynamic Content Window reducer maker

    // Creates a reducer function for use in
    // the DynamicContentWindow component

    const reducer = (state, action) => {
      let baseState = { state: "LIMIT", componentsClass: {}, buttonsClass: {} };
      actionTypes.forEach((actionType) => {
        baseState.componentsClass[actionType] = "hidden";
        baseState.buttonsClass[actionType] = undefined;
      });
      let newState = baseState;

    newState.state = action.type;
    newState.componentsClass[action.type] = undefined;
    newState.buttonsClass[action.type] = "active";
    return newState;
  };

    return reducer;
  }

  function initialStateMaker(actions) {
    let state = { state: "LIMIT", componentsClass: {}, buttonsClass: {} };
    actions.forEach((actionType) => {
      state.componentsClass[actionType] = "hidden";
      state.buttonsClass[actionType] = undefined;
    });

    state.componentsClass[actions[0]] = undefined;
    state.buttonsClass[actions[0]] = "active";
    return state;
  }

  const dataDisplayReducer = DCWreduverMaker(actionKeys);
  const initialState = initialStateMaker(actionKeys);
  const useReducerList = useReducer(dataDisplayReducer, initialState);


  return useReducerList;
}
