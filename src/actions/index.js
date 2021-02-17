export function getCities() {
    return async (dispatch) => {
        const response = await fetch("https://gist.githubusercontent.com/Pinois/36bb5fbf9b6a686f0baf4006dd137bca/raw/a40d8b3f696a75f388db286d57bdd05a925fa0e7/trips.json");
        const cities = await response.json();
        dispatch({
            type: "GET_CITIES",
            value: cities
        })
    }
}

export function getUser(user) {
    return {
        type: "GET_USER",
        value: user
    }
}

export function updateUser(user = {
    passengerFirstName: "",
    passengerLastName: "",
    passengerPhoneNumber: "",
    id: Date.now()
}) {
    return {
        type: "UPDATE_USER",
        value: user
    }
}

export function getBookedSeats(seats) {
    return {
        type: "GET_BOOKED_SEATS",
        value: seats
    }
}