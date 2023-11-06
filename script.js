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

function welcome() {
  alert(
    " 🔗Welcome to WordChain Game!🔗\n\n Your task is to find and connect 20 words by the famous Word Chain game's rules."
  );
  alert(
    " You will have 1000 chains connected before every word.\n\n But be careful, chains are disconnecting faster each time you type a letter!"
  );
  alert(
    " If you are out of chains, the game is over and you have to start again!\n\n\n\n                                        🍀GOOD LUCK!🍀"
  );
}

function countTime() {
  let seconds = 1000;
  let timerInterval;

  const startTimer = () => {
    timerInterval = setInterval(function () {
      seconds--;
      document.querySelector("#timer").textContent =
        "Chains remaining:" + seconds;
      if (seconds < 1) {
        document.querySelector("#timer").textContent = "Chains remaining: 0";
        document.querySelector("#info").textContent =
          "Game Over! The game is restarting...";
        setTimeout(() => {
          window.location.reload();
        }, 9000);
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
      healthCounter--;
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

    if (allWords.length > 19) {
      setTimeout(() => {
        window.location.reload();
      }, 4800);
      alert("Congrats, you connected all the chains! Game Over!");
      document.querySelector("#congrats").style.display = "flex";
      document.querySelector("#congrats").innerHTML =
        '<img src="https://media1.giphy.com/media/PIdyzBZ8XiKQWfgwYk/giphy.gif?cid=ecf05e47f2qxajbjog0p1rkdjjp0c8nx7xgtcwn543xwct2o&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Congratulations!">';
    }

    if (allWords.length === 5) {
      document.querySelector("#info").textContent = `Last word 🡺 ${inputValue} 🡸 Nice Start!`
    } else if (allWords.length === 10) {
      document.querySelector("#info").textContent = `Last word 🡺 ${inputValue} 🡸 You are halfway there... Keep Going!`
    } else if (allWords.length === 15) {
      document.querySelector("#info").textContent = `Last word 🡺 ${inputValue} 🡸 Just a few words left. Go On!`
    } else {
    document.querySelector("#info").textContent = `Last word 🡺 ${inputValue} 🡸 ${counter} of 20 WORD`;
    }
  });
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

welcome();
makeTable();
countTime();
submitWord();
