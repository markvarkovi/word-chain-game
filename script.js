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

    submitBtnElement.addEventListener('click', function () {

        const data = document.querySelectorAll('.text-data')
        let TEXT = "";
        for (let index = 0; index < data.length; index++) {
            TEXT += data[index]
        }

        let inputValue = inputElement.value

        let index = 0;

        // const A = document.querySelector('#data0').textContent
        // if (A.length < 1) {
        // if (A.charAt(A.length - 1) == inputValue.charAt(0)) {

        //If the first letter matches the previous word last letter
        
        /*if (This is what I need to figure out) {*/
            if (!smallABC.includes(inputValue.charAt(0)) && !abc.includes(inputValue.charAt(0))) { //First character invalid
                alert("Invalid input! Special characters are not allowed!");
                inputElement.value = "";
                index = NaN;
            } else if (!smallABC.includes(inputValue.charAt(inputValue.length - 1)) && !abc.includes(inputValue.charAt(inputValue.length - 1))) {
                alert("Invalid input! Special characters are not allowed!"); //Last character invalid
                inputElement.value = "";
                index = NaN;
            }
            else if (abc.includes(inputValue.charAt(0))) index = abc.indexOf(inputValue.charAt(0)); //Capital letter to be added under the correct letter
            else if (smallABC.includes(inputValue.charAt(0))) index = smallABC.indexOf(inputValue.charAt(0)); //Underscore letter to be added under the correct letter
            else { // If the first letter is not the previous word's last letter
            alert("Incorrect word! You can only start your word with the previous word's last letter!");
            inputElement.value = "";
            index = NaN;
        }

        const tableDataElement = document.querySelector(`#data${index}`)

        tableDataElement.insertAdjacentHTML('beforeend', inputValue)

        inputElement.value = "";
    })
}
makeTable();
submitWord();











