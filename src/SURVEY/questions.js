const questions = [
  {
    id: "ownsCar",
    text: "Do you own a car?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "carBrand",
    text: "What brand is your car?",
    type: "text",
    showIf: (answers) => answers.ownsCar === "Yes",
  },
  {
    id: "usePublicTransport",
    text: "Do you use public transport?",
    type: "radio",
    options: ["Yes", "No"],
    showIf: (answers) => answers.ownsCar === "No",
  },
  {
    id: "finalQuestion",
    text: "How often do you travel each week?",
    type: "text",
  },
];

export default questions;
