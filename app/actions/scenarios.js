import helpers from '../utils/helpers'

export const ADD_SCENARIO = 'ADD_SCENARIO';
export const SAVE_SCENARIO = 'SAVE_SCENARIO';
export const DELETE_SCENARIO = 'DELETE_SCENARIO';


/* Async Actions */
export const FETCH_SCENARIOS = 'FETCH_SCENARIOS';
export const REQUEST_SCENARIOS = 'REQUEST_SCENARIOS';
export const RECEIVE_SCENARIOS = 'RECEIVE_SCENARIOS';

export const FETCH_SCENARIO = 'FETCH_SCENARIO';
export const REQUEST_SCENARIO = 'REQUEST_SCENARIO';
export const RECEIVE_SCENARIO = 'RECEIVE_SCENARIO';
export const UPDATE_REVISION = 'UPDATE_REVISION';

import {setContent} from './editor'

export function addScenario(username, scenario) {
  return function(dispatch) {
    const data = {
      author: username,
      title: scenario
    };
    // dispatch(saving...)
    helpers.postScenario(data).then(data => {
      console.log('postScenario respone', data);
      if (data.status === 201) {
        dispatch(fetchScenarios());
      }
    })
  }
}

export function saveSenario(scenario) {
  return {
    type: SAVE_SCENARIO,
    data: scenario
  }
}

export function deleteScenario(id, rev) {
  return function(dispatch) {
    helpers.deleteScenario(id, rev).then(response => {
      if (data.status === 201) {
        dispatch(fetchScenarios());
      }
    });
  }
  return {
    type: DELETE_SCENARIO,
    id: id
  }
}

export function requestScenarios() {
  return {
    type: REQUEST_SCENARIOS
  }
}

export function updateScenario(id, data) {
  return function(dispatch) {
    helpers.putScenario(id, data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(updateRevision(id, response.data.rev))
        } else {
          console.log('updateScenario', response);
        }
      });
  }
}

export function updateRevision(id, rev) {
  return {
    type: UPDATE_REVISION,
    id: id,
    rev: rev,
    updatedAt: Date.now()
  }
}

export function receiveScenarios(json) {
  return {
    type: RECEIVE_SCENARIOS,
    scenarios: json.data.rows.map(child => child.value),
    receivedAt: Date.now()
  }
}

export function requestScenario() {
  return {
    type: REQUEST_SCENARIO
  }
}

export function receiveScenario(json) {
  return (dispatch) => {
    dispatch(setScenario(json))
    dispatch(setContent(json.content));
  }
}

export function setScenario(json) {
  return {
    type: RECEIVE_SCENARIO,
    scenario: json
  }
}

export function fetchScenarios() {
  return function(dispatch) {
    dispatch(requestScenarios());

    helpers.getScenarios()
      .then((data) => {
        dispatch(receiveScenarios(data))
      })
  }
}

export function fetchScenario(id) {
  return function(dispatch) {
    dispatch(requestScenario());

    console.log(`fetch Scenario ${id}`)
    helpers.getScenario(id)
      .then(data => dispatch(receiveScenario(data)));
  }
}

export function storeScenario(scenario) {
  helpers.postScenario(scenario).
    then((data) => {
      console.log('storeScenario', data)
    })
}
