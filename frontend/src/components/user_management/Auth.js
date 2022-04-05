
export const isLoggedIn = () => {
    if (typeof window == "undefined") {
      return false;
    }
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) {
      return user;
    } else {
      return false;
    }
};

export const signoutUser = async next => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      next();
  
      try {
            const res = await fetch(`/signout`, {
                method: "GET"
            });
            
            return console.log("user signout success");
        } catch (err) {
            return console.log(err);
        }
    }
  };