import * as actionTypes from "./actionTypes/actionTypes.js";

export function fetchRoadmap() {
  return {
    type: actionTypes.FETCH_ROADMAP_REQUEST
  };
}
