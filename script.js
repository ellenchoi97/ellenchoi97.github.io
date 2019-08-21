// JavaScript source code
function nextPage(page) {
    location.href = page;
}

function init() {
    document.getElementById("167_1_icon").addEventListener("click", function () { nextPage("cse167_hw1.html") });
}

window.onload = init;