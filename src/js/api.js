"use strict";

fetchData();


//fetch funktion jobb-API
async function fetchData() {
    try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();

        if (response.ok) {
            writeJobs(data);
        } else return document.getElementById("api-result").innerHTML = "";
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//funktion för DELETE i API
async function deleteJob(id) {
    const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();
    fetchData();
}

async function changeJob(id, job) {
    const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(job)
    });

    const data = await res.json();
    console.log(data);
    fetchData();
}

//funktion för att skriva ut jobb till DOM
function writeJobs(jobs) {
    let resultEl = document.getElementById("api-result");

    resultEl.innerHTML = "";

    //loop för utskrift
    jobs.forEach(job => {
        let articleEl = document.createElement("article");
        let deleteButtonEl = document.createElement("button");
        let aEl = document.createElement("a");
        let content = `
       <h3>${job.jobtitle}</h3>
       <p><strong>Företag: </strong>${job.companyname}</p>
       <p><strong>Stad: </strong>${job.location}</p>
       <p><strong>Beskrivning: </strong>${job.descripton}</p>
       <p><strong>Anställningsdatum: </strong>${job.startdate}</p>
       <p><strong>Anställning avslutad: </strong>${job.enddate}</p>`;

        aEl.href = `#form-change`;
        aEl.classList.add("link-change");
        aEl.innerHTML = "Ändra";
        deleteButtonEl.classList.add("delete-button");
        deleteButtonEl.innerHTML = "Ta bort";
        articleEl.innerHTML = content;
        articleEl.appendChild(deleteButtonEl);
        articleEl.appendChild(aEl);

        //skriv ut till DOM
        resultEl.appendChild(articleEl);

        //eventlyssnare för delete-knapp
        deleteButtonEl.addEventListener("click", () => {
            deleteJob(job.id);
        });

        aEl.addEventListener("click", () => {
            changeJobData(job);
        })
    })
}

function changeJobData(job) {
    let changeFormEl = document.getElementById("form-change");
    changeFormEl.classList.remove("hidden");

    let submitButton = document.getElementById("change-submit-button");

    //Formulärdata
    let companyname = document.getElementById("change-companyname");
    let jobtitle = document.getElementById("change-jobtitle");
    let location = document.getElementById("change-location");
    let description = document.getElementById("change-description");
    let startdate = document.getElementById("change-startdate");
    let enddate = document.getElementById("change-enddate");

    //fyll i data från API
    companyname.value = job.companyname;
    jobtitle.value = job.jobtitle;
    location.value = job.location;
    description.value = job.descripton;
    startdate.value = job.startdate;
    enddate.value = job.enddate;

    //Varibel för errors-element DOM
    let errorsEl = document.getElementById("errors-change");
    errorsEl.innerHTML = "";

    //Array för felhantering
    let errors = [];

    //Funktion för korrekt datumformat
    function isValidDate(stringDate) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(stringDate);
    }

    submitButton.addEventListener("click", () => {

        //Validering av formulärdata, kontroll ej tom + datum validering
        if (companyname.value === "") {
            errors.push("<li>Du måste fylla i företagsnamn</li>");
        }

        if (jobtitle.value === "") {
            errors.push("<li>Du måste fylla i jobbtitel</li>");
        }
        if (location.value === "") {
            errors.push("<li>Du måste fylla i stad</li>");
        }
        if (description.value === "") {
            errors.push("<li>Du måste fylla i beskrivning</li>");
        }
        if (startdate.value === "") {
            errors.push("<li>Du måste fylla i startdatum</li>");
        }
        if (isValidDate(startdate.value) === false) {
            errors.push("<li>Datumformatet måste vara: XXXX-XX-XX</li>")
        }
        if (enddate.value === "") {
            errors.push("<li>Du måste fylla i slutdatum</li>");
        }
        if (isValidDate(enddate.value) === false) {
            errors.push("<li>Datumformatet måste vara: XXXX-XX-XX</li>")
        }

        //Skriv ut eventuella felmeddelanden
        if (errors.length !== 0) {
            errors.forEach(error => {
                errorsEl.innerHTML += error;
            })
        } else { //Vid inga felmeddelanden ändra i API

            changeFormEl.classList.add("hidden");

            let changedJob = {
                companyname: companyname.value,
                jobtitle: jobtitle.value,
                location: location.value,
                descripton: description.value,
                startdate: startdate.value,
                enddate: enddate.value
            }

            changeJob(job.id, changedJob);
        }
    })
}