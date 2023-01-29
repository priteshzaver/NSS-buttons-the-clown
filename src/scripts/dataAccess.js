const applicationState = {
    clowns: [],
    reservations: [],
    filledReservations: []
}

const API = "http://localhost:8088"


//sendReservation has two parts. It takes the input data and converts it to JSON form. The second part takes the information and sends it to API to be permanent. It also broadcasts "stateChanged"
export const sendReservation = (userReservationRequest) => {
    const sendOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userReservationRequest)
    }
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/reservations`, sendOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
//fetchReservation takes the permanent data from API and puts it into applicationState
export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (reservationRequests) => {
                applicationState.reservations = reservationRequests
            }
        )
}
//Because fetchReservation puts the data from API into applicationState, we can now make a copy of that data with getReservations
export const getReservations = () => {
    return [...applicationState.reservations]
}

export const denyReservation = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/reservations/${id}`, { method: "DELETE"})
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (reservationClowns) => {
                applicationState.clowns = reservationClowns
            }
        )
}
export const getClowns = () => {
    return [...applicationState.clowns]
}

export const saveFilledReservation = (filledReservation) => {
    const saveFilled = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filledReservation)
    }
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/filledReservations`, saveFilled)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const getFilledReservations = () => {
    return [...applicationState.filledReservations]
}

export const fetchFilledReservations = () => {
    return fetch(`${API}/filledReservations`)
        .then(response => response.json())
        .then(
            (filled) => {
                applicationState.filledReservations = filled
            }
        )
}

export const sortByDate = (completions) => {
    const sorted = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }

    completions.sort(sorted)
}
/*
const sortByDate = (arr) => {
    const sorter = (a,b) => {
        return new Date(a.party_Date).getTime() - new Date(b.party_Date).getTime();
    }
    arr.sort(sorter);
}
sortByDate(requests);
*/



