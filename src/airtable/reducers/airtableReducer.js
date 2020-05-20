import * as actionTypes from "../actions/actionTypes/actionTypes.js";

const initialState = {
  isLoading: false,
  roadmap: false,
};

// sort based on priority
// const prioritize = (epicA, epicB) => {
//   const priorityA = epicA.fields.priority;
//   const priorityB = epicB.fields.priority;
//   if (priorityA > priorityB) return 1;
//   if (priorityB > priorityA) return -1;
//   return 0;
// };

// sort based on autonumber
const prioritize = (epicA, epicB) => {
  const countA = epicA.fields.recordNumber;
  const countB = epicB.fields.recordNumber;
  if (countA > countB) return 1;
  if (countB > countA) return -1;
  return 0;
};

const groupRoadmap = (roadmap) => {
  let groupedRoadmap = {
    themes: [],
    released: { themes: {} },
    q1: { themes: {} },
    q2: { themes: {} },
    q3: { themes: {} },
    q4: { themes: {} },
    planned: { themes: {} },
  };
  console.log(groupedRoadmap);

  Object.values(roadmap).map((t, i) => {
    let themeObj = {};
    themeObj[t.theme] = [];
    groupedRoadmap.themes.push(t.theme);

    groupedRoadmap.released.themes[t.theme] = { epics: [] };
    groupedRoadmap.q1.themes[t.theme] = { epics: [] };
    groupedRoadmap.q2.themes[t.theme] = { epics: [] };
    groupedRoadmap.q3.themes[t.theme] = { epics: [] };
    groupedRoadmap.q4.themes[t.theme] = { epics: [] };
    groupedRoadmap.planned.themes[t.theme] = { epics: [] };
  });

  Object.values(roadmap).map((theme, i) => {
    theme.epics.map((epic, k) => {
      switch (epic.fields["proposed release quarter"]) {
        case "Released":
          groupedRoadmap.released.themes[epic.fields.section].epics.push(epic);
          break;
        case "Q1 CY20":
          groupedRoadmap.q1.themes[epic.fields.section].epics.push(epic);
          break;
        case "Q2 CY20":
          groupedRoadmap.q2.themes[epic.fields.section].epics.push(epic);
          break;
        case "Q3 CY20":
          groupedRoadmap.q3.themes[epic.fields.section].epics.push(epic);
          break;
        case "Q4 CY20":
          groupedRoadmap.q4.themes[epic.fields.section].epics.push(epic);
          break;
        default:
          groupedRoadmap.planned.themes[epic.fields.section].epics.push(epic);
          break;
      }
    });
  });

  return groupedRoadmap;
};

const formatRoadmap = (roadmap) => {
  let roadmapGrouped = {};

  roadmap.data.records.map((record) => {
    if (record.fields["external visibility"]) {
      // if epic doesn't exist in obj yet, create it
      typeof roadmapGrouped[record.fields.section] === "undefined" &&
        (roadmapGrouped[record.fields.section] = {
          theme: record.fields.section,
          epics: [],
          id: record.fields.section.toLowerCase().split(" ").join(""),
        });

      return roadmapGrouped[record.fields.section].epics.push(record);
    } else {
      return "";
    }
  });

  Object.values(roadmapGrouped).forEach((theme) => {
    theme.epics.sort(prioritize);
  });

  return roadmapGrouped;
};

function airtableReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ROADMAP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_ROADMAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roadmap: formatRoadmap(action.res),
        roadmapGrouped: groupRoadmap(formatRoadmap(action.res)),
      };
    case actionTypes.FETCH_ROADMAP_FAILURE:
      return {
        ...state,
        isLoading: false,
        roadmap: action.error,
      };
    default:
      return state;
  }
}

export default airtableReducer;
