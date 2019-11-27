export function getAppointmentsForDay(state, day) {
  const apptmt = [];

  for (let dayId of state.days) {
    if (dayId.name === day) {
      const appointments = dayId.appointments;
      for (let apptmtID of appointments) {
        for (const aId in state.appointments) {
          if (Number(aId) === Number(apptmtID)) {
            apptmt.push(state.appointments[aId]);
          }
        }
      }
    }
  }

  return apptmt;
}
