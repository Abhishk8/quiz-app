
fetch('./ques.json').then((res) => res.json())
.then((data)=>{
    console.log(data);

    
  const quiz = document.getElementById("quiz");
  const answerElements = document.querySelectorAll(".answer");
  const questionElement = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitButton = document.getElementById("submit");
  const start = document.getElementById("start");
  const percentage = document.getElementById('percent');


  quiz.style.display = "none";
  
  start.addEventListener('click',()=>{
    quiz.style.display = "block";
    start.style.display = "none";
  })
  
  let currentQuiz = 0;
  let score = 0;
  let qselect = 0;
  let tques = data.length;
  
  const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
  };
  
  const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
      if(answerElement.checked) answer = answerElement.value;
     
    });
    return answer;
  };
  
  const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = data[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    percentage.innerText = `${Math.floor((qselect/tques) * 100)} % completed`;
    for(let i = 0; i<answerElements.length; i++){
        answerElements[i].value = currentQuizData.options[i];
    }
    a_text.innerText = currentQuizData.options[0];
    b_text.innerText = currentQuizData.options[1];  
    c_text.innerText = currentQuizData.options[2];
    d_text.innerText = currentQuizData.options[3];
    
  };
  
  loadQuiz();
  
  submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
      if(answer === data[currentQuiz].answer) score++;
      currentQuiz++;
      qselect++;
      if (currentQuiz < data.length) loadQuiz();
      else {
        quiz.innerHTML = `
              <h2>Your Score ${score}/${data.length}</h2>
              <button onclick="history.go(0)">Play Again</button>
          ` 
      }
    }
  });

})






 