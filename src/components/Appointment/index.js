import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const REMOVING = "REMOVING";
  const CONFIRM = "CONFIRM";

  function save(name, interviewer, changeValue) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview, changeValue)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE);
      });
  }

  function remove(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(REMOVING);
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE);
      });
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === REMOVING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && (
        <Error
          message={"There was an error saving."}
          onClose={() => transition(CREATE)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"There was an error deleting."}
          onClose={() => transition(SHOW)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onCancel={() => transition(SHOW)}
          onConfirm={remove}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={(...args) => save(...args, 0)}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
        />
      )}
    </article>
  );
}
