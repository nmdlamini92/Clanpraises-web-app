

export default class Validations {

    static addReviewValidations (values) {

      const comment = values.comment;
      const rating = values.rating;
      const author = values.author

      const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

      if (rating===null) {
        if (comment ==="" || comment === null) {
          console.log(comment ==="" || comment === null)
          return ({errorRating: "", errorComment: `*required* enter review`, comment: comment})
        }
        else {
          return ({errorRating: "Rate post", errorComment:"", comment: comment});
        }
      }
      else {
          return ({errorRating:"", errorComment: "Edit or send review", comment: labels[rating - 1] });
      }
    }

    static addClanPraiseValidations (values) {

        const clanName = values.clanName;
        const tribe = values.tribe;
        const clanPraise = values.clanPraise;
        console.log(clanName);

        if (clanName ==="") {                    
            if (tribe ==="") {                     
                if (clanPraise ===""){
                  return ({clanName: "clan name is required", tribe: "tribe is required", clanPraise: "clan praise is required"});
                }
                else{
                  return ({clanName: "clan name is required", tribe: "tribe is required"});
               } 
            }
            else{
              if(!(clanPraise ==="")) {
                return ({clanName: "clan name is required"});
                //return reply.send({status: false, errors: {username: "username is required", password: "password is required"}});
              } 
              else if (clanPraise ==="")
                {
                return ({clanName: "clan name is required", clanPraise: "clan praise is required"});
              } 
            }
          }
          else{
            if (tribe ==="") {
              if(clanPraise ===""){
                return ({tribe: "tribe is required", clanPraise: "clan praise is required"});
              }
              else{
                return ({tribe: "tribe is required"});
              }
            }
           else{
            if (clanPraise ==="")
            return ({clanPraise: "clan praise is required"});
            }
        }
    }

    static signUpValidations (values1) {

        const username = values1.username;
        const email = values1.email;
        const password = values1.password;

        if (username ==="") {
            if (email ==="") {
                if (password ===""){
                    return ({username: "username is required", email: "email is required", password: "password is required"});
                }
                else{
                    return ({username: "username is required", email: "email is required"});
                } 
            }
            else{
                if(!(password ==="")) {
                return ({username: "username is required"});
                } 
                else if (password ==="")
                {
                return ({username: "username is required", password: "password is required"});
                } 
            }
        }
        else{
            if (email ==="") {
                if(password ===""){
                return ({email: "email is required", password: "password is required"});
                }
                else{
                return ({email: "email is required"});
                }
            }
            else{
            if (password ==="")
            return ({password: "password is required"});
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