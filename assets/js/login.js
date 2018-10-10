

var config = {
    apiKey: "AIzaSyC1E1AEmfDaKbRTuQO5rKo12xICtM8eT3o",
    authDomain: "project-a0c8a.firebaseapp.com",
    databaseURL: "https://project-a0c8a.firebaseio.com",
    projectId: "project-a0c8a",
    storageBucket: "project-a0c8a.appspot.com",
    messagingSenderId: "650635573245"
};
firebase.initializeApp(config);
var database = firebase.database();


$("#signup-form").on("submit", function(event){
    event.preventDefault();
    var email = $("#signupEmail").val();
    var password = $("#signupPassword").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
    });
});


$("#login-form").on("submit", function(event){
    event.preventDefault();
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
    });
});
    
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        $("#fav-button").show();
        $("#sign-up-btn").hide();
        $("#sign-in-btn").hide();
        $("#loggedin").text("signed in as " + user.email);
        $("#sign-out-btn").show();
    } else {
        $("#fav-button").hide();
        $("#sign-up-btn").show();
        $("#sign-in-btn").show();
        $("#sign-out-btn").hide();
        $("#loggedin").empty();
    }
});

$("#sign-out-btn").on("click", function(event){
    firebase.auth().signOut().catch(function(error) {
    // An error happened.
    });
});



