// Select DOM elements
const choices = document.querySelectorAll(".choice");
const Msg = document.querySelector(".msg-con");
const user = document.querySelector("#user-move");
const Comp = document.querySelector("#Comp-move");
const ele = document.querySelector(".time");
const pause = document.querySelector("#btn");
const resume = document.querySelector("#btn2");
const Text = document.querySelector("#W-text");
const Con = document.querySelector(".Con");
const play = document.querySelector("#Play");
const play1 = document.querySelector("#Play1");
const addcl = document.querySelector(".main-div");

// Initialize game state
let UserCount = 0;
let CompCount = 0;
let timer;
let sec = 0;

// Function to clear any existing timer
const clearGameTimer = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};

// Pause Button Event Listener
pause.addEventListener("click", () => {
    clearInterval(timer);
    pause.disabled = true;
    resume.disabled = false;
    pause.style.backgroundColor = "orange";
});

// Resume Button Event Listener
resume.addEventListener("click", () => {
    pause.disabled = false;
    resume.disabled = true;
    pause.style.backgroundColor = "rgb(3, 3, 64)";
    timer = setInterval(() => {
        ele.innerHTML = (sec < 10) ? `00:0${sec}` : `00:${sec}`;
        sec++;
        if (sec === 30) {
            ShowFinal();
        }
    }, 1000);
});

// Function to get computer choice
const Compchoice = () => {
    const arr = ["rock", "paper", "scissors"];
    const Ran_ind = Math.floor(Math.random() * 3);
    return arr[Ran_ind];
}

// Function to handle draw scenario
const drawGame = () => {
    Msg.innerText = `Game was Draw. Try Again`;
    Msg.style.backgroundColor = "blue";
}

// Function to show the winner
const showWinner = (Winner, UserChoice, compChoice) => {
    if (Winner) {
        UserCount++;
        user.innerText = UserCount;
        Msg.style.backgroundColor = "green";
        Msg.innerText = `You Win. ${UserChoice} beats ${compChoice}`;
    } else {
        CompCount++;
        Comp.innerText = CompCount;
        Msg.style.backgroundColor = "red";
        Msg.innerText = `You Lost. ${compChoice} beats ${UserChoice}`;
    }
}

// Function to play the game
const playGame = (UserChoice) => {
    const compChoice = Compchoice();
    console.log("User choice is:", UserChoice);
    console.log("Computer choice is:", compChoice);

    if (UserChoice === compChoice) {
        drawGame();
    } else {
        const Winner = (UserChoice === "rock" && compChoice === "scissors") ||
                        (UserChoice === "paper" && compChoice === "rock") ||
                        (UserChoice === "scissors" && compChoice === "paper");
        showWinner(Winner, UserChoice, compChoice);
    }
}

// Function to attach click event to choices
const ClickChoices = () => {
    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            const UserChoice = choice.getAttribute("id");
            playGame(UserChoice);
        });
    });
}

// Function to start the timer
const startTimer = () => {
    sec = 0;
    ele.innerHTML = "00:00";
    timer = setInterval(() => {
        ele.innerHTML = (sec < 10) ? `00:0${sec}` : `00:${sec}`;
        sec++;
        if (sec === 30) {
            ShowFinal();
        }
    }, 1000);
}

// Function to handle game pause
const pauseGame = () => {
    clearGameTimer();
    sec = 0;
    ele.innerHTML = "00:00";
}

// Function to handle game start
const ClickPlay = () => {
    pauseGame();
    startTimer();
    UserCount = 0;
    CompCount = 0;
    user.innerText = "0";
    Comp.innerText = "0";
    ClickChoices();
}
const ClickPlay1 = () => {
    addcl.style.visibility="visible";
    Con.classList.add("hide");
    pauseGame();
    startTimer();
    UserCount = 0;
    CompCount = 0;
    user.innerText = "0";
    Comp.innerText = "0";
  
}

// Play Button Event Listener
play.addEventListener("click", ClickPlay);
// play1
play1.addEventListener("click", ClickPlay1);

// Function to show final result
const ShowFinal = () => {
    clearGameTimer();
    sec = 0;

    let resultMessage;
    
    if (UserCount > CompCount) {
        resultMessage = `<h3>You Won!<br>Your Score: ${UserCount}<br>Comp Score: ${CompCount}</h3>`;
    } else if (UserCount < CompCount) {
        resultMessage = `<h3>You Lost!<br>Your Score: ${UserCount}<br>Comp Score: ${CompCount}</h3>`;
    } else {
        resultMessage = `<h3>No Winner<br>Your Score: ${UserCount}<br>Comp Score: ${CompCount}</h3>`;
    }
    
    Con.classList.remove("hide");
    Text.innerHTML = resultMessage;

    // Reset counts for the next round
    UserCount = 0;
    CompCount = 0;
    
    console.log("before");
    console.log(UserCount, CompCount);
    console.log("after");
    console.log(UserCount, CompCount);
    
    DisplayNone();
   
}


// Function to hide elements
const DisplayNone = () => {
    addcl.style.visibility = "hidden";
}

// Remove play1 button functionality 
