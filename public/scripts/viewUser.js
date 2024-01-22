function onBack(event) {
    event.preventDefault();

    window.location.href = "/admin/createUser";
}

function onDone(userId) {

    fetch("/admin/verifyUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
    });

    window.location.href = "/admin/viewUser";
    
}

function onDelete(userId) {

    fetch("/admin/deleteUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
    });

    window.location.href = "/admin/viewUser";

}

