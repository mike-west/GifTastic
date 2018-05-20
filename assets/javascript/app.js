var topics = ['NASCAR', 'Formula 1', 'Open Wheel Racng', 'Indianapolis 500', 'Legends Racing', 'Funny Car Drag Racing', 'Top Fuel Drag Racing', 
'Motorcycle Racing', 'Snowmobile Racing', 'Drag Boat Racing', 'Sailboat Racing'  ];

// var searchParameters = {
//     "api-key": "4NiTRppImnjF71mF4a4570VyZmnWdSAt",
//     "q": searchTerm
// }

function makeQueryString(topic) {

}

window.onload = function (event) {

    // go through the topics and load buttons up
    for(var i=0; i < topics.length; ++i) {
    var racerBtn = $("<button>").attr("class", "racer-btn").text(topics[i]);

    $('#racing-btn').append(racerBtn);   
}
}