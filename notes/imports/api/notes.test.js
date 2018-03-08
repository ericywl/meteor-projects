import expect from "expect";

import { Notes } from "./notes";

const noteOne = {
    _id: "testNoteId1",
    title: "My Title",
    body: "My body note",
    updatedAt: 0,
    userId: "testUserId1"
};

const noteTwo = {
    _id: "testNoteId2",
    title: "Things to note",
    body: "My new notey note",
    updatedAt: 0,
    userId: "testUserId2"
};

if (Meteor.isServer) {
    describe("notes", function() {
        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        testNoteInsert();
        testNoteRemove();
        testNoteUpdate();
        testPublishNotes();
    });
}

function testNoteInsert() {
    describe("notesInsert", function() {
        it("should insert new note", function() {
            const userId = "testId";
            const _id = Meteor.server.method_handlers.notesInsert.apply({
                userId
            });

            expect(Notes.find({ _id, userId })).toBeTruthy();
        });

        it("should not insert note if unauthenticated", function() {
            expect(() => {
                Meteor.server.method_handlers.notesInsert();
            }).toThrow();
        });
    });
}

function testNoteRemove() {
    describe("notesRemove", function() {
        it("should remove note", function() {
            Meteor.server.method_handlers.notesRemove.apply(
                { userId: noteOne.userId },
                [noteOne._id]
            );

            expect(Notes.findOne({ _id: noteOne._id })).toBeFalsy();
        });

        it("should throw error if unauthenticated", function() {
            expect(() => {
                Meteor.server.method_handlers.notesRemove.apply({}, [
                    noteOne._id
                ]);
            }).toThrow();
        });

        it("should throw error if invalid _id", function() {
            expect(() => {
                Meteor.server.method_handlers.notesRemove.apply({
                    userId: noteOne.userId
                });
            }).toThrow();
        });

        it("should not remove note if user was not creator", function() {
            Meteor.server.method_handlers.notesRemove.apply(
                { userId: "randomUserId" },
                [noteOne._id]
            );

            expect(Notes.findOne({ _id: noteOne._id })).toBeTruthy();
        });
    });
}

function testNoteUpdate() {
    describe("notesUpdate", function() {
        const title = "This is an updated title";

        it("should update note", function() {
            Meteor.server.method_handlers.notesUpdate.apply(
                { userId: noteOne.userId },
                [noteOne._id, { title }]
            );

            const note = Notes.findOne(noteOne._id);
            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toHaveProperty("title", title);
            expect(note).toHaveProperty("body", noteOne.body);
        });

        it("should throw error if unauthenticated", function() {
            expect(() => {
                Meteor.server.method_handlers.notesRemove.apply({}, [
                    noteOne._id
                ]);
            }).toThrow();
        });

        it("should throw error if invalid _id", function() {
            expect(() => {
                Meteor.server.method_handlers.notesUpdate.apply({
                    userId: noteOne.userId
                });
            }).toThrow();
        });

        it("should throw error if extra properties provided", function() {
            expect(() => {
                Meteor.server.method_handlers.notesUpdate.apply(
                    { userId: noteOne.userId },
                    [noteOne._id, { title, extra: "Extra" }]
                );
            }).toThrow();
        });

        it("should not update note if user was not creator", function() {
            Meteor.server.method_handlers.notesUpdate.apply(
                { userId: "randomUserId" },
                [noteOne._id, { title }]
            );

            const note = Notes.findOne(noteOne._id);
            expect(note).toEqual(noteOne);
        });
    });
}

function testPublishNotes() {
    describe("publishNotes", function() {
        it("should return a users notes", function() {
            const res = Meteor.server.publish_handlers.notes.apply({
                userId: noteOne.userId
            });

            const notes = res.fetch();
            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it("should return zero notes for users that has none", function() {
            const res = Meteor.server.publish_handlers.notes.apply({
                userId: "randomUserId"
            });

            const notes = res.fetch();
            expect(notes.length).toBe(0);
        });
    });
}
