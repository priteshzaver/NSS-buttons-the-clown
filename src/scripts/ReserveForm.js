import { sendReservation } from "./dataAccess.js"

export const ReserveForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input"/>
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name</label>
            <input type="text" name="childName" class="input"/>
        </div>
        <div class="field">
            <label class="label" for="numberOfChildren">Number of Children Attending</label>
            <input type="number" name="numberOfChildren" class="input"/>
        </div>
        <div class="field">
            <label class="label" for="partyAddress">Address</label>
            <input type="text" name="partyAddress" class="input"/>
        </div>
        <div class="field">
            <label class="label" for="reservationDate">Date of Reservation</label>
            <input type="date" name="reservationDate" class="input"/>
        </div>
        <div class="field">
            <label class="label" for="reservationLength">Length of Reservation (in hours)</label>
            <input type="number" name="reservationLength" class="input"/>
        </div>      
        
        <button class="button" id="submitReservation">Submit Reservation</button>
        `
    return html
}

const mainContainer = document.querySelector("#container")
//this event listener takes the data that was input by the user and converts it to an object with key-value pairs.
//the function sendReservation takes this data and sends it to database.json to be stored as permanent
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReservation") {
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userNumOfChildren = document.querySelector("input[name='numberOfChildren']").value
        const userAddress = document.querySelector("input[name='partyAddress']").value
        const userDate = document.querySelector("input[name='reservationDate']").value
        const userLength = document.querySelector("input[name='reservationLength']").value

        const dataToApi = {
            parentName: userParentName,
            childName: userChildName,
            numOfChildren: userNumOfChildren,
            address: userAddress,
            date: userDate,
            lengthOfParty: userLength
        }

        sendReservation(dataToApi)
    }
})