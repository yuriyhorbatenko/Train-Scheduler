

var firebaseConfig = {
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

  //var dataRef = firebase.database();

    // Initial Values
    var TrainName = "";
    var Destination = "";
    var TrainTime = 0;
    var Frequency = 0;



$("#buttonAdd").on("click", function(event) {

    event.preventDefault();

    TrainName = $(".trainName").val().trim();
    Destination = $(".destination").val().trim();
    TrainTime = $(".firstTrain").val().trim();
    Frequency = $(".frequency").val().trim();

    dataRef.ref().push({

        TrainName: TrainName,
        Destination: Destination,
        TrainTime: TrainTime,
        Frequency: Frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

console.log(TrainName)
console.log(Destination)
console.log(TrainTime)
console.log(Frequency)

});