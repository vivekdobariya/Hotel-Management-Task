document.addEventListener("DOMContentLoaded", () => {
    const bookingData = JSON.parse(localStorage.getItem("bookingdata"));

    if (bookingData && bookingData.length > 0) {
        const profileDataContainer = document.getElementById("profiledata");

        bookingData.forEach((data, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${data.hotelNames}</td>
                <td>${data.checkIn}</td>
                <td>${data.checkOut}</td>
                <td>${data.adultData}</td>
                <td>${data.kidData}</td>
                <td>${data.selectedRooms}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteBooking(${data.id})">Delete</button>
                </td>
            `;
            profileDataContainer.appendChild(row);
        });
    }

    const logoutButton = document.querySelector(".log-out");
    logoutButton.addEventListener("click", handleLogout);

    const profileButton = document.querySelector(".profile");
    profileButton.addEventListener("click", handleProfile);
});


const deleteBooking = (id) => {
    const bookingData = JSON.parse(localStorage.getItem("bookingdata"));
    const updatedData = bookingData.filter((data) => data.id !== id);
    localStorage.setItem("bookingdata", JSON.stringify(updatedData));
    location.reload();
}

const handleProfile = () => {
    window.location.href = "hotel.html"
}

const handleLogout = () => {
    localStorage.removeItem("bookingdata");
    window.location.href = "login.html";
}
