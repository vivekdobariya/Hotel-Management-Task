const login = document.querySelector(".login");

login.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let allData = JSON.parse(localStorage.getItem("alldata"));

    let currentUser = allData.find((user) => user.userName === userName && user.password === password);

    if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Login Successfully!");
        window.location.href = "hotel.html";
    }
    else {
        alert("Invalid email or password");
    }

});