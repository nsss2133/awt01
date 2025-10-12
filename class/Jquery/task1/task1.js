console.clear();
console.log("Hello World! from script.js");


$("button").on("click", buttonevent);

function buttonevent() {
    var buttoncontent = this.innerHTML;
    alert(`${buttoncontent} is clicked`); // Use backticks for template literals
    this.style.color = "red"; // Change button text color on click
    this.innerHTML = "clicked"; // Optional: change button text
}
