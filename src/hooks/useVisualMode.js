import React, { useState, useEffect } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace) {
    history.push(next);
    setMode(next);
    if (replace) {
      history.pop();
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else if (history.length === 1) {
      setMode(initial);
    }
  }

  return { mode, transition, back };
}
