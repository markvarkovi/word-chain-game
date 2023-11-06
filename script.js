const input = `<input type="text" lang="en" id="input-text" placeholder="Write your text here">`;
const addWordBtn = `<button id="submit-btn">SUBMIT</button>`;
const resetBtn = `<button onClick="window.location.reload()" id="reset-btn">RESTART</button>`;
const table = `<table id="word-table"></table>`;
document.querySelector("#submit").insertAdjacentHTML("beforeend", addWordBtn);
document.querySelector("#input").insertAdjacentHTML("beforeend", input);
document.querySelector("#reset").insertAdjacentHTML("beforeend", resetBtn);
document.querySelector("#table").insertAdjacentHTML("beforeend", table);

const submitBtnElement = document.querySelector("#submit-btn");

const tableElement = document.querySelector("#word-table");



// function welcome() {
//     alert(
//         "Welcome to WordChain Game! Your task is to find and connect at least 30 words by the famous Word Chain game's rules."
//     );
//     alert(
//         "During the game you will have two lifes, if you lose them, the game is over!"
//     );
//     alert(
//         "You will also have chains connected before every word, but be careful, chains are disconnecting exponentially!"
//     );
//     alert(
//         "You lose a life⬇️\n➡️1. If you submit a word which is not starting by the last letter of the previous word \n➡️2. If you use a word you already used before.\n➡️3. If you run out of chains. "
//     );
// }

function countTime() {
    let seconds = 1000;
    let timerInterval;

    const startTimer = () => {
        timerInterval = setInterval(function () {
            seconds--;
            document.querySelector("#timer").textContent =
                "Chains remaining:" + seconds;
            if (seconds < 1) { document.querySelector("#timer").textContent =
            "Chains remaining: 0";
        }
        }, 1000);
        
    };
    const stopTimer = () => {
        seconds = 1000;
        clearInterval(timerInterval);
    };
    const inputElement = document.querySelector("#input-text");

    inputElement.addEventListener("input", startTimer);
    submitBtnElement.addEventListener("click", function () {
        stopTimer();
    });
}

function makeTable() {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let headerRow = "";
    let textRows = "";
    for (let i = 0; i < abc.length; i++) {
        headerRow += `<th id="${abc[i]}">${abc[i]}${"&nbsp"}</th>`;
    }
    for (let i = 0; i < abc.length; i++) {
        textRows += `<td class="text-data" id="data${i}"></td>`;
    }
    tableElement.insertAdjacentHTML(
        "beforeend",
        `<tr class="header">${headerRow}</tr>`
    );
    tableElement.insertAdjacentHTML(
        "beforeend",
        `<tr class="rows" bgcolor="grey">${textRows}</tr>`
    );
}

function submitWord() {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const smallABC = abc.toLowerCase();

    const inputElement = document.querySelector("#input-text");
    let tableDataElement = "";

    let counter = 0;
    let healthCounter = 4;

    let wordLastChar = "";
    let wordElement = "";
    let allWords = [];
    let dupedWordID = "";

    submitBtnElement.addEventListener("click", function () {
        const inputValue = inputElement.value;
        const lastLetter = inputValue.charAt(inputValue.length - 1);
        const firstChar = inputValue.charAt(0);

        let index = 0;

        if (
            //first letter prev. word. last letter with case insensitivity and table to be empty
            wordLastChar === firstChar ||
            wordLastChar.toUpperCase() === firstChar ||
            firstChar.toUpperCase() === wordLastChar ||
            wordElement.textContent === undefined
        ) {
            if (!smallABC.includes(firstChar) && !abc.includes(firstChar)) {
                alert("Invalid input! Special characters are not allowed!"); //First character invalid
                inputElement.value = "";
                index = NaN;
                healthCounter--;
            } else if (!smallABC.includes(lastLetter) && !abc.includes(lastLetter)) {
                alert("Invalid input! Special characters are not allowed!"); //Last character invalid
                inputElement.value = "";
                index = NaN;
                healthCounter--;
            } else if (allWords.includes(inputValue)) {
                dupedWordID = allWords.indexOf(inputValue) + 1;
                alert(
                    `"${inputValue}" word already used at index ${dupedWordID}! You can only use a word once!`
                ); //if you use the same word
                inputElement.value = "";
                index = NaN;
                healthCounter--;
            } else if (abc.includes(firstChar)) {
                index = abc.indexOf(firstChar); //Capital letter to be added under the correct letter
                counter++;
                allWords.push(inputValue);
            } else if (smallABC.includes(firstChar)) {
                //Underscore letter to be added under the correct letter
                counter++;
                index = smallABC.indexOf(firstChar);
                allWords.push(inputValue);
            }
        } else {
            // If the first letter is not the previous word's last letter
            alert(
                "Incorrect word! You can only start your word with the previous word's last letter!"
            );
            inputElement.value = "";
            index = NaN;
            healthCounter--
        }

        tableDataElement = document.querySelector(`#data${index}`);

        tableDataElement.insertAdjacentHTML(
            "beforeend",
            `<span id=${firstChar}${counter}>${counter}.${inputValue}<br></span>`
        );

        wordElement = document.querySelector(`#${firstChar}${counter}`);
        wordLastChar = wordElement.textContent.charAt(
            wordElement.textContent.length - 1
        );

        inputElement.value = "";


        if (allWords.length > 2) {
            setTimeout(() => {
                window.location.reload();
            }, 4000);
            alert("Congrats, you connected all the chains! Game Over!")
        }
        const noChain = document.querySelector("#timer").textContent.split(":")[1]
        if (noChain == 0) {
            alert("You have lost all your chains. Time is up. Game Over!")
            window.location.reload();
        }
    });

    document.querySelector("#health").textContent = `Life remaining: ${healthCounter}`;  
   
}


//     

//     if (counter > 29) {
//         alert("Congrats, you solved the maze!");
//         window.location.reload();
//     } else if (healthCounter === 1) {
//         alert("You lost a life! This is your last chance!");
//         window.location.reload();
//     } else if (healthCounter < 1) {
//         alert("You lost all your life, the game is over!");
//         window.location.reload();
//     }



//welcome();
makeTable();
countTime();
submitWord();
