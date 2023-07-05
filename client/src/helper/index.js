const isAuthenticated = () => {
  return localStorage.getItem("auth") ? true : false;
};

const isAdmin =  () => {  
    return localStorage.getItem("role") ==='admin'
};
export { isAuthenticated ,isAdmin};
