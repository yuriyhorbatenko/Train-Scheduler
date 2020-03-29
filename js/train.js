

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
    var TrainTime = 0;
    var Frequency = 0;

    var MinAway = 0;
    var NextArrival = moment.unix(empStart).format("MM/DD/YYYY");


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
        //minAway: NewMinAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    

    alert("hello")
    console.log(TrainName)
    console.log(Destination)
    console.log(TrainTime)
    console.log(Frequency)
    //console.log(NewMinAway)

    $(".trainName").val("");
    $(".destination").val("");
    $(".firstTrain").val("");
    $(".frequency").val("");

});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    
    var NewTrainName = childSnapshot.val().TrainName;
    var NewDestination = childSnapshot.val().Destination;
    var NewTrainTime = childSnapshot.val().TrainTime;
    var NewFrequency = childSnapshot.val().Frequency;
    //var NewMinAway = childSnapshot.val().minAway;

    var NextArrival = moment.unix(empStart).format("MM/DD/YYYY");
  
    
    console.log(NewTrainName);
    console.log(NewDestination);
    console.log(NewTrainTime);
    console.log(NewFrequency);
    //console.log(NewMinAway);
  
    
    
    var newRow = $("<tr>").append(
      $("<td>").text(NewTrainName),
      $("<td>").text(NewDestination),
      $("<td>").text(NewFrequency),
      $("<td>").text(NewFrequency),
      //$("<td>").text(NewMinAway),
    );
  
    
    $("#tableBody").append(newRow);
  });