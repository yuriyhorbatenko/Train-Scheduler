

const firebaseConfig = {

  apiKey: "AIzaSyDE4915ncvwbOocOcdnB_elfaQLyD-Zg-c",
  authDomain: "unit-7-assignment-ceaec.firebaseapp.com",
  databaseURL: "https://unit-7-assignment-ceaec.firebaseio.com",
  projectId: "unit-7-assignment-ceaec",
  storageBucket: "unit-7-assignment-ceaec.appspot.com",
  messagingSenderId: "10386436234",
  appId: "1:10386436234:web:1cf7074d84ea5b21cd3d73",
  measurementId: "G-LH89TVS6K1"

};
  
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
  
    
var TrainName = "";
var Destination = "";
var TrainTime = "";
var Frequency = "";


   
function clock() {

  var clockDiv = $("<div>");
      clockDiv.attr("id", "clock");
      $("#header").append(clockDiv);

  var currentTime1 = moment().format("MMM Do HH:mm:ss");
      $("#clock").text(currentTime1);
      setTimeout(clock, 1000);
};


    

$(".buttonAddTrain").on("click", function(event) {
  
  event.preventDefault();

if  ($(".trainName").val().trim() === "" ||
    $(".destination").val().trim() === "" ||
    $(".firstTrain").val().trim() === "" ||
    $(".frequency").val().trim() === "") {

    alert("Please fill in all details to add new train");
} 
  else {

  NewTrainName = $(".trainName").val().trim();
  NewDestination = $(".destination").val().trim();
  NewTrainTime = $(".firstTrain").val().trim();
  NewFrequency = $(".frequency").val().trim();
    
  database.ref().push({

    TrainName: NewTrainName,
    Destination: NewDestination,
    TrainTime: NewTrainTime,
    Frequency: NewFrequency,
        
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });

  
  $(".trainName").val("");
  $(".destination").val("");
  $(".firstTrain").val("");
  $(".frequency").val("");

}
});


database.ref().on("child_added", function(childSnapshot) {
  

  var NewTrainName = childSnapshot.val().TrainName;
  var NewDestination = childSnapshot.val().Destination;
  var NewTrainTime = childSnapshot.val().TrainTime;
  var NewFrequency = childSnapshot.val().Frequency;


  var firstTimeConverted = moment(NewTrainTime, "HH:mm")
  var currentTime = moment().format("MMM Do HH:mm:ss");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % NewFrequency;
  var MinAway = NewFrequency - tRemainder;
  var NextArrival = moment().add(MinAway, "minutes");
  var NewNextArrival = moment(NextArrival).format("MMM Do, HH:mm")
 

  console.log("Current Time is: " + currentTime);
  console.log("Train Time is: " + NewTrainName);
  console.log("Destination is: " + NewDestination);
  console.log("Frequency is: " + NewFrequency);
  console.log("Next Arrival at: " + NewNextArrival);
  console.log("Minutes Away: " + MinAway);
  console.log("----------------------------------");
    
    
  var newRow = $("<tr>").append(

    $("<td>").text(NewTrainName),
    $("<td>").text(NewDestination),
    $("<td>").text(NewFrequency),
    $("<td>").text(NewNextArrival),
    $("<td>").text(MinAway),
    $("<i class=DeleteMe></i>")
  );


  $("#tableBody").append(newRow);

});


$("body").on("click", ".DeleteMe", function() {

  $(this).closest("tr").remove();

});


clock();


setInterval(function() {
  
window.location.reload();
}, 60000);