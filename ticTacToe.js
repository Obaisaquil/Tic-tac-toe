let mianContainer = document.querySelector("main");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let popup = document.querySelector(".popup");
let closeBtn = document.querySelector("#closeBtn");

let turnO = true;
let count = 0;

let predictO = false;
let predictX = false;
let isPredictMsgNotDone = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const drawPatterns = [
    // O    // X
    [[4,5,6],[0,2,3]],
    [[1,4,6],[0,2,7]],
    [[4,7,8],[0,1,6]],
    [[0,2,7],[1,4,5]],
    [[0,4,7],[1,2,3]],
    [[0,5,7],[1,2,3]],   
    [[0,6,7],[1,2,4]],
    [[0,6,8],[1,2,4]],
    [[0,7,8],[1,2,3]],
    [[0,3,6],[1,4,7]],
    [[0,4,8],[1,3,7]],
    [[0,2,4],[3,5,6]],
    [[0,2,5],[3,4,6]],
    [[1,3,4],[0,2,5]],
    [[1,3,5],[0,2,4]],
    [[1,4,6],[0,2,3]],
    [[1,4,7],[0,2,3]],
    [[1,5,7],[0,2,3]],
    [[1,6,7],[0,2,4]],
    [[1,6,8],[0,2,4]],
    [[1,7,8],[0,2,3]],
    [[2,3,4],[0,1,5]],
    [[2,3,5],[0,1,4]],
    [[2,4,6],[0,1,3]],
    [[2,4,7],[0,1,3]],
    [[2,5,7],[0,1,3]],
    [[2,6,7],[0,1,4]],
    [[2,6,8],[0,1,4]],
    [[2,7,8],[0,1,3]],
    [[2,4,6],[0,3,5]],
    [[2,5,8],[0,3,4]],
    [[3,4,6],[0,1,2]],
    [[3,4,7],[0,1,2]],
    [[3,5,7],[0,1,2]],
    [[3,6,7],[0,1,4]],
    [[3,6,8],[0,1,4]],
    [[3,7,8],[0,1,2]],
    [[4,5,7],[0,1,2]],
    [[4,6,8],[0,2,5]],
    [[4,7,8],[0,2,3]],
    [[4,6,7],[0,1,3]],
    [[4,6,8],[0,1,3]],
    [[4,7,8],[0,1,2]],
    [[5,6,7],[0,1,4]],
    [[5,6,8],[0,1,4]],
];

const predictDraw = () => {
    for (let drawPattern of drawPatterns) {
        if (isPredictMsgNotDone) {
            let box1 = boxes[drawPattern[0][0]].innerText;
            let box2 = boxes[drawPattern[0][1]].innerText;
            let box3 = boxes[drawPattern[0][2]].innerText;
            let box4 = boxes[drawPattern[1][0]].innerText;
            let box5 = boxes[drawPattern[1][1]].innerText;
            let box6 = boxes[drawPattern[1][2]].innerText;

            if (box1 !== "" && box2 !== "" && box3 !== "" && box4 !== "" && box5 !== "" && box6 !== "") {
                if ((box1 === box2 && box2 === box3) && (box4 && box5 && box5 === box6)) {
                    predictO = true;
                    predictX = true;
                }
            }

            if (predictO && predictX === true) {
                openPopup();
                isPredictMsgNotDone = false;
            }

        }
    }
}

const openPopup = () => {
    popup.classList.remove("hide-popup");
}

closeBtn.addEventListener("click", () => {
    popup.classList.add("hide-popup");
    isPredictMsgNotDone = true;
    predictO = false;
    predictX = false;
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { //player O
            box.style.color = "#3eafb0";
            box.innerText = "O";
            turnO = false;
            count++;
        }
        else { // player X
            box.style.color = "#b0413e";
            box.innerText = "X";
            turnO = true;
            count++;
        }
        box.disabled = true;
        if (count >= 5) {
            checkWinner();
        }
    });
});

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                disableBoxes();
                showWinner(pos1Val);
            } else if (pos1Val === pos2Val && pos2Val === pos3Val && count === 9) {
                disableBoxes();
                showWinner(pos1Val);
            } else {
                if (count === 9) {
                    drawMsg();
                }
                else if (count === 6){
                    predictDraw();
                }
            }
        }
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is Player ${winner}`;
    msgContainer.classList.remove("hide-msg");
    mianContainer.classList.add("hide-msg");
}

const drawMsg = () => {
    msg.innerText = `The match has ended in a draw.`;
    msgContainer.classList.remove("hide-msg");
    mianContainer.classList.add("hide-msg");
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide-msg");
    mianContainer.classList.remove("hide-msg")
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);