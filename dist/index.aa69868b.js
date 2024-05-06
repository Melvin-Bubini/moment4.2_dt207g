"use strict";
const apiUrl = "http://localhost:3000/api";
async function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const errorSpan = document.getElementById("errorSpan");
    const successSpan = document.getElementById("successSpan");
    const registerForm = document.getElementById("Form");
    registerForm.onsubmit = async (event)=>{
        event.preventDefault();
        // Kontrollera om användarnamn eller lösenord är tomma
        if (!username || !password) {
            errorSpan.textContent = "Anv\xe4ndarnamn och l\xf6senord m\xe5ste anges";
            return; // Avbryt registreringen om fälten är tomma
        }
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if (response.ok) {
                successSpan.textContent = "Lyckad registrering";
                document.getElementById("register-username").value = "";
                document.getElementById("register-password").value = "";
            } else {
                const data = await response.json(); // Flytta denna rad inom else-blocket
                console.error("Error registering:", data.error);
                errorSpan.textContent = "Ett fel uppstod vid registrering";
            }
        } catch (error) {
            console.error("Error registering:", error);
            errorSpan.textContent = "Ett fel uppstod vid registrering";
        }
    };
}
async function login() {
    const loginForm = document.getElementById("Form");
    const errorSpan = document.getElementById("errorSpan");
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    loginForm.addEventListener("submit", async (event)=>{
        event.preventDefault();
        // Kontrollera om användarnamn eller lösenord är tomma
        if (!username || !password) {
            errorSpan.textContent = "Anv\xe4ndarnamn och l\xf6senord m\xe5ste anges";
            return; // Avbryt inloggningen om fälten är tomma
        }
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();
            if (response.ok) {
                // spara JWT token i sessionStorage
                sessionStorage.setItem("jwtToken", data.token);
                window.location.href = "/secret.html"; // ändra till secret.html
            } else {
                console.error(data.error);
                errorSpan.textContent = "Felaktigt anv\xe4ndarnamn eller l\xf6senord"; // Visa felmeddelandet från servern
            }
        } catch (error) {
            console.error("Error logging in:", error);
            errorSpan.textContent = "Ett fel uppstod vid inloggningen"; // Visa generellt felmeddelande
        }
    });
}

//# sourceMappingURL=index.aa69868b.js.map
