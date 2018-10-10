var config = {
    apiKey: "AIzaSyC1E1AEmfDaKbRTuQO5rKo12xICtM8eT3o",
    authDomain: "project-a0c8a.firebaseapp.com",
    databaseURL: "https://project-a0c8a.firebaseio.com",
    projectId: "project-a0c8a",
    storageBucket: "project-a0c8a.appspot.com",
    messagingSenderId: "650635573245"
};
firebase.initializeApp(config);



$("#signup-form").on("submit", function(event){
    event.preventDefault();
    var email = $("#signupEmail").val();
    var password = $("#signupPassword").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
});

$("#login-form").on("submit", function(event){
    event.preventDefault();
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
});
    
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#fav-button").show();
        $("#remove-button").show();
        $("#fav-select").show();
        $("#sign-up-btn").hide();
        $("#sign-in-btn").hide();
        $("#loggedin").text("signed in as " + user.email);
        $("#sign-out-btn").show();

        // print dropdown
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val().favorite;
                $("#fav-select").append("<option class='fav-option'>" + childData + "</option");
            });
        });
    
    } else {
        $("#fav-button").hide();
        $("#remove-button").hide();
        $("#sign-up-btn").show();
        $("#sign-in-btn").show();
        $("#sign-out-btn").hide();
        $("#loggedin").empty();
        $("#fav-select").hide();
    }
});

$("#sign-out-btn").on("click", function(event){
    firebase.auth().signOut().catch(function(error) {
    // An error happened.
    });

    $("#fav-select").empty();
    $("#fav-select").append("<option disabled selected> Favorites </option>");
});


$("#fav-button").on("click", function(){
    var fav = $("#input-location").val();
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).push({
        favorite: fav  
    });
    $("#fav-select").append("<option class='fav-option'>" + fav + "</option");
    $("#fav-select").val('Favorites');
});


$("#remove-button").on("click", function(){   
    var removed = $("#input-location").val();
    // beautiful code
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).orderByChild('favorite').equalTo(removed).on('child_added', function(snapshot){snapshot.ref.remove();});
    $(`.fav-option:contains(${removed})`).remove();
    $("#fav-select").val('Favorites');
});


function selectFav(){
    $("#input-location").val($("#fav-select").val());
}