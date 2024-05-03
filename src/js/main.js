"use strict";


const apiUrl = "http://localhost:3000/api";

async function register() {


    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const errorSpan = document.getElementById("errorSpan");

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
        errorSpan.textContent = "";

    } catch (error) {
        console.error("Error registering:", error);
        if (username.length === 0 || password.length === 0) {
            errorSpan.textContent = "Felaktig registrering. Användarnamn och Lösenord krävs";
        } else {
            errorSpan.textContent = "Ett fel uppstod vid registrering";
        }
    }
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error logging in:", error);
    }
}
