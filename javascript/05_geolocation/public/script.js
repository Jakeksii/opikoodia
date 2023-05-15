function findMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#mapLink");

    mapLink.href = "";
    mapLink.textContent = "";

    function succes(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = "";

        const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude:${latitude}, Longtitude:${longitude}`;
        const mapholder = document.querySelector("#mapholder");
        mapholder.innerHTML = `<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=25.08095004202205%2C60.46495094664967%2C25.10221459509212%2C60.46936154193252&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="${link}">Näytä isommalla kartalla</a></small>`
    }

    function error(){
        status.textContent = "Cannot retrieve your position";
    }
    if(!navigator.geolocation){
        status.textContent = "No geolocation in browser";
    }else{
        status.textContent = "Locating...";
    }

    navigator.geolocation.getCurrentPosition(succes, error)
}