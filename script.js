const input = `<input type="text" lang="en" id="input-text" placeholder="Write your text here">`;
const addWordBtn = `<button id="submit-btn">SUBMIT</button>`;
const resetBtn = `<button onClick="window.location.reload()" id="reset-btn">RESTART</button>`;
const table = `<table id="word-table"></table>`;
document.querySelector('#submit').insertAdjacentHTML('beforeend', addWordBtn);
document.querySelector('#input').insertAdjacentHTML('beforeend', input);
document.querySelector('#reset').insertAdjacentHTML('beforeend', resetBtn);
document.querySelector('#table').insertAdjacentHTML('beforeend', table);

const submitBtnElement = document.querySelector('#submit-btn');

const tableElement = document.querySelector('#word-table');


function makeTable() {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let headerRow = "";
    let textRows = ""
    for (let i = 0; i < abc.length; i++) {
        headerRow += `<th id="${abc[i]}">${abc[i]}${'&nbsp'}</th>`
    }
    for (let i = 0; i < abc.length; i++) {
        textRows += `<td class="text-data" id="data${i}"></td>`
    }
    tableElement.insertAdjacentHTML('beforeend', `<tr class="header">${headerRow}</tr>`);
    tableElement.insertAdjacentHTML('beforeend', `<tr class="rows" bgcolor="grey">${textRows}</tr>`);
}

function submitWord() {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const smallABC = abc.toLowerCase();

    const inputElement = document.querySelector('#input-text')
    let counter = 0

    let wordLastChar = ''
    let wordElement = '';


    submitBtnElement.addEventListener('click', function () {

        const inputValue = inputElement.value
        const lastLetter = inputValue.charAt(inputValue.length - 1);
        const firstLetter = inputValue.charAt(0);

        let index = 0;

        if (wordLastChar === firstLetter || wordLastChar.toUpperCase() === firstLetter || firstLetter.toUpperCase() === wordLastChar || wordElement.textContent === undefined) {
            if (!smallABC.includes(firstLetter) && !abc.includes(firstLetter)) { //First character invalid
                alert("Invalid input! Special characters are not allowed!");
                inputElement.value = "";
                index = NaN;
            } else if (!smallABC.includes(lastLetter) && !abc.includes(lastLetter)) {
                alert("Invalid input! Special characters are not allowed!"); //Last character invalid
                inputElement.value = "";
                index = NaN;
            }
            else if (abc.includes(firstLetter))
                index = abc.indexOf(firstLetter); //Capital letter to be added under the correct letter
            else if (smallABC.includes(firstLetter))
                index = smallABC.indexOf(firstLetter); //Underscore letter to be added under the correct letter
        } else { // If the first letter is not the previous word's last letter
            alert("Incorrect word! You can only start your word with the previous word's last letter!");
            inputElement.value = "";
            index = NaN;
        }

        counter++;
        
        const tableDataElement = document.querySelector(`#data${index}`)

        tableDataElement.insertAdjacentHTML('beforeend', `<span id=${firstLetter}${counter}>${inputValue}</span>`)

        wordElement = document.querySelector(`#${firstLetter}${counter}`)
        wordLastChar = wordElement.textContent.charAt(wordElement.textContent.length - 1);

        inputElement.value = "";       
    });
}

makeTable();
submitWord();











