

export default class Validations {


    static addCommentGuestValidations (values) {

      const message = values.message;
      const yourName = values.yourName;
      const yourEmail = values.yourEmail;

      const errors = {};

      if (!message || message.trim() === "") {
          errors.message = "*required";
      }

      if (!yourName || yourName.trim() === "") {
          errors.yourName = "*required";
      }

      if (!yourEmail || yourEmail.trim() === "") {
          errors.yourEmail = "*required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail)) {
          errors.yourEmail = "Invalid email format";
      }

      return Object.keys(errors).length > 0 ? errors : null;
    }

    static addReviewValidations (values) {

      console.log(values);

      const rating = values.rating;
      const message = values.message;
      const yourName = values.yourName;
      const yourEmail = values.yourEmail;

      const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

      const errors = {}

  // Validate name
      if (!yourName || yourName.trim() === "") {
        errors.errorName = "*required";
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!yourEmail || yourEmail.trim() === "") {
        errors.errorEmail = "*required";
      } else if (!emailRegex.test(yourEmail)) {
        errors.errorEmail = "invalid email address";
      }

      // Validate rating and message
      if (rating === null || rating === "" ){
        if (!message || message.trim() === "") {
          errors.errorMessage = "*required";
          //errors.errorRating = "Rate post";
        } else {
          errors.errorRating = "Rate post";
        }
        errors.message = message;
      } else {
        if (!message || message.trim() === "") {
          errors.message = labels[rating - 1];
          errors.errorMessage = "Edit or send review";  
        }
  

        //errors.message = labels[rating - 1];
        //errors.errorMessage = "Edit or send review";
      }

      return errors;

      /*const rating = values.rating;
      const message = values.message;
      const yourName = values.yourName;
      const yourEmail = values.yourEmail;

      const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

      const errors = {errorRating: "", errorMessage: "", errorName: "", errorEmail: "", message: ""};

      let hasError = false;

      if (!yourName || yourName.trim() === "") {
        errors.errorName = "*required* enter your name";
        errors.message = message;
        hasError = true;
      }

      if (!yourEmail || yourEmail.trim() === "") {
        errors.errorEmail = "*required* enter your email";
        errors.message = message;
        hasError = true;
      }

      if (!message || message.trim() === "") {
        errors.errorMessage = "*required* enter review";
        errors.message = message;
        hasError = true;
      }


      if (rating === null) {
        if (!message || message.trim() === "") {
          errors.errorRating = "Rate post";
          errors.errorMessage = "*required* enter review";
          errors.message = message;
          hasError = true;
        } else {
          errors.errorRating = "Rate post";
          errors.errorMessage = "";
          errors.message = message;
          hasError = true;
        }
      } else {
        errors.message = labels[rating - 1];
      }

      return hasError ? errors : null;*/

      /*if (!message || message.trim() === "") {
          errors.message = "*required";
      }

      if (!rating || rating.trim() === "") {
          errors.rating = "*required";
      }

      if (!yourName || yourName.trim() === "") {
          errors.yourName = "*required";
      }

      if (!yourEmail || yourEmail.trim() === "") {
          errors.yourEmail = "*required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail)) {
          errors.yourEmail = "Invalid email format";
      }

      return Object.keys(errors).length > 0 ? errors : null;*/

      /*const message = values.message;
      const rating = values.rating;
      //const y = values.author

      const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

      if (rating===null) {
        if (message ==="" || message === null) {
          console.log(message ==="" || message === null)
          return ({errorRating: "", errorMessage: `*required* enter review`, message: message})
        }
        else {
          return ({errorRating: "Rate post", errorMessage:"", message: message});
        }
      }
      else {
          return ({errorRating:"", errorMessage: "Edit or send review", message: labels[rating - 1] });
      }*/
    }

    static addClanPraiseValidationsGuest (values) {
      
    const { clanName, tribe, clanPraise, yourName, yourEmail } = values;
    const errors = {};

    if (!clanName || clanName.trim() === "") {
        errors.clanName = "*required";
    }

    if (!tribe || tribe.trim() === "") {
        errors.tribe = "*required";
    }

    if (!clanPraise || clanPraise.trim() === "") {
        errors.clanPraise = "*required";
    }

    if (!yourName || yourName.trim() === "") {
        errors.yourName = "*required";
    }

    if (!yourEmail || yourEmail.trim() === "") {
        errors.yourEmail = "*required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail)) {
        errors.yourEmail = "Invalid email format";
    }

    return Object.keys(errors).length > 0 ? errors : null;
}


    static addClanPraiseValidations (values) {

        const clanName = values.clanName;
        const tribe = values.tribe;
        const clanPraise = values.clanPraise;
        console.log(clanName);

        if (clanName ==="") {                    
            if (tribe ==="") {                     
                if (clanPraise ===""){
                  return ({clanName: "*required", tribe: "*required", clanPraise: "*required"});
                }
                else{
                  return ({clanName: "*required", tribe: "*required"});
               } 
            }
            else{
              if(!(clanPraise ==="")) {
                return ({clanName: "*required"});
                //return reply.send({status: false, errors: {username: "username is required", password: "password is required"}});
              } 
              else if (clanPraise ==="")
                {
                return ({clanName: "*required", clanPraise: "*required"});
              } 
            }
          }
          else{
            if (tribe ==="") {
              if(clanPraise ===""){
                return ({tribe: "*required", clanPraise: "*required"});
              }
              else{
                return ({tribe: "*required"});
              }
            }
           else{
            if (clanPraise ==="")
            return ({clanPraise: "*required"});
            }
        }
    }

    /*static signUpValidations(values1) {

        const { username, clan, tribe, email, password1, password2 } = values1;
        const errors = {};

        if (!username) errors.username = "required";
        if (!clan) errors.clan = "required";
        if (!tribe) errors.tribe = "required";
        if (!email) errors.email = "required";

        if (!password1) {
            errors.password1 = "required";
        } else if (password1.length < 6) {
            errors.password1 = "must be at least 6 characters"
        }

        if (!password2) {
            errors.password2 = "required";
        }

        return errors;
}*/


    static signUpValidations (values1) {

        const username = values1.username;
        const clan = values1.clan;
        const tribe = values1.tribe;
        const email = values1.email;
        const password1 = values1.password1;
        const password2 = values1.password2;

        if (username ==="") {
            if (clan ==="") {
                if (tribe ===""){
                    if (email ==="") {
                        if (password1 ==="") {
                            if (password2 ===""){
                                return ({username: "required", clan: "required", tribe: "required", email: "required", password1: "required", password2: "required"});
                            }
                            else{
                                return ({username: "required", clan: "required", tribe: "required", email: "required", password1: "required"});
                            }
                        }
                        else { 
                          if (!(password2 ==="")) {
                            return ({username: "required", clan: "required", tribe: "required", email: "required"});
                          }
                          else{
                            return ({username: "required", clan: "required", tribe: "required", email: "required", password2: "required"});
                          }
                        }
                    }
                    else{
                      if (!(password1 ==="")) {
                         if (!(password2 ==="")) {
                             return ({username: "required", clan: "required", tribe: "required"});
                         }
                         else{
                             return ({username: "required", clan: "required", tribe: "required", password2: "required"});
                         }
                      }
                      else{
                        return ({username: "required", clan: "required", tribe: "required", password1: "required", password2: "required"});
                      }
                    }
                } 
                else{
                  if (!(email ==="")) {
                     if (!(password1 ==="")) {
                        if (!(password2 ==="")) {
                            return ({username: "required", clan: "required"});
                        }
                        else{
                            return ({username: "required", clan: "required", password2: "required"});
                        }
                     }
                     else {
                        if (!(password2 ==="")) {
                            return ({username: "required", clan: "required", password1: "required"});
                        }
                        else{
                            return ({username: "required", clan: "required", password1: "required", password2: "required"});
                        }
                    }
                  }
                  else{
                    if (!(password1 ==="")) {
                          if (!(password2 ==="")) {
                              return ({username: "required", clan: "required", email: "required"});
                          }
                          else{
                              return ({username: "required", clan: "required", email: "required", password2: "required"});
                          }
                    }
                    else {
                      if (!(password2 ==="")) {
                          return ({username: "required", clan: "required", email: "required", password1: "required"});
                      }
                      else{
                          return ({username: "required", clan: "required", email: "required", password1: "required", password2: "required"});
                      }
                    }
                  }
                }
            }
            else{
              if (!(tribe ==="")) {
                if (!(email ==="")) {
                    if (!(password1 ==="")) {
                        if (!(password2 ==="")) {
                            return ({username: "required"});
                        }
                        else{
                            return ({username: "required", password2: "required"});
                        }
                    }
                    else {
                        if (!(password2 ==="")) {
                            return ({username: "required",password1: "required"});
                        }
                        else{
                            return ({username: "required", password1: "required", password2: "required"});
                        }
                    }
                }
                else{
                  if (!(password1 ==="")) {
                      if (!(password2 ==="")) {
                          return ({username: "required", email: "required"});
                      }
                      else{
                          return ({username: "required", email: "required", password2: "required"});
                      }
                  }
                  else {
                      if (!(password2 ==="")) {
                          return ({username: "required",email: "required", password1: "required"});
                      }
                      else{
                          return ({username: "required", email: "required", password1: "required", password2: "required"});
                      }
                  }
                } 
              }
              else{
                if (!(email ==="")) {
                    if (!(password1 ==="")) {
                        if (!(password2 ==="")) {
                            return ({username: "required", tribe: "required"});
                        }
                        else{
                            return ({username: "required", tribe: "required", password2: "required"});
                        }
                    }
                    else {
                        if (!(password2 ==="")) {
                            return ({username: "required", tribe: "required", password1: "required"});
                        }
                        else{
                            return ({username: "required", tribe: "required", password1: "required", password2: "required"});
                        }
                    }
                }
                else{
                    if (!(password1 ==="")) {
                        if (!(password2 ==="")) {
                            return ({username: "required", tribe: "required", email: "required"});
                        }
                        else{
                            return ({username: "required", tribe: "required", email: "required", password2: "required"}); 
                        }
                    }
                    else {
                        if (!(password2 ==="")) {
                            return ({username: "required", tribe: "required", email: "required", password1: "required"});
                        }
                        else{
                            return ({username: "required", tribe: "required", email: "required", password1: "required", password2: "required"});
                        }
                    }
                }
              }
            }
        }
        else{
          if (clan ==="") {
            if (tribe ==="") {
                if (email ==="") {
                    if (password1 ==="") {
                        if (password2 ===""){
                            return ({clan: "required", tribe: "required", email: "required", password1: "required", password2: "required"});
                        }
                        else{
                            return ({clan: "required", tribe: "required", email: "required", password1: "required"});
                        }
                    }
                    else { 
                      if (!(password2 ==="")) {
                        return ({clan: "required", tribe: "required", email: "required"});
                      }
                      else{
                        return ({clan: "required", tribe: "required", email: "required", password2: "required"});
                      }
                    }
                }
                else{
                  if (!(password1 ==="")) {
                     if (!(password2 ==="")) {
                         return ({clan: "required", tribe: "required"});
                     }
                     else{
                         return ({clan: "required", tribe: "required", password2: "required"});
                     }
                  }
                  else{
                    if (!(password2 ==="")) {
                      return ({clan: "required", tribe: "required", password1: "required"});
                    }
                    else{
                      return ({clan: "required", tribe: "required", password1: "required", password2: "required"});
                    }
                  }
                }
            }
            else{
              if (!(email ==="")) {
                 if (!(password1 ==="")) {
                    if (!(password2 ==="")) {
                        return ({clan: "required"});
                    }
                    else{
                        return ({clan: "required", password2: "required"});
                    }
                 }
                 else {
                    if (!(password2 ==="")) {
                        return ({clan: "required", password1: "required"});
                    }
                    else{
                        return ({clan: "required", password1: "required", password2: "required"});
                    }
                 }
              }
              else{
                if (!(password1 ==="")) {
                    if (!(password2 ==="")) {
                        return ({clan: "required", email: "required"});
                    }
                    else{
                        return ({clan: "required", email: "required", password2: "required"});
                    }
                }
                else {
                  if (!(password2 ==="")) {
                      return ({clan: "required", email: "required", password1: "required"});
                  }
                  else{
                      return ({clan: "required", email: "required", password1: "required", password2: "required"});
                  }
                }
              }
            }
          }
          else{
            if (tribe ==="") {
              if ((email ==="")) {
                if ((password1 ==="")) {
                    if ((password2 ==="")) {
                        return ({tribe: "required", email: "required", password1: "required", password2: "required"});
                    }
                    else{
                        return ({tribe: "required", email: "required", password1: "required"});
                    }
                }
                else {
                    if (!(password2 ==="")) {
                        return ({tribe: "required", email: "required"});
                    }
                    else{
                        return ({tribe: "required",email: "required", password2: "required"});
                    }
                }
              }
              else{
                if (password1 ==="") {
                  if (password2 ==="") {
                      return ({tribe: "required",password1: "required", password2: "required"});
                  }
                  else{
                      return ({tribe: "required", password1: "required"});
                  }
                }
                else {
                  if (password2 ==="") {
                      return ({tribe: "required", password2: "required"});
                  }
                  else{
                      return ({tribe: "required"});
                  }
                }
              }
            }
            else{
              if (email ==="") {
                if (password1 ==="") {
                    if (password2 ==="") {
                        return ({email: "required", password1: "required", password2: "required"});
                    }
                    else{
                        return ({email: "required", password1: "required"});
                    }
                }
                else {
                    if (!(password2 ==="")) {
                        return ({email: "required"});
                    }
                    else{
                        return ({email: "required", password2: "required"});
                    }
                }
              }
              else{
                if (password1 ==="") {
                  if (password2 ==="") {
                      return ({password1: "required", password2: "required"});
                  }
                  else{
                      return ({password1: "required"});
                  }
                }
                else {
                  if (password2 ==="") {
                      return ({password2: "required"});
                  }
                }
              }
            }         
          }
        }          
      }
        

    

    static signInValidations (values2) {  

      const email = values2.email;
      const password = values2.password;

        if (email ==="") {
          if (password ==="") {
            return ({email: "email is required", password: "password is required"});
          }
          return ({email: "email is required"});
        }
        if (password ==="") {
            if (email ==="") {
              return ({email: "email is required", password: "password is required"});
            }
            return ({password: "password is required"});
        }
      }

}