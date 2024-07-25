console.log("welcome");
let ting = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let gameEnd = false;
let count = 0;

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

const checkDraw = () => {
    if (count == 9 && !gameEnd) {
        document.querySelector('.info').innerText = "The Game Is A Draw";   
        gameEnd = true;
    }
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 0, 50, 0],
        [3, 4, 5, 0, 150, 0],
        [6, 7, 8, 0, 250, 0],
        [0, 3, 6, -100, 150, 90],
        [1, 4, 7, 0, 150, 90],
        [2, 5, 8, 100, 150, 90],
        [0, 4, 8, 0, 150, 45],
        [2, 4, 6, 0, 150, 135],
    ];
    wins.forEach(e => {
        if (
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[1]].innerText === boxtext[e[2]].innerText) &&
            (boxtext[e[0]].innerText !== "")
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameEnd = true;
            gameover.play();
            let line = document.getElementById('line');
            line.style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
            line.style.display = 'block';
        }
    });
};

let boxes = document.querySelectorAll(".box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameEnd) {
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            count += 1;
            checkWin();
            checkDraw();
            if (!gameEnd) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

let reset = document.getElementById("reset");
reset.addEventListener('click', () => {
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        boxtext.innerText = '';
    });
    document.getElementById('line').style.display = 'none';
    gameEnd = false;
    count = 0;
    document.getElementsByClassName("info")[0].innerText = "Turn for X";
});
