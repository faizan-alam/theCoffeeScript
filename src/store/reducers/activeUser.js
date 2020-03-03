
export default (state = {}, action) => {
    switch (action.type) {
        case 'CurrentUser':
            return action.currentUser
        default:
        return state
    }
}