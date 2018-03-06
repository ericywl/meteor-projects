import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "simpl-schema/dist/SimpleSchema";
import shortid from "shortid";

export const LinksDB = new Mongo.Collection("links");

if (Meteor.isServer) {
    Meteor.publish("linksPub", function () {
        return LinksDB.find({ userId: this.userId });
    });
}

Meteor.methods({
    linksInsert(url) {
        if (!this.userId)
            throw new Meteor.Error("not-authorized");

        if (!url)
            throw new Meteor.Error("linksInsert takes a URL argument");

        new SimpleSchema({
            url: {
                label: "Your link",
                type: String,
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        LinksDB.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId
        });
    }
});

