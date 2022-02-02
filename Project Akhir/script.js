// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDO2vYMaoliCg1CGsPb_12WOhZ90k9z4Ew",
    authDomain: "final-project-lnt---front-end.firebaseapp.com",
    projectId: "final-project-lnt---front-end",
    storageBucket: "final-project-lnt---front-end.appspot.com",
    messagingSenderId: "655717318207",
    appId: "1:655717318207:web:c0686f7fc2464777ed028a",
    measurementId: "G-XYHCH34P69"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let contactRef = db.collection("contact");

// Form Validation
let validFlag = true;
function validateForm() {
    var forms = document.getElementById("contact-form");
    let nameInput = document.getElementById("input-name");
    let emailInput = document.getElementById("input-email");
    let phoneInput = document.getElementById("input-phone");
    let commentInput = document.getElementById("input-comment");

    // Name Input Validation
    // Input field empty
    if (nameInput.value.trim() === "") {
        showInvalid(nameInput, "Must be filled");
    } else {
        showValid(nameInput);
    }

    // Email Input Validation
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Input field empty
    if (emailInput.value.trim() === "") {
        showInvalid(emailInput, "Must be filled");
    }
    // '@' not found
    else if (emailInput.value.trim().search("@") === -1) {
        showInvalid(emailInput, "Please enter a valid email address with '@'");
    }
    // Email address format not valid
    else if (!emailRegex.test(emailInput.value)) {
        showInvalid(emailInput, "Please enter a valid email address");
    } else {
        showValid(emailInput);
    }

    // Phone number Input Validation
    // Input field empty
    if (phoneInput.value.trim() === "") {
        showInvalid(phoneInput, "Must be filled");
    }
    // First 2 characters must be '08'
    else if (phoneInput.value.slice(0, 2) !== "08") {
        showInvalid(phoneInput, "Phone number must start with 08");
    }
    // Maximal 14 characters
    else if (phoneInput.value.trim().length > 14) {
        showInvalid(phoneInput, "Phone number must not exceed 14 numbers");
    } else {
        showValid(phoneInput);
    }

    // Comment Input Validation
    // Input field empty
    if (commentInput.value.trim() === "") {
        showInvalid(commentInput, "Must be filled");
    }
    // Between 5 and 100 words
    else if (
        commentInput.value.trim().split(" ").length < 5 ||
        commentInput.value.trim().split(" ").length > 100
    ) {
        showInvalid(commentInput, "Must be between 5 and 100 words");
    } else {
        showValid(commentInput);
    }

    //If all input valid then submit data to firebase
    if (validFlag) {
        //Input data to firestore
        contactRef.add({
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            comment: commentInput.value
        })

        //Confirmation alert
        window.alert('Form Submited');

        //Reset input style
        nameInput.classList.remove("is-valid");
        emailInput.classList.remove("is-valid");
        phoneInput.classList.remove("is-valid");
        commentInput.classList.remove("is-valid");
        forms.reset();

        //Reset valid flag
        if (!validFlag) validFlag = true;
        return false;
    }

    //Reset valid flag
    if (!validFlag) validFlag = true;
    return false;
}

function showInvalid(inputElement, messages) {
    //Set valid flag false
    validFlag = false;
    //Set input style invalid
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
    //Set error messages
    let errorMsg = inputElement.parentNode.childNodes[5];
    errorMsg.style.visibility = "visible";
    errorMsg.innerHTML = messages;
}

function showValid(inputElement) {
    //Set input style valid
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
    //Set error messages
    let errorMsg = inputElement.parentNode.childNodes[5];
    errorMsg.style.visibility = "hidden";
}