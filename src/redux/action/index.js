// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}


// For login
export const login = (userData) =>{
    return {
        type:"LOGIN_SUCCESS",
        payload:userData
    }
}

// For logout
export const logout = () =>{
    return {
        type:"LOGOUT"
    }
}
export const logoutAll = () =>{
    return {
        type:"LOGOUTALL"
    }
}