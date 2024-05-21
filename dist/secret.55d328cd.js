// secretAuth.js
"use strict";
document.addEventListener("DOMContentLoaded", ()=>{
    const token = sessionStorage.getItem("jwtToken");
    if (!token) // Ingen token, omdirigera till inloggningssidan
    window.location.href = "/login.html";
    else // Validera token med servern
    fetch("http://localhost:3000/api/validateToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((response)=>{
        if (!response.ok) {
            // Token är inte giltig, omdirigera till inloggningssidan
            sessionStorage.removeItem("jwtToken");
            window.location.href = "/login.html";
        } else // Token är giltig, hämta hemlig data
        getSecretData();
    }).catch(()=>{
        // Serverfel, omdirigera till inloggningssidan
        sessionStorage.removeItem("jwtToken");
        window.location.href = "/login.html";
    });
});
async function getSecretData() {
    const apiUrl = "http://localhost:3000/api";
    try {
        const token = sessionStorage.getItem("jwtToken");
        if (!token) {
            console.error("Token saknas. Anv\xe4ndaren \xe4r inte inloggad.");
            return;
        }
        const response = await fetch(`${apiUrl}/secret`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.ok) {
            // Visa meddelandet från backend på skärmen
            const welcomeMessage = document.getElementById("welcomeMessage");
            if (welcomeMessage) welcomeMessage.textContent = data.message;
            else console.error('Element with id "welcomeMessage" not found.');
        } else console.error(data.error);
    } catch (error) {
        console.error("Error fetching secret data:", error);
    }
}

//# sourceMappingURL=secret.55d328cd.js.map
