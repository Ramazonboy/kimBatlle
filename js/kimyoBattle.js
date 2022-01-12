let scoreNumber = 0;
let timer = 20;
const maxTime = 20;
let isTrue;
const p = document.querySelector(".col p")
const h1 = document.querySelector(".col h1")
const time = document.querySelector(".col .time")

const randomElement = (num) => {
    return (Math.floor(Math.random() * num))
}

const randKimyo = () => {
    let randNum = randomElement(davriyJadval.length);
    isTrue = randomElement(2)
    if (isTrue % 2 == 0) {
        h1.innerHTML = davriyJadval[randNum].kimyoviyBelgisi;
        p.innerHTML = davriyJadval[randNum].nomi;
    }
    else {
        h1.innerHTML = davriyJadval[randNum].kimyoviyBelgisi;
        p.innerHTML = davriyJadval[randNum + 1].nomi;
    }
    console.log(randNum, isTrue, scoreNumber);
}

randKimyo()

const changeWidthLine = () => {
    let w = (100 / maxTime) * timer;
    time.style.width = `${w}%`;
};

let isGameOver = false;
const checkBestScore = () => {
    if (isGameOver) return;

    let oldBestScore = +localStorage.getItem("bestScore");

    yourScore.innerHTML = scoreNumber;

    if (oldBestScore < scoreNumber) {
        localStorage.setItem("bestScore", scoreNumber);
        bestScore.innerHTML = scoreNumber;

        refresh.classList.add("bg-success");
        refresh.classList.remove("bg-danger");
    } else {
        bestScore.innerHTML = oldBestScore;
        refresh.classList.remove("bg-success");
        refresh.classList.add("bg-danger");
    }

    let allScores = JSON.parse(localStorage.getItem("allScores")) || [];

    let scores = [...allScores, scoreNumber].sort((a, b) => a - b);
    scores = [...new Set(scores)];

    let topScores = scores.slice(-7);

    localStorage.setItem("allScores", JSON.stringify(scores));

    topScores.reverse().map((s, i) => {
        const row = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.innerHTML = i + 1;
        td1.className = "fw-bold";

        const td2 = document.createElement("td");
        td2.innerHTML = s;

        if (s == scoreNumber) {
            const classes = ["bg-warning", "text-white"];
            td1.classList.add(...classes);
            td2.classList.add(...classes);
        }

        row.appendChild(td1);
        row.appendChild(td2);

        tbody.appendChild(row);
    });

    isGameOver = true;
};

const check = (selectedAnswer) => {
    if (timer <= 0) {
        refresh.classList.remove("d-none");
        checkBestScore();
        return;
    }

    let isWin = !(!isTrue ^ selectedAnswer);
    if (isWin) {
        scoreNumber++;
        timer += 3;
    } else {
        timer -= 3;
    }

    if (timer > maxTime) timer = maxTime;
    changeWidthLine();

    //score.innerHTML = scoreNumber;

    randKimyo();
};

let interval;
const startTimer = () => {
    interval = setInterval(() => {
        if (timer <= 0) {
            refresh.classList.remove("d-none");
            clearInterval(interval);
            checkBestScore();
            return;
        }
        timer--;

        changeWidthLine();
    }, 300);
};

startTimer();

const reload = () => {
    window.location.reload(true);
};
