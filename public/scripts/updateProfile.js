const image = document.getElementById("image");
const imagePreview = document.getElementById("previewImage");

let cropper;

image.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;

            cropper = new Cropper(imagePreview, {
                aspectRatio: 1 / 1,
                viewMode: 2
            });
        };

        reader.readAsDataURL(file);
    }
});

function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

async function onSubmit(event) {
    event.preventDefault();

    if (cropper) {
        const username = document.getElementById("name").value
        const userId = localStorage.getItem("userId");

        const croppedData = await cropper.getCroppedCanvas().toDataURL('image/webp');

        const blob = dataURLtoBlob(croppedData);

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('username', username);
        formData.append('uploaded_file', blob, 'image.webp');

        await fetch("/upload", {
            method: 'POST',
            body: formData,
        });

        const modalElement = document.getElementById('exampleModalCenter');

        // Create a Modal instance
        const modal = new bootstrap.Modal(modalElement);

        // Show the modal after successful data upload
        modal.show();


        setTimeout(() => {
            window.location.reload(true);
        }, 2000);

    }
}

async function toggleSidebar(event) {
    event.preventDefault();

    const sidebar = document.getElementsByClassName("sidebar")[0];
    const background = document.getElementsByClassName("background")[0];

    sidebar.classList.toggle("active");
    background.classList.toggle('blur');
}

function previewFile() {
    const preview = document.getElementById('previewImage');
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        preview.style.height = "18rem";
        preview.style.borderRadius = "5px";
        preview.style.border = "2px solid black";
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "/images/link.png";

    }
}
