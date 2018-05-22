var topics = ['NASCAR', 'Formula 1', 'Open Wheel Racng', 'Indianapolis 500', 'Legends Car Racing', 'Funny Car Drag Racing', 'Top Fuel Drag Racing',
    'Motorcycle Racing', 'Snowmobile Racing', 'Drag Boat Racing',
    'Dog Sled Racing', 'Sailboat Racing'];

var queryURL = "https://api.giphy.com/v1/gifs/search?";

var queryParams = {
    "api_key": "4NiTRppImnjF71mF4a4570VyZmnWdSAt",
    "limit": "10"
}

// gifState is populated with an object for each image ---
// {"s" : "still-img-url", "a": "animated-gif-url", "isStill": true/false}
// when an image is clicked we get associated object, depending on whether
// isStill is true/false; we swap in the new image and update the state
var gifState = [];

function makeQueryString(topic) {
    queryParams.q = topic;
    return queryURL + $.param(queryParams);
}

function updateRaceGifs(data) {
    $("#race-gifs").empty();
    gifState.length = 0;
    for (var i = 0; i < data.length; ++i) {
        // create an img
        var imgUrl = data[i].images.original_still.url;
        var img = $("<img>").attr("src", imgUrl).attr("val", i).attr("class", "racer-img");

        // create a <p> for the rating text
        var p = $("<p>");
        p.append("Rating: " + data[i].rating.toUpperCase());

        // creat a div and add img and p to it
        var div = $("<div>");
        div.append(img);
        div.append(p);
        div.addClass("img");

        // add div to html
        $("#race-gifs").append(div);

        var gifStatus = { "s": imgUrl, "a": data[i].images.original.url, "isStill": true };
        gifState.push(gifStatus);
    }

}

function updateButtons() {
    $("#racing-btn").empty();
    // go through the topics and load buttons up
    for (var i = 0; i < topics.length; ++i) {
        var racerBtn = $("<button>").attr("class", "racer-btn").text(topics[i]);

        $('#racing-btn').append(racerBtn);
    }
    $(".racer-btn").on("click", function () {
        // build query string
        var query = makeQueryString($(this).text());
        console.log(query);

        // make ajax call
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (resp) {
            console.log(resp.data);
            updateRaceGifs(resp.data);
        });

    });
}

window.onload = function (event) {

    updateButtons();

    // $(".racer-btn").on("click", function () {
    //     // build query string
    //     var query = makeQueryString($(this).text());
    //     console.log(query);

    //     // make ajax call
    //     $.ajax({
    //         url: query,
    //         method: "GET"
    //     }).then(function (resp) {
    //         console.log(resp.data);
    //         updateRaceGifs(resp.data);
    //     });

    // });

    $("#add-racer").on("click", function (event) {
        event.preventDefault();
        var addThis = $("#racer-name").val();
        topics.push(addThis);
        updateButtons();
    });

}

$(document.body).on("click", ".racer-img", function () {
    console.log("I'm in img onclick");
    var val = parseInt($(this).attr("val"));
    var thisState = gifState[val];
    if (thisState.isStill) {
        $(this).attr("src", thisState.a);
        thisState.isStill = false;
    } else {
        $(this).attr("src", thisState.s);
        thisState.isStill = true;
    }
});
