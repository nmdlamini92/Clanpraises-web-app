

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

      //["Poor", "Fair", "Good", "Very Good", "Excellent"];

      const labels = ["ukhe eceleni", "akunetisi", "kuya ngakhona", "kuyamukeleka", "ushaye esicongweni"]   
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

    static sendFeedbackGuestlidations(values1) {

       const { message, yourEmail} = values1;
        const errors = {};

        if (!message || message.trim() === "") {
            errors.message = "*required";
        }

        if (!yourEmail || yourEmail.trim() === "") {
            errors.yourEmail = "*required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail)) {
            errors.yourEmail = "Invalid email format";
        }

        /*if ((email || email.trim() === "") && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            errors.email = "Invalid email format";
        }*/

        return Object.keys(errors).length > 0 ? errors : null;

    }

    static signUpValidations(values1) {

        

        const { username, email, password1, password2} = values1;
        const errors = {};

        if (!username || username.trim() === "") {
            errors.username = "*required";
        }

        if (!email || email.trim() === "") {
            errors.email = "*required";
        }

        if (!password1 || password1.trim() === "") {
            errors.password1 = "*required";
        }

        if (!password2 || password2.trim() === "") {
            errors.password2 = "*required";
        }

        if (!email || email.trim() === "") {
            errors.email = "*required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format";
        }

        return Object.keys(errors).length > 0 ? errors : null;

        /*if (!username) errors.username = "required";
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

        return errors;*/
}
        

    
    static signInValidations (values2) {  

      const email = values2.email;
      const password = values2.password;

        if (email ==="") {
          if (password ==="") {
            return ({email: "*required", password: "*required"});
          }
          return ({email: "*required"});
        }
        if (password ==="") {
            if (email ==="") {
              return ({email: "*required", password: "*required"});
            }
            return ({password: "*required"});
        }
      }

}