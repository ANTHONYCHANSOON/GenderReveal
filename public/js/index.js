
function validateTextBox() {

    var x = document.getElementById('textbox1').value;
    if (x === "") {
        var textBoxWarning = document.getElementsByClassName("perfect1");
        var pTag = document.getElementsByClassName("perfect2");
        textBoxWarning[0].classList.add("needNameTextbox");
        pTag[0].classList.remove("needNameDefault")
        pTag[0].classList.add("needName");
        event.preventDefault();
    } else {
        return;
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
