

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

    
var clockDiv = $("<div>");
    clockDiv.attr("id", "clock");
    $("#header").append(clockDiv);


function clock() {

  var currentTime1 = moment().format("MMM Do HH:mm:ss");
      $("#clock").text(currentTime1);
      setTimeout(clock, 1000);
};
    

$(".buttonAddTrain").on("click", function(event) {
  

  event.preventDefault();

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


console.log(currentTime);
console.log(NewTrainName);
console.log(NewDestination);
console.log(NewTrainTime);
console.log(NewFrequency);
    
    
var newRow = $("<tr>").append(

  $("<td>").text(NewTrainName),
  $("<td>").text(NewDestination),
  $("<td>").text(NewFrequency),
  $("<td>").text(NewNextArrival),
  $("<td>").text(MinAway),
);


$("#tableBody").append(newRow);

});

clock();