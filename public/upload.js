document.getElementById("uploadProfileImg").addEventListener("change", (ev) => {
    ev.preventDefault();
    const formdata = new FormData();
    formdata.append("image", ev.target.files[0]);
    fetch("/auth/profileImage", {
            method: "POST",
            body: formdata,
        })
        .then((data) => data.json())
        .then((data) => console.log(data))
        .then((data) => window.location.href = "/auth/myprofile");
});