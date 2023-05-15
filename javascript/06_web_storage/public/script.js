window.onload = function () {
    updateStorageInfo()
}

function storeToLocalStorage(){
    localStorage.setItem("message", document.getElementById("message").value);
    updateStorageInfo();
}

function storeToSessionStorage(){
    sessionStorage.setItem("message", document.getElementById("message").value);
    updateStorageInfo();
}

function updateStorageInfo() {
    if (localStorage.getItem("message")){
        let message = localStorage.getItem("message");
        let local = document.getElementById("local");
        local.textContent = `In local storage: ${message}`;
    }
    if (sessionStorage.getItem("message")){
        let message = sessionStorage.getItem("message");
        let session = document.getElementById("session");
        session.textContent = `In session storage: ${message}`;
    }
}