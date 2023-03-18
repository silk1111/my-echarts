let defaultToken = null;
let defaultRoutes = [];
let isRoutersGet = false;
let theme = 'light';
try {
    if(localStorage.getItem('token'))
    defaultToken = localStorage.token;
    if(localStorage.getItem('theme'))
    theme = localStorage.theme;
} catch (error) {
    console.log(error);
    
}
export default {
    token: defaultToken,
    routes:defaultRoutes,
    isRoutersGet: isRoutersGet,
    theme:theme
};