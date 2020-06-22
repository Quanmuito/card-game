const cards = document.querySelectorAll(".mem-card");
const back_cards = document.querySelectorAll(".back");
const front_cards = document.querySelectorAll(".front");
const progress_bar = document.getElementById("progress-bar");
const play_time = document.getElementById("play-time");
const turn_count = document.getElementById("turn-count");
const game_over = document.querySelector("modal");
const frcarr = Array.from(front_cards);
const bacarr = Array.from(back_cards);
let hasFlippedCard = false;
let wait = false;
let firstFrCard, secondFrCard, firstBaCard, secondBaCard;
let turn = 0;
let playtime = 0;
let progress = 0;

function backCard() { 
    if (wait) return;
    this.classList.add("flip");

    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstFrCard = front_cards[bacarr.indexOf(document.getElementById(this.id))];
        firstBaCard = this;
    } 
    
    else {
        //second click
        secondFrCard = front_cards[bacarr.indexOf(document.getElementById(this.id))];
        secondBaCard = this;

        //matching
        checkMatch();
    }
}

function checkMatch() { 
    let isMatch = firstFrCard.dataset.cardvalue === secondFrCard.dataset.cardvalue;

    isMatch ? disableCard() : UnflipCard()
    turn += 1;
    turn_count.innerHTML = "Turn " + turn;
}

function disableCard() {
    firstFrCard.removeEventListener("click", frontCard);
    secondFrCard.removeEventListener("click", frontCard);
    progress++;
    let pro = (progress / 6) * 100;
    let bar = pro + "%";
    progress_bar.style.width = bar;
    reset();
}

function UnflipCard() {
    wait = true
    setTimeout( () => {
        firstBaCard.classList.remove("flip");
        secondBaCard.classList.remove("flip");
        reset();
    }, 1500);
}

function frontCard() {
    back_cards[frcarr.indexOf(document.getElementById(this.id))].classList.remove("flip");
}

function reset() {
    [hasFlippedCard, wait] = [false, false];
    [firstFrCard, secondFrCard, firstBaCard, secondBaCard] = [null, null, null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

back_cards.forEach( card => card.addEventListener('click', backCard) );
front_cards.forEach( card => card.addEventListener('click', frontCard) );

setInterval(() => {
        playtime++;
        play_time.innerHTML = "Play time: " + playtime + "s";
    }, 1000);

if (playtime == 30 || progress >= 6) {
    game_over.style.display = block;
    $("#player-score-1").html = "Your score: " + progress;
    $("#player-score-2").html = "Your time: " + playtime;
    $("#high-score").html = "High score: " + progress;
}