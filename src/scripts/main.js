import { fetchClowns, fetchReservations, fetchFilledReservations } from "./dataAccess.js";
import { Party } from "./Party.js";

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchReservations()
        .then(() => fetchClowns())
        .then(() => fetchFilledReservations())
        .then(() => {
            mainContainer.innerHTML = Party()
        })
}

render()

mainContainer.addEventListener("stateChanged", customEvent => {
    render()
    }
) //this event listener re-renders the page every time "stateChanged" is broadcast