import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import moment from "moment";

export const NotesDB = new Mongo.Collection("notes");

if (Meteor.isServer) {
    Meteor.publish("notes", function() {
        return NotesDB.find({ userId: this.userId });
    });
}

Meteor.methods({
    notesInsert() {
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        return NotesDB.insert({
            title: "",
            body: "",
            userId: this.userId,
            updatedAt: moment().valueOf()
        });
    },

    notesRemove(_id) {
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });

        NotesDB.remove({ _id, userId: this.userId });
    },

    notesUpdate(_id, updates) {
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            title: {
                type: String,
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
        }).validate({
            _id,
            ...updates
        });

        NotesDB.update(
            { _id, userId: this.userId },
            {
                $set: {
                    ...updates,
                    updatedAt: moment().valueOf()
                }
            }
        );
    }
});
