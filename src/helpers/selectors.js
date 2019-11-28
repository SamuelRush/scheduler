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

export function getInterviewersForDay(state, day) {
  const ivw = [];

  for (let dayId of state.days) {
    if (dayId.name === day) {
      const interviewers = dayId.interviewers;
      for (let ivwID of interviewers) {
        for (const iId in state.interviewers) {
          if (Number(iId) === Number(ivwID)) {
            ivw.push(state.interviewers[iId]);
          }
        }
      }
    }
  }

  return ivw;
}

export function getInterview(state, appointment) {
  let interviewData = {};
  if (appointment !== null) {
    const interNum = appointment["interviewer"];
    for (const iId in state.interviewers) {
      if (Number(iId) === Number(interNum)) {
        interviewData.student = appointment["student"];
        interviewData.interviewer = {};
        interviewData.interviewer.id = state.interviewers[iId].id;
        interviewData.interviewer.name = state.interviewers[iId].name;
        interviewData.interviewer.avatar = state.interviewers[iId].avatar;
      }
    }
  }
  if (Object.keys(interviewData).length === 0) {
    return null;
  } else {
    return interviewData;
  }
}
