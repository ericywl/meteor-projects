import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.validateNewUser((user) => {
        const email = user.emails[0].address;
        const emailSchema = new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        });

        emailSchema.validate({email});
        console.log(user);
        return true;
    });
});
