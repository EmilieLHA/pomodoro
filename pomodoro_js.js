// Selection des élements du DOM 
let workTimerArea       = document.querySelector('#work-clock');
let pauseTimerArea      = document.querySelector('#pause-clock');
let breakTimerArea      = document.querySelector('#break-clock');

let workStartButton     = document.querySelector('#workStart');
let pauseStartButton    = document.querySelector('#pauseStart');
let breakStartButton    = document.querySelector('#breakStart');

let pomodoroTab         = document.querySelector('#pomodoro-tab');
let pauseTab            = document.querySelector('#pause-tab');
let breakTab            = document.querySelector('#break-tab');
let cycle               = document.querySelector('.cycle');


// Création des variables 
    // Variables d'initialisation 
    let workingPeriodInSeconds  = 30;
    let pausePeriodInSeconds    = 5;
    let breakPeriodInSeconds    = 60;
    let cycleNumber = 1;
    let pause = true;
    let tempsInitial = 1;
    let tempsEcoule = 0;
    let notification = new Audio('notification.mp3');

    // Variables de fonction 

    let tempsRestant= tempsInitial - tempsEcoule;
    let timerInMinutes;
    let timerInSeconds;
    let timer;
    
    afficherTemps(workingPeriodInSeconds, workTimerArea);

// Création de l'événement au clic

workStartButton.addEventListener('click', () => {
    // Fonction stop placée en début de code pour ne pas que le timer se rappelle lui même 
    stop();
    start(workingPeriodInSeconds, workTimerArea, workStartButton);

});

pauseStartButton.addEventListener('click',  () => {
    stop();
    start(pausePeriodInSeconds, pauseTimerArea, pauseStartButton);
} );

breakStartButton.addEventListener('click',  () => {
    stop();
    start(breakPeriodInSeconds, breakTimerArea, breakStartButton);
} );

// Fonction arrêt du timer 
function stop() {
        clearInterval(timer);
    };

// function affichage du choronomètre 
function afficherTemps(tempsRestant, timerArea) {
    timerInMinutes = Math.trunc(tempsRestant/60);
    timerInSeconds = tempsRestant%60;
    timerArea.innerText = `${timerInMinutes}:` + ((timerInSeconds<10) ? `0${timerInSeconds}` : `${timerInSeconds}`);
};

// Function reset timer 
function reset(button, tempsInitial) {
    button.innerText = "Start";
    pause = true;
    tempsEcoule = 0;
    tempsRestant = tempsInitial;
};


// Fonction timer à laquelle on passe des paramètres en fonction du bouton cliqué 
function start(tempsInitial, timerArea, button) { 

    tempsRestant = tempsInitial - tempsEcoule;
    afficherTemps(tempsRestant, timerArea)

    button.innerText = (pause)? 'Pause':'Start';
    pause = !pause;
    console.log(pause);


    timer = setInterval(() => {

        if (tempsRestant > 0 && pause == false) {
            tempsRestant--;
            tempsEcoule++;
            
            afficherTemps(tempsRestant, timerArea)

        } else if (tempsRestant == 0) {

        stop();
        notification.play();
        button.innerText = "Start";
        pause = true;
        tempsEcoule = 0;
        tempsRestant = tempsInitial;
        
            switch(button) {
                case workStartButton:
                    if (cycleNumber == 0 || cycleNumber%4 != 0) {
                    cycleNumber++;
                    pauseTab.click();
                    } else {
                    cycleNumber++;
                    breakTab.click()
                    }
                    break;

                case pauseStartButton:
                    pomodoroTab.click();
                    cycle.innerText=cycleNumber;
                    break;
                
                case breakStartButton:
                    pomodoroTab.click();
                    cycle.innerText=cycleNumber;
                    break;                        
            }
        } else {
        return;
        }
    }, 1000);
 };


// Modification de style et arrêt des timers en cours
pomodoroTab.addEventListener('click', function() {
    stop();
    reset(pauseStartButton, pausePeriodInSeconds);
    reset(breakStartButton, breakPeriodInSeconds);
    afficherTemps(workingPeriodInSeconds, workTimerArea); 
    document.body.style.backgroundColor = '#FBDA61';
    document.body.style.backgroundImage = "linear-gradient(180deg, #FBDA61 1%, #FF5ACD 100%)";
});

pauseTab.addEventListener('click', function() {
    stop();
    reset(workStartButton, workingPeriodInSeconds);
    reset(breakStartButton, breakPeriodInSeconds);
    afficherTemps(pausePeriodInSeconds, pauseTimerArea); 
    
    document.body.style.backgroundColor = '#A9C9FF';
    document.body.style.backgroundImage = "linear-gradient(236deg, #A9C9FF 28%, #FFBBEC 85%)";
});

breakTab.addEventListener('click', function() {
    stop();
    reset(workStartButton, workingPeriodInSeconds);
    reset(pauseStartButton, pausePeriodInSeconds);
    afficherTemps(breakPeriodInSeconds, breakTimerArea); 
    document.body.style.backgroundColor = '#A9C9FF';
    document.body.style.backgroundImage = 'linear-gradient(180deg, #2af598 0%, #009efd 100%)';
});