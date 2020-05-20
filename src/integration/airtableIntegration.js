import * as actionTypes from "../airtable/actions/actionTypes/actionTypes.js";
// eslint-disable-next-line
import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

export function* fetchRoadmap(action) {
  try {
    const res = yield axios
      .get(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/${process.env.REACT_APP_ROADMAP_TABLE}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          },
        }
      )
      .then((response) => response);
    yield put({
      type: actionTypes.FETCH_ROADMAP_SUCCESS,
      res,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.FETCH_ROADMAP_FAILURE,
      error,
    });
  }
}

export function* actionWatcher() {
  yield takeLatest(actionTypes.FETCH_ROADMAP_REQUEST, fetchRoadmap);
}
