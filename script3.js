function showSection(sectionId){

const sections =
document.querySelectorAll(".content-section");

sections.forEach(section=>{
section.style.display="none";
});

document.getElementById(sectionId)
.style.display="block";
}

showSection("dashboardPage");

/* API */

async function getFact(){

try{

const response =
await fetch(
"https://uselessfacts.jsph.pl/api/v2/facts/random"
);

const data =
await response.json();

document.getElementById("fact")
.innerHTML=data.text;

}
catch{

document.getElementById("fact")
.innerHTML=
"Technology is best when it brings people together.";
}

}

/* QUIZ */

const quizData=[

{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"High Text Machine Language",
"Hyper Transfer Markup Language"
],
answer:0,
explanation:
"HTML is the standard language used to structure web pages."
},

{
question:"What is CSS used for?",
options:[
"Programming",
"Styling Web Pages",
"Networking",
"Database"
],
answer:1,
explanation:
"CSS controls the appearance and layout of websites."
},

{
question:"What does JavaScript do?",
options:[
"Styles pages",
"Makes websites interactive",
"Creates databases",
"Stores files"
],
answer:1,
explanation:
"JavaScript adds interactivity and dynamic content."
}

];

let currentQuestion=0;
let score=0;

loadQuestion();

function loadQuestion(){

const q=quizData[currentQuestion];

document.getElementById("question")
.innerHTML=q.question;

let optionsHTML="";

q.options.forEach((option,index)=>{

optionsHTML+=`
<div class="option"
onclick="checkAnswer(${index})">
${option}
</div>
`;

});

document.getElementById("options")
.innerHTML=optionsHTML;

document.getElementById("feedback")
.innerHTML="";

document.getElementById("nextBtn")
.style.display="none";
}

function checkAnswer(selected){

const q=quizData[currentQuestion];

const options=
document.querySelectorAll(".option");

options.forEach(option=>{
option.style.pointerEvents="none";
});

if(selected===q.answer){

options[selected]
.classList.add("correct");

score++;

document.getElementById("feedback")
.innerHTML=
`✅ Correct!<br><br>${q.explanation}`;

}
else{

options[selected]
.classList.add("wrong");

options[q.answer]
.classList.add("correct");

document.getElementById("feedback")
.innerHTML=
`❌ Incorrect!<br><br>
Correct Answer:
${q.options[q.answer]}
<br><br>
${q.explanation}`;

}

document.getElementById("nextBtn")
.style.display="inline-block";
}

function nextQuestion(){

currentQuestion++;

if(currentQuestion<quizData.length){

loadQuestion();

}
else{

let performance="";

if(score<=1){
performance="Beginner";
}
else if(score===2){
performance="Intermediate";
}
else{
performance="Advanced";
}

document.getElementById("quizPage")
.innerHTML=
`
<div class="card">
<h2>🎉 Quiz Completed</h2>
<h3>Score: ${score}/${quizData.length}</h3>
<p><strong>Performance:</strong> ${performance}</p>
<p>
Great job! Continue practicing HTML,
CSS and JavaScript to improve your
web development skills.
</p>
</div>
`;

}

}