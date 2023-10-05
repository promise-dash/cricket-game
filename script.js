var timerDisplay = document.getElementById("timer");
var hitOne = document.getElementById("hit1");
var hitTwo = document.getElementById("hit2");
var restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', function () {
    location.reload();
});
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.players = 1;
        this.balls = 1;
        this.total = 0;
        this.teamTotal = 0;
        this.team = 1;
        this.toggle = 1;
        this.running = 0;
        this.seconds = 0;
        this.startTime = 0;
        this.updatedTime = 0;
        this.difference = 0;
        this.randomRunGenerator = function () {
            return Math.floor(Math.random() * 7);
        };
        this.displayRuns = function () {
            if (_this.players < 11) {
                if (_this.players === 1) {
                    _this.startTimer();
                }
                var totalPara = document.createElement("td");
                if (_this.balls < 7) {
                    var run = _this.randomRunGenerator();
                    var run_data = document.createElement("td");
                    run_data.innerHTML = run !== 0 ? "".concat(run) : 'W';
                    if (run === 0) {
                        document.getElementById("t".concat(_this.team).concat(_this.players)).appendChild(run_data).style.border = '1px solid black';
                        totalPara.innerHTML = "<b style=\"color:dodgerblue\">".concat(_this.total, "</b>");
                        document.getElementById("t".concat(_this.team).concat(_this.players)).appendChild(totalPara);
                        _this.players++;
                        _this.balls = 1;
                        _this.total = 0;
                    }
                    else {
                        document.getElementById("t".concat(_this.team).concat(_this.players)).appendChild(run_data).style.border = '1px solid black';
                        _this.balls++;
                        _this.total += run;
                        _this.teamTotal += run;
                        document.getElementById("score".concat(_this.team)).innerHTML = "".concat(_this.teamTotal);
                    }
                }
                else {
                    totalPara.innerHTML = "<b style=\"color:dodgerblue\">".concat(_this.total, "</b>");
                    document.getElementById("t".concat(_this.team).concat(_this.players)).appendChild(totalPara).style.border = '1px solid black';
                    _this.players++;
                    _this.balls = 1;
                    _this.total = 0;
                }
            }
            else {
                document.getElementById("score".concat(_this.team)).innerHTML = "".concat(_this.teamTotal);
                _this.resetTimer();
            }
        };
        this.startTimer = function () {
            if (!_this.running) {
                _this.startTime = new Date().getTime();
                _this.tInterval = setInterval(_this.displayTime, 1);
                _this.running = 1;
            }
        };
        this.displayTime = function () {
            _this.updatedTime = new Date().getTime();
            _this.difference = _this.startTime + 60000 - _this.updatedTime;
            _this.seconds = Math.floor((_this.difference % (1000 * 60)) / 1000);
            _this.seconds = _this.seconds < 10 ? "0".concat(_this.seconds) : "".concat(_this.seconds);
            timerDisplay.innerHTML = "".concat(_this.seconds, "s");
            if (_this.seconds == 0) {
                _this.resetTimer();
            }
        };
        this.resetTimer = function () {
            _this.difference = 0;
            _this.running = 0;
            _this.seconds = 0;
            timerDisplay.innerHTML = "".concat(_this.seconds, "s");
            clearInterval(_this.tInterval);
            if (_this.toggle === 1) {
                hitOne.setAttribute("class", "btn btn-primary disabled");
                hitOne.removeEventListener("click", game.displayRuns, false);
                hitTwo.setAttribute("class", "btn btn-primary");
                hitTwo.addEventListener("click", game.displayRuns);
                _this.team = 2;
                _this.players = 1;
                _this.balls = 1;
                _this.total = 0;
                _this.teamTotal = 0;
                _this.toggle = 0;
            }
            else {
                hitTwo.setAttribute("class", "btn btn-primary disabled");
                hitTwo.removeEventListener("click", game.displayRuns, false);
                _this.handleWinner();
            }
        };
        this.handleWinner = function () {
            var team1 = parseInt(document.getElementById("score1").innerHTML);
            var team2 = parseInt(document.getElementById("score2").innerHTML);
            if (team1 > team2) {
                document.getElementById("result").innerHTML = "Team 1 won by ".concat(team1 - team2);
            }
            else if (team1 < team2) {
                document.getElementById("result").innerHTML = "Team 2 won by ".concat(team2 - team1);
            }
            else {
                document.getElementById("result").innerHTML = "Match Tied";
            }
        };
    }
    return Game;
}());
var game = new Game();
document.getElementById("hit1").addEventListener("click", game.displayRuns);
