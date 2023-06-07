var container = document.getElementById("container");
var bank = document.getElementById("bank");
var codeBox = document.getElementById("codeBox");
var header = document.getElementById("header");
var selectionContainer = document.getElementById("selectionContainer");

var retry = document.getElementById("retry");
retry.addEventListener("click", reset);
var check = document.getElementById("check");
check.addEventListener("click", checkAnswer);
var boxes;

function loadBoxes() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      boxes = data;
      makeBoxes();
    })
    .catch(error => console.error('Error loading data:', error));
}

function makeBoxes() {
  for (var i = 0; i < boxes.length; i++) {
    var code = document.createElement("div");
    bank.appendChild(code);
    code.id = boxes[i].identifier;
    code.classList.add("box");
    code.classList.add(boxes[i].class);
    code.innerHTML = boxes[i].data;
    code.addEventListener("click", moveBox);
  }
}

function moveBox() {
    if (bank.contains(this)) codeBox.appendChild(this);
    else if (codeBox.contains(this)) bank.appendChild(this);
}

function checkAnswer() {
    var num = 0;
    var answer = codeBox.children;
    if (!(bank.children.length > 0)) {
        for (let i = 0; i < answer.length; i++) {
            if (!(answer[i].classList.contains(i + 1))) {
                num = 1;
                break;
            }
        }
    } else {
        num = 1;
    }
    bank.classList.add("disabled");
    codeBox.classList.add("disabled");
    header.classList.add("disabled");
    if (num == 0) correct();
    else wrong();
}

function wrong() {
    var el = document.getElementById("incorrect");
    el.classList.replace("disappear", "appear");
    selectionContainer.classList.replace("disappear", "appear");
    retry.classList.add("wrong");
}

function correct() {
    var correct = document.getElementById("correct");
    correct.classList.replace("disappear", "appear");
    selectionContainer.classList.replace("disappear", "appear");
    next.classList.replace("disappear", "appear");
    retry.classList.add("next");
    console.log(retry.classList);
}

function reset() {
    bank.classList.remove("disabled");
    codeBox.classList.remove("disabled");
    header.classList.remove("disabled");
    window.location.reload();
}

loadBoxes();