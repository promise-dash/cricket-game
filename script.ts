var timerDisplay: HTMLElement = document.getElementById("timer")!;
var hitOne: HTMLElement = document.getElementById("hit1")!;
var hitTwo: HTMLElement = document.getElementById("hit2")!;
var restartBtn: HTMLElement = document.getElementById('restart-btn')!;


restartBtn.addEventListener('click', function(){
    location.reload();
});

class Game {
    players: number = 1;
    balls: number = 1;
    total: number = 0;
    teamTotal: number = 0;
    team: number = 1;
    toggle: number = 1;
    running: number = 0;
    seconds: any = 0;
    startTime: number = 0;
    updatedTime: number = 0;
    tInterval: any;
    difference: number = 0;

    randomRunGenerator = (): number => {
        return Math.floor(Math.random() * 7);
    };

    displayRuns = () => {
        if (this.players < 11) {
            if (this.players === 1) {
                this.startTimer();
            }
            const totalPara = document.createElement("td");
            if (this.balls < 7) {
                const run = this.randomRunGenerator();
                const run_data = document.createElement("td");
                run_data.innerHTML = run !== 0 ? `${run}`: 'W';

                if (run === 0) {
                    document.getElementById(`t${this.team}${this.players}`)!.appendChild(run_data).style.border = '1px solid black';

                    totalPara.innerHTML = `<b style="color:dodgerblue">${this.total}</b>`;
                    document.getElementById(`t${this.team}${this.players}`)!.appendChild(totalPara);
                    this.players++;
                    this.balls = 1;
                    this.total = 0;
                }
                else {
                    document.getElementById(`t${this.team}${this.players}`)!.appendChild(run_data).style.border = '1px solid black';
                    this.balls++;
                    this.total += run;
                    this.teamTotal += run;
                    document.getElementById(`score${this.team}`)!.innerHTML = `${this.teamTotal}`;
                }
            } else {
                totalPara.innerHTML = `<b style="color:dodgerblue">${this.total}</b>`;
                document.getElementById(`t${this.team}${this.players}`)!.appendChild(totalPara).style.border = '1px solid black';
                this.players++;
                this.balls = 1;
                this.total = 0;
            }
        } else {
            document.getElementById(`score${this.team}`)!.innerHTML = `${this.teamTotal}`;
            this.resetTimer();
        }
    };

    startTimer = () => {
        if (!this.running) {
            this.startTime = new Date().getTime();
            this.tInterval = setInterval(this.displayTime, 1);
            this.running = 1;
        }
    };

    displayTime = ()=> {
        this.updatedTime = new Date().getTime();
        this.difference = this.startTime + 60000 - this.updatedTime;
        this.seconds = Math.floor((this.difference % (1000 * 60)) / 1000);
        this.seconds = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
        timerDisplay.innerHTML = `${this.seconds}s`;
        if (this.seconds == 0) {
            this.resetTimer();
        }
    }
    

    resetTimer = () => {
        this.difference = 0;
        this.running = 0;
        this.seconds = 0;
        timerDisplay.innerHTML = `${this.seconds}s`;
        clearInterval(this.tInterval);
        if (this.toggle === 1) {
            hitOne.setAttribute("class", "btn btn-primary disabled");
            hitOne.removeEventListener("click", game.displayRuns, false);
            hitTwo.setAttribute("class", "btn btn-primary");
            hitTwo.addEventListener("click", game.displayRuns);
            this.team = 2;
            this.players = 1;
            this.balls = 1;
            this.total = 0;
            this.teamTotal = 0;
            this.toggle = 0;
        } else {
            hitTwo.setAttribute("class", "btn btn-primary disabled");
            hitTwo.removeEventListener("click", game.displayRuns, false);
            this.handleWinner();
        }
    };

    handleWinner = () => {
        const team1 = parseInt(document.getElementById("score1")!.innerHTML);
        const team2 = parseInt(document.getElementById("score2")!.innerHTML);
        if (team1 > team2) {
            document.getElementById("result")!.innerHTML = `Team 1 won by ${team1 - team2}`;
        } else if (team1 < team2) {
            document.getElementById("result")!.innerHTML = `Team 2 won by ${team2 - team1}`;
        } else {
            document.getElementById("result")!.innerHTML = "Match Tied";
        }
    };
}

var game = new Game();
document.getElementById("hit1")!.addEventListener("click", game.displayRuns);