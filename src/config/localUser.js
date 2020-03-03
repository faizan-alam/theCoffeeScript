import store from '../store/index';

export const checkUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
        store.dispatch({ type: 'CurrentUser', currentUser: {...user,login:true} })
    }
}