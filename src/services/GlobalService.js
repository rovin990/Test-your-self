class GlobalService{

    isLoggedIn(){
        let auth= sessionStorage.getItem("auth");
        return auth;
    }

    getUserDetails(){
        return sessionStorage.getItem("userdetails")
    }
}


export default GlobalService;
