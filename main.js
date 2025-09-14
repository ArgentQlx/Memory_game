const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btn7 = document.getElementById('btn7');
const btn8 = document.getElementById('btn8');
const btn9 = document.getElementById('btn9');

const startGameBtn = document.getElementById('startGame');
const recordTable = document.getElementById('record');
const allBtns = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9]
const root = document.documentElement;
const body = document.body;
const amountBtns = document.querySelectorAll('.amountBtns');
var maxStage = 0;
var globalSequinceCounter = 0;
var sequince = [];
var amount = 3;
var isDissabled = true;
var interval;
amountBtns.forEach(e => {
    e.addEventListener('click', () => {
        if (startGameBtn.disabled) {return};
        amount = parseInt(e.textContent);
        amountBtns.forEach(e => {
            e.style.background = 'var(--text-col)'; e.style.color = 'var(--main-col)';
        });
        e.style.background = 'var(--main-col)';
        e.style.color = 'var(--text-col)'
    });
})
startGameBtn.addEventListener('click', () => {
    if (startGameBtn.disabled) {return};
    startGameBtn.disabled = true;
    if (isDissabled) {clearInterval(interval)};
    endGame();
    changeBtns(true);
    showBtns(1000);
});
startGameBtn.addEventListener('mouseover', () => {
    if (startGameBtn.disabled) {return};
    startGameBtn.classList.add('hovered')
});
startGameBtn.addEventListener('mouseout', () => {
    startGameBtn.classList.remove('hovered');
});
allBtns.forEach(e => {
    e.addEventListener('mouseover', () => {
        if (isDissabled) {return};
        e.style.background = '#ffffffa4'
    });
    e.addEventListener('mouseout', () => {e.style.background = '#fff'});
    e.addEventListener('click', () => {
        if (parseInt(e.textContent) === sequince[globalSequinceCounter]) {
            if (isDissabled) {return};
            e.style.background = 'var(--correct-col)';
            e.style.boxShadow = 'var(--correct-col) 0px 0px 15px 10px'
            globalSequinceCounter++;
            setTimeout(() => {
                e.style.background = 'var(--main-col)';
                e.style.boxShadow = '5px 5px #ffffff4d';
                if (globalSequinceCounter === sequince.length) {
                    endGame(); correct(); startGameBtn.disabled = false;
                    if (amount > maxStage) {
                        maxStage = amount;
                        recordTable.textContent = `Your high completed stage: ${maxStage}`;
                        saveScore(maxStage);
                    }
                };
            }, 500);
        } else {
            e.style.background = 'var(--wrong-col)';
            e.style.boxShadow = 'var(--wrong-col) 0px 0px 15px 10px'
            setTimeout(() => {
                e.style.background = 'var(--main-col)';
                e.style.boxShadow = '5px 5px #ffffff4d';
                endGame(); wrong(); startGameBtn.disabled = false;
            }, 500);
        };
    });
});
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function changeBtns(flag) {
    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].disabled = flag;
        if (!flag) {
            allBtns[i].style.cursor = 'pointer';
        } else {
            allBtns[i].style.cursor = 'auto';
        }
    };
    isDissabled = flag;
};
function normalBtns() {
    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].style.background = 'var(--default-col)';
    };
};
function getSequince(length) {
    const sequince = [];
    for (var i = 0; i < length; i++) {
        sequince.push(random(0, allBtns.length - 1));
    };
    return sequince
};
function wrong() {
    body.style.background = 'var(--wrong-col)';
    setTimeout(() => {body.style.background = 'var(--main-col)'}, 500);
}
function correct() {
    body.style.background = 'var(--correct-col)';
    setTimeout(() => {body.style.background = 'var(--main-col)'}, 500);
}
function showBtns(duration) {
    startGameBtn.disabled = true;
    sequince = getSequince(amount);
    let counter = 0;
    globalSequinceCounter = 0;
    interval = setInterval(() => {
        if (counter === sequince.length - 1) {
            clearInterval(interval);
            changeBtns(false);
        };
        const currentBtn = allBtns[sequince[counter]];
        currentBtn.style.background = 'var(--correct-col)';
        currentBtn.style.boxShadow = 'var(--correct-col) 0px 0px 15px 10px';
        setTimeout(() => {
            currentBtn.style.background = 'var(--main-col)';
            currentBtn.style.boxShadow = '5px 5px #ffffff4d';
        }, duration / 2);
        counter++;
    }, duration);
};
function endGame() {
    changeBtns(true);
    startGameBtn.disabled = false;
};
function saveScore(value) {
    localStorage.setItem('highScore', String(value));
}
function loadScore() {
    const value = parseInt(localStorage.getItem('highScore')) || 0;
    if (!value) {return};
    maxStage = value;
    recordTable.textContent = `Your high completed stage: ${value}`;
}
changeBtns(true);
loadScore();
amountBtns[0].click();