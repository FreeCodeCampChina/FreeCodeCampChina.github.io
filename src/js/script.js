function activeScrollpy() {
    $('body').scrollspy({
        target: ".navbar"
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setCard(num, response) {
    $(".meetup-link").eq(num).attr("href", response.data[num].link);
    $(".caption h3").eq(num).text(response.data[num].name);
    $(".caption h4").eq(num).text(response.data[num].venue.name);
    $(".caption h5").eq(num).text(response.data[num].venue.address_1);
    $(".caption h6").eq(num).text(capitalizeFirstLetter(moment(response.data[num].time).format("dddd, D MMMM, hh:mmA")));
    if (response.data[num].venue.name === "EkoSpace") {
        $(".thumbnail img").eq(num).attr("src", "./dist/img/ekospace.svg");
    } else if (response.data[num].venue.name === "Nuevo AreaTres") {
        $(".thumbnail img").eq(num).attr("src", "./dist/img/areatres.svg");
    }
}

function nextMeetups() {
    $.ajax({
        type: "GET",
        url: "https://api.meetup.com/FreeCodeCampBA/events?photo-host=public&page=2&sig_id=471f4512414422381c386239397b703d",
        data: "data",
        dataType: "jsonp",
        success: function(response) {
            setCard(0, response);
            setCard(1, response);
        }
    });
}

$(function() {
    activeScrollpy();
    nextMeetups();
});