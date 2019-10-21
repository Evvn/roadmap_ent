import * as actionTypes from "../actions/actionTypes/actionTypes.js";

const initialState = {
  isLoading: false,
  roadmap: false
};

const prioritize = (epicA, epicB) => {
  const priorityA = epicA.fields.priority;
  const priorityB = epicB.fields.priority;
  if (priorityA > priorityB) return 1;
  if (priorityB > priorityA) return -1;
  return 0;
};

const formatRoadmap = roadmap => {
  let roadmapGrouped = {};

  roadmap.data.records.map(record => {
    // if epic doesn't exist in obj yet, create it
    typeof roadmapGrouped[record.fields.theme] === "undefined" &&
      (roadmapGrouped[record.fields.theme] = {
        theme: record.fields.theme,
        epics: []
      });

    return roadmapGrouped[record.fields.theme].epics.push(record);
  });

  Object.values(roadmapGrouped).forEach(theme => {
    theme.epics.sort(prioritize);
  });

  console.log(roadmapGrouped);

  return roadmapGrouped;
};

function airtableReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ROADMAP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_ROADMAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roadmap: formatRoadmap(action.res)
      };
    case actionTypes.FETCH_ROADMAP_FAILURE:
      return {
        ...state,
        isLoading: false,
        roadmap: action.error
      };
    default:
      return state;
  }
}

export default airtableReducer;
