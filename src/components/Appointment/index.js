import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING) //ERROR
      .then(props.bookInterview(props.id, interview))
      .then(transition(SHOW));
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          // onSave={action("onSave")}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
    </article>
  );
}

//after header in article
// {props.interview ? (
//   <Show
//     student={props.interview.student}
//     interviewer={props.interview.interviewer.name}
//   />
// ) : (
//   <Empty />
// )}
