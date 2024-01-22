async function submitForm(event) {
    event.preventDefault();
    var userId = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;

    var data = {
        userId: userId,
        password: password
    };

    try {
        const response = await fetch('/admin/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            window.location.href = '/admin/createUser';
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData.error);
            document.getElementsByClassName('errorMessage')[0].innerText = errorData.error;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {

    await fetch('/admin/viewUser');

});

async function onView(event){
    event.preventDefault();

    window.location.href = "/admin/viewUser";
}

function onType(event){
    event.preventDefault();
    document.getElementsByClassName('errorMessage')[0].innerText = "";
}

