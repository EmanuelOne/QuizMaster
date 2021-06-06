import React, { useState, useEffect } from "react";
import Question from "./conponents/Question";
import ScoreSection from "./conponents/ScoreSection";
import "./index.css";
import Home from "./conponents/Home";
import Admin from "./conponents/Admin.js";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Forms } from "./conponents/F";
import BonusQuestion from "./conponents/BonusQuestion";
import firebase from "./utils/firebase";
import axios from "axios";
import { questionApi, userApi } from "./utils/stringConstants";

export default function App() {
  // const [questions, setQuestion] = useState([]);
  // var starCountRef = firebase.database().ref("posts/" + postId + "/starCount");
  // starCountRef.on("value", (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    console.log("from app.js");
    if (questions.length <= 0) {
      axios
        .get(questionApi)
        .then((res) => setQuestions(res.data))
        .catch((err) => console.log(err.message));
      axios
        .get(userApi)
        .then((res) => console.log("Database Cleaned!!"))
        .catch((err) => console.log(err.message));
    }
  });
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/score" component={ScoreSection} />
        <Route path="/q/bonus/:id/">
          <BonusQuestion questions={questions} />
        </Route>
        <Route path="/q/:id" exact>
          <Question
            className="questions"
            questions={questions}
            setScore={setScore}
            score={score}
          />
        </Route>
        <Route path="/" exact component={Home} />

        <Route path="/admin/questions/:id" component={Forms} />
        <Route path="/admin" exact component={Admin} />
      </BrowserRouter>
    </div>
  );
}
