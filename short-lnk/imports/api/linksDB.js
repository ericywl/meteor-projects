import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "simpl-schema/dist/SimpleSchema";
import shortid from "shortid";

export const LinksDB = new Mongo.Collection("links");

if (Meteor.isServer) {
    Meteor.publish("linksPub", function() {
        return LinksDB.find({ userId: this.userId });
    });
}

Meteor.methods({
    linksInsert(url) {
        if (!this.userId) throw new Meteor.Error("not-authorized");

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
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },

    linksSetVisibility(_id, visible) {
        if (!this.userId) throw new Meteor.Error("not-authorized");

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });

        LinksDB.update({ _id, userId: this.userId }, { $set: { visible } });
    },

    linksTrackVisit(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });

        LinksDB.update(
            { _id },
            {
                $set: { lastVisitedAt: new Date().getTime() },
                $inc: { visitedCount: 1 }
            }
        );
    }
});
