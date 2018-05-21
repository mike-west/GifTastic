var topics = ['NASCAR', 'Formula 1', 'Open Wheel Racng', 'Indianapolis 500', 'Legends Car Racing', 'Funny Car Drag Racing', 'Top Fuel Drag Racing',
    'Motorcycle Racing', 'Snowmobile Racing', 'Drag Boat Racing', 'Sailboat Racing'];

var queryURL = "https://api.giphy.com/v1/gifs/search?";

var queryParams = {
    "api_key": "4NiTRppImnjF71mF4a4570VyZmnWdSAt",
    "limit": "10"
}

function makeQueryString(topic) {
    queryParams.q = topic;
    return queryURL + $.param(queryParams);
}

window.onload = function (event) {

    // go through the topics and load buttons up
    for (var i = 0; i < topics.length; ++i) {
        var racerBtn = $("<button>").attr("class", "racer-btn").text(topics[i]);

        $('#racing-btn').append(racerBtn);
    }

    $(".racer-btn").on("click", function() {
        var query = makeQueryString($(this).text());
        console.log(query);
        getGifs(query);
    });
}

function getGifs(query) {
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (resp) {
        console.log(resp);
    });
}
