async function submitForm(event) {
    event.preventDefault();
    var userSpan = document.getElementById("user");
    var userId = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;

    var data = {
        userId: userId,
        password: password
    };

    try {
        if (userSpan.dataset.user === "admin") {
            const response = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                localStorage.setItem("userId", userId);
                window.location.href = '/admin/createUser';
            } else {
                const errorData = await response.json();
                document.getElementsByClassName('errorMessage')[0].innerText = errorData.error;
                console.error('Login failed:', errorData.error);
            }
        } else {
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                localStorage.setItem("userId", userId);
                window.location.href = `/user/details/${userId}`;
            } else {
                const errorData = await response.json();
                document.getElementsByClassName('errorMessage')[0].innerText = errorData.error;
                console.error('Login failed:', errorData.error);
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

async function changeUser(event) {
    event.preventDefault();

    var userHeader = document.getElementsByClassName("login-header");
    var loginForm = document.getElementById("loginForm");
    var userBtn = document.getElementById("user-btn");
    var userSpan = document.getElementById("user");


    if (userSpan.dataset.user === "admin") {
        userBtn.innerHTML = "Click here for Admin Login";
        userHeader[0].innerHTML = "User Login";
        userSpan.innerHTML = "Not an User?";
        userSpan.dataset.user = "user";
        loginForm.action = "/user/login";
    } else {
        userBtn.innerHTML = "Click here for User Login";
        userHeader[0].innerHTML = "Admin Login";
        userSpan.innerHTML = "Not an Admin?";
        userSpan.dataset.user = "admin";
        loginForm.action = "/admin/login";
    }
}

function onType(event){
    event.preventDefault();
    document.getElementsByClassName('errorMessage')[0].innerText = "";
}

