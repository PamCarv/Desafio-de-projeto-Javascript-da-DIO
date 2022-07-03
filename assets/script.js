const cards = document.querySelectorAll('.Card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

cards.forEach((Card) => {
    Card.addEventListener('click', flipCard);
})

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('Flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('Flip');
        secondCard.classList.remove('Flip');
        lockBoard = false;
        resetBoard();
    }, 1500);
}

(function shuffle() {
    cards.forEach((Card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        Card.style.order = randomPosition;
    })
})();

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}