import { getReservations, denyReservation, getClowns, saveFilledReservation, getFilledReservations, sortByDate } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [, reservationId] = click.target.id.split("--")
        denyReservation(parseInt(reservationId))
    }
})
mainContainer.addEventListener("change", event => {
    if (event.target.id === "clowns") {
        const [reservationId, clownId] = event.target.value.split("--")
        const filledReservation = {
            reservationId: parseInt(reservationId),
            clownId: parseInt(clownId),
            timestamp: Date.now()
        }
        saveFilledReservation(filledReservation)
    }
}
)

const convertReservationToList = (reservation) => {
    const clowns = getClowns()
    const filledReservations = getFilledReservations()
    let htmlString = ""

    htmlString = `
        <li>
            ${reservation.parentName} is needing ${reservation.lengthOfParty} hours of clown work for 
            ${reservation.childName} and ${reservation.numOfChildren} children on ${reservation.date}. The 
            address is ${reservation.address}. 
            <button class="reservation__deny" id="reservation--${reservation.id}">
                Deny
            </button>
            <select class="clowns" id="clowns">
                <option value="">Choose</option>
                ${clowns.map(clown => {
                    return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                }
                ).join("")
                }
            </select>
        </li>
        `
    filledReservations.map(filled => {
        if(filled.reservationId === reservation.id) {
            htmlString = `
                        <li class="filled">
                            ${reservation.parentName} is needing ${reservation.lengthOfParty} hours of clown work for 
                            ${reservation.childName} and ${reservation.numOfChildren} children on ${reservation.date}. The 
                            address is ${reservation.address}. 
                            <button class="reservation__deny" id="reservation--${reservation.id}">
                                Deny
                            </button>
                        </li>
                        `
        }
    })

    return htmlString
}

export const Reservations = () => {
    const reservations = getReservations()
    sortByDate(reservations)

    return `
        <ul>
            ${reservations.map(convertReservationToList)
                .join("")
            }
        </ul>
        `
}

