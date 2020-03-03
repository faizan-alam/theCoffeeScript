export default (state = {}, action) => {
    switch (action.type) {
        case 'Location':
            return action.location
        default:
        return state
    }
}