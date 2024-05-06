// protected.js
function fetchProtectedData() {
    const jwtToken = sessionStorage.getItem("jwtToken");
    fetch("/api/secret", {
        headers: {
            "Authorization": "Bearer " + jwtToken
        }
    }).then((response)=>{
        if (response.ok) return response.json();
        else throw new Error("Unauthorized access");
    }).then((data)=>{
        document.getElementById("protected-data").textContent = data.message;
    }).catch((error)=>{
        console.error("Error fetching protected data:", error);
    });
}

//# sourceMappingURL=secret.4051a3ab.js.map
