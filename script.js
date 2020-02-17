//Set Variables
let sessionTime = 25
let breakTime = 5
let timerSwitch = false
let timeInSeconds = sessionTime * 60
let sessionModeOn = true
const alarm = new Audio("sounds/alarm.wav")
//update countdown time
function countdownUpdate(seconds) {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    //return time in 00:00:00 format but without hours if they are 0
    clockDisplay.textContent = `
    ${hours > 0 ? ("0" + hours).slice(-2) + " : " : ""}
    ${("0" + mins).slice(-2)} : 
    ${("0" + secs).slice(-2)}
    `
}

//Start and pause timer with this switch
function changeTimerSwitch() {
    //toggle switch
    timerSwitch = !timerSwitch
    sessionModeToggle = true
    //if switch is on start timer which only stops if at zero or switch is flipped  
    if (timerSwitch) {
        timerToggle.textContent = "Pause"
        let timerSet = setInterval(function () {
            if (!timerSwitch) {
                clearInterval(timerSet)
            }
            else if (timeInSeconds <= 0) {
                sessionModeOn = !sessionModeOn
                timeInSeconds = (sessionModeOn) ? sessionTime * 60 : breakTime * 60
                currentMode.textContent = sessionModeOn ? "Session" : "Break"
                alarm.play()
            }
            countdownUpdate(timeInSeconds)
            timeInSeconds--
        }, 1000)
    }
    else { timerToggle.textContent = "Start" }

}

//handler for + and - buttons to update the session and time variables and their displays
function changeTime(e) {
    //session time update
    if (this.parentElement.id == "session") {
        sessionTime = sessionTime + parseInt(this.value)
        sessionTime = (sessionTime >= 1 ? sessionTime : 1)
    }
    //break time update
    else if (this.parentElement.id == "break") {
        breakTime += parseInt(this.value)
        breakTime = (breakTime >= 1 ? breakTime : 1)
    }
    //update countdown time as long as its not running 
    setClock()
}

function setClock() {
    breakDisplay.textContent = `${breakTime}`
    sessionDisplay.textContent = `${sessionTime}`
    currentMode.textContent = "Session"
    timerSwitch = false
    timeInSeconds = sessionTime * 60
    timerToggle.textContent = "Start"
    countdownUpdate(timeInSeconds)
}

function stopClock() {
    sessionTime = 25
    breakTime = 5
    timerSwitch = false
    setClock()
}

const sessionDisplay = document.querySelector("#session .changer__display")
const breakDisplay = document.querySelector("#break .changer__display")
const clockDisplay = document.querySelector(".clock__display")
const displayChangers = document.querySelectorAll(".changer button")
const timerToggle = document.querySelector(".clock__button")
const currentMode = document.querySelector(".clock__name")

displayChangers.forEach(changer => changer.addEventListener("click", changeTime))
