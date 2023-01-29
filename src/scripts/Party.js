import { Reservations } from "./Requests.js"
import { ReserveForm } from "./ReserveForm.js"

export const Party = () => {
    return `
        <h1>Clowning Around</h1>
        <section class="reserveForm">
            ${ReserveForm()}
        </section>

        <section class="reservationRequests">
            <h2>Requested Reservations</h2>
            ${Reservations()}
        </section>
        `
}

