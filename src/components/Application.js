import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
const axios = require("axios").default;
//need to run API server and this

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const appointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({ ...state, days });

  const renderSchedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`))
    ]).then(all => {
      // console.log(all[0].data, all[1].data, all[2].data);
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        day: "Monday",
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
    // axios
    // .get(`http://localhost:8001/api/days`)
    // .then(response => setDays(response.data));
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {renderSchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
