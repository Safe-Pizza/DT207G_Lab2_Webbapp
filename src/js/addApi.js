"use strict";

document.addEventListener("DOMContentLoaded", () => {

    //eventlyssnare för submit knapp
    document.querySelector("#submit-button").addEventListener("click", addJob);

})



//funktion för att lägga till jobb i API
function addJob() {
    //Formulärdata
    let companyname = document.getElementById("companyname").value;
    let jobtitle = document.getElementById("jobtitle").value;
    let location = document.getElementById("location").value;
    let description = document.getElementById("description").value;
    let startdate = document.getElementById("startdate").value;
    let enddate = document.getElementById("enddate").value;

    //Varibel för errors-element DOM
    let errorsEl = document.getElementById("errors");
    errorsEl.innerHTML = "";

    //Array för felhantering
    let errors = [];

    //Funktion för korrekt datumformat
    function isValidDate(stringDate) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(stringDate);
    }

    //Validering av formulärdata, kontroll ej tom + datumvalidering
    if (companyname === "") {
        errors.push("<li>Du måste fylla i företagsnamn</li>");
    }

    if (jobtitle === "") {
        errors.push("<li>Du måste fylla i jobbtitel</li>");
    }
    if (location === "") {
        errors.push("<li>Du måste fylla i stad</li>");
    }
    if (description === "") {
        errors.push("<li>Du måste fylla i beskrivning</li>");
    }
    if (startdate === "") {
        errors.push("<li>Du måste fylla i startdatum</li>");
    }
    if (isValidDate(startdate) === false) {
        errors.push("<li>Datumformatet måste vara: XXXX-XX-XX</li>")
    }
    if (enddate === "") {
        errors.push("<li>Du måste fylla i slutdatum</li>");
    }
    if (isValidDate(enddate) === false) {
        errors.push("<li>Datumformatet måste vara: XXXX-XX-XX</li>")
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else { //Vid inga felmeddelanden lägg till i API
        //skapa objekt
        let job = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            descripton: description,
            startdate: startdate,
            enddate: enddate
        }

        //skicka objekt till funktion för POST
        createJob(job);

        //töm formulärfält
        companyname = "";
        jobtitle = "";
        location = "";
        description = "";
        startdate = "";
        enddate = "";
    }
}

//funktion för POST till API
async function createJob(job) {
    const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(job)
    });

    const data = await res.json();
    console.log(data);
}