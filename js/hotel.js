const search_button = document.querySelector(".button");

search_button.addEventListener("click", (e) => {
    e.preventDefault();
    const hotelName = document.getElementById("hotelname").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const adult = document.getElementById("adult").value;
    const kid = document.getElementById("kid").value;

    if (hotelName === "" || checkin === "" || checkout === "" || adult === "" || kid === "") {
        alert("Input field is empty");
    } else {
        let hotelData = JSON.parse(localStorage.getItem("hoteldata")) || [];

        let guestData = {
            hotelNames: hotelName,
            checkIn: checkin,
            checkOut: checkout,
            adultData: adult,
            kidData: kid
        };

        hotelData.push(guestData);
        localStorage.setItem("hoteldata", JSON.stringify(hotelData));

        window.location.href = "hoteldetail.html";
    }
});

const hotelCards = document.querySelectorAll(".hotel-card");

hotelCards.forEach((card) => {
    card.addEventListener("click", (e) => {
        e.preventDefault();

        const hotelName = card.querySelector(".card-title").id;

        localStorage.setItem("selectedHotel", JSON.stringify(hotelName));

        window.location.href = "hoteldetail.html?fromCard=true";
    });
});
