"use strict";

document.querySelector("#submit-button").addEventListener("click", addJob);

function addJob() {
    let companyname = document.getElementById("companyname").value;
    let jobtitle = document.getElementById("jobtitle").value;
    let description = document.getElementById("description").value;
    let startdate = document.getElementById("startdate").value;
    let enddate = document.getElementById("enddate").value;

    console.log(companyname + jobtitle + description + startdate + enddate);
}