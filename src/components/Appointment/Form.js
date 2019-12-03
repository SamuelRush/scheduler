import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { Z_STREAM_ERROR } from "zlib";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = function() {
    setName("");
    setInterviewer(null);
  };
  function cancel() {
    reset();
    props.onCancel();
  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            // name={name}
            type="text"
            name="name"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            /*
          This must be a controlled component
        */
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          // onChange={interviewer => setInterviewer(interviewer)}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
