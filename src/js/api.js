"use strict";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})

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

//funktion för att skriva ut jobb till DOM
function writeJobs(jobs) {
    let resultEl = document.getElementById("api-result");

    resultEl.innerHTML = "";

    //loop för utskrift
    jobs.forEach(job => {
        let articleEl = document.createElement("article");
        let deleteButtonEl = document.createElement("button");
        let content = `
       <h3>${job.jobtitle}</h3>
       <p><strong>Företag: </strong>${job.companyname}</p>
       <p><strong>Stad: </strong>${job.location}</p>
       <p><strong>Beskrivning: </strong>${job.descripton}</p>
       <p><strong>Anställningsdatum: </strong>${job.startdate}</p>
       <p><strong>Anställning avslutad: </strong>${job.enddate}</p>`;

        deleteButtonEl.classList.add("delete-button");
        deleteButtonEl.innerHTML = "Ta bort";
        articleEl.innerHTML = content;
        articleEl.appendChild(deleteButtonEl);

        //skriv ut till DOM
        resultEl.appendChild(articleEl);

        //eventlyssnare för delete-knapp
        deleteButtonEl.addEventListener("click", () => {
            deleteJob(job.id);
        });
    })
}