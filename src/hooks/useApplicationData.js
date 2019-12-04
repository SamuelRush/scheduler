import React, { useState, useEffect, useReducer } from "react";
import { arrayExpression } from "@babel/types";
// import reducer, {
//   SET_DAY,
//   SET_APPLICATION_DATA,
//   SET_INTERVIEW
// } from "reducers/application";

const axios = require("axios").default;

export default function useApplicationData(initial) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return { ...state, ...action };
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
          days: updateSpot(1)
        });
      });
  }

  function updateSpot(change) {
    const dayIndex = state.days.findIndex(d => d.name === state.day);
    const updatedDays = [...state.days];
    updatedDays[dayIndex].spots += change;
    return updatedDays;
  }

  function bookInterview(id, interview, changeValue = -1) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview: interview
      })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
          days: updateSpot(changeValue)
        });
      });
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`))
    ]).then(all => {
      const [days, appointments, interviewers] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
