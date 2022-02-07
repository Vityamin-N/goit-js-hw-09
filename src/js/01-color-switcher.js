const refs ={
    startButton: document.querySelector("[data-start]"),
    stopButton: document.querySelector("[data-stop]"),
};
let colorId = null;
let isColorSet = false;

buttonStyle();
switchButtonDisable(refs.stopButton);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function onStartButtonClick(){
    if(isColorSet){
        return;
    }
    colorId = setInterval(setRandomBgColor, 1000);
    isColorSet = true;
    changeDisable();
}
function onStopButtonClick(){
    isColorSet = false;
    clearInterval(colorId);
    changeDisable();
}

refs.startButton.addEventListener("click", onStartButtonClick);
refs.stopButton.addEventListener("click", onStopButtonClick);

function setRandomBgColor(){
    const randomBgColor = getRandomHexColor();
    document.body.style.backgroundColor = randomBgColor;
}

function switchButtonDisable(btn){
    btn.disabled = !btn.disabled;
}
function changeDisable(){
    switchButtonDisable(refs.startButton);
    switchButtonDisable(refs.stopButton);
}
function buttonStyle(){
    const mainTag = document.createElement('main');
    const divTag = document.createElement('div');
    divTag.classList.add('center');
    mainTag.appendChild(divTag);
    refs.startButton.before(mainTag);
    divTag.appendChild(refs.startButton);
    divTag.appendChild(refs.stopButton);
}
