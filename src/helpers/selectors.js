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
  // function getInterviewersForDay(state, day) {
  const ivw = [];
  for (let dayId of state.days) {
    if (dayId.name === day) {
      const appointments = dayId.appointments;
      for (let apptmtID of appointments) {
        for (const aId in state.appointments) {
          if (Number(aId) === Number(apptmtID)) {
            if (state.appointments[aId].interview !== null) {
              for (const iId in state.interviewers) {
                if (
                  Number(iId) ===
                  Number(state.appointments[aId].interview.interviewer)
                ) {
                  ivw.push(state.interviewers[iId]);
                }
              }
            }
          }
        }
      }
    }
  }

  return ivw;
}
// console.log(getInterviewersForDay(state, "Monday"));

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
//WHEN THIS IS WORKING WE NEED TO TRANSFER IT TO APPLICATIONS.
