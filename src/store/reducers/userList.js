export default (state = [], action) => {
    switch (action.type) {
        case 'UserList':
            return [...state,action.user]
        default:
            return state
    }
}