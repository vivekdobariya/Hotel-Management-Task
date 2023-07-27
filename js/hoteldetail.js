document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromCard = urlParams.get('fromCard');

    const hotelData = JSON.parse(localStorage.getItem("hoteldata"));
    const selectedHotel = JSON.parse(localStorage.getItem("selectedHotel"));

    if (fromCard === "true") {
        document.getElementById("hotel-title").innerText = selectedHotel.toUpperCase();
        document.getElementById("hotelname").value = "";
        document.getElementById("checkin").value = "";
        document.getElementById("checkout").value = "";
        document.getElementById("adult").value = "1";
        document.getElementById("kid").value = "0";
    } else {
        if (hotelData && hotelData.length > 0) {
            const lastHotelData = hotelData[hotelData.length - 1];
            document.getElementById("hotel-title").innerText = lastHotelData.hotelNames.toUpperCase();
            document.getElementById("hotelname").value = lastHotelData.hotelNames;
            document.getElementById("checkin").value = lastHotelData.checkIn;
            document.getElementById("checkout").value = lastHotelData.checkOut;
            document.getElementById("adult").value = lastHotelData.adultData;
            document.getElementById("kid").value = lastHotelData.kidData;
        }
    }

    const saveChangesButton = document.querySelector(".roombutton");
    saveChangesButton.addEventListener("click", saveRoomChanges);

    const roomButtons = document.querySelectorAll(".modal-body button");
    roomButtons.forEach((button) => {
        button.addEventListener("click", toggleRoomSelection);
    });

    const bookingForm = document.getElementById("bookingform");
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const hotelName = document.getElementById("hotelname").value;
        const checkin = new Date(document.getElementById("checkin").value);
        const checkout = new Date(document.getElementById("checkout").value);
        const adult = document.getElementById("adult").value;
        const kid = document.getElementById("kid").value;
        const selectedRooms = document.querySelectorAll(".modal-body button.active");
        const selectedRoomNumbers = Array.from(selectedRooms).map((room) => room.innerText).join(", ");

        if (hotelName === "" || checkin === "" || checkout === "" || adult === "" || kid === "" || selectedRoomNumbers === "") {
            alert("Input Field Is Empty!");
        } else {
            let bookingData = JSON.parse(localStorage.getItem("bookingdata")) || [];

            let formData = {
                id: new Date().getTime(),
                hotelNames: hotelName,
                checkIn: checkin.toLocaleDateString("en-IN"),
                checkOut: checkout.toLocaleDateString("en-IN"),
                adultData: adult,
                kidData: kid,
                selectedRooms: selectedRoomNumbers,
            };

            bookingData.push(formData);
            localStorage.setItem("bookingdata", JSON.stringify(bookingData));

            alert("Form data saved in localStorage!");
            window.location.href = "profile.html";
        }
    });
});

const toggleRoomSelection = (e) => {
    e.target.classList.toggle("active");

    const selectedRooms = document.querySelectorAll(".modal-body button.active")
    const selectedRoomNumbers = Array.from(selectedRooms).map((room) => room.innerText);
    selectedRoomsContainer = selectedRoomNumbers.join(", ");
}

const saveRoomChanges = () => {
    let totalRooms = 20;
    const selectedRooms = document.querySelectorAll(".modal-body button.active");
    const selectedRoomNumbers = Array.from(selectedRooms).map((room) => room.innerText);

    const selectedRoomsContainer = document.getElementById("selectroom");
    selectedRoomsContainer.innerText = selectedRoomNumbers.join(", ");
    const availableRoomsContainer = document.getElementById("availableroom");
    availableRoomsContainer.innerText = totalRooms - selectedRoomNumbers.length;
}
