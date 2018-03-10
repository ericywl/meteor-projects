import React from "react";
import expect from "expect";
import moment from "moment";
import { mount } from "enzyme";

import { NoteListHeader } from "./NoteListHeader";
import { notes } from "../../fixtures/fixtures";

if (Meteor.isClient) {
    describe("NoteListHeader", function() {
        let meteorCall;
        let session;

        beforeEach(function() {
            meteorCall = expect.createSpy();
            session = {
                set: expect.createSpy()
            };
        });

        it("should call notesInsert with button", function() {
            const wrapper = mount(
                <NoteListHeader meteorCall={meteorCall} session={session} />
            );

            wrapper.find("button").simulate("click");
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

            expect(meteorCall.calls[0].arguments[0]).toBe("notesInsert");
            expect(session.set).toHaveBeenCalledWith(
                "selectedNoteId",
                notes[0]._id
            );
        });

        it("should not set session if error", function() {
            const reason = "Something went wrong!";
            const wrapper = mount(
                <NoteListHeader meteorCall={meteorCall} session={session} />
            );

            wrapper.find("button").simulate("click");
            meteorCall.calls[0].arguments[1]({ reason });

            expect(meteorCall.calls[0].arguments[0]).toBe("notesInsert");
            expect(session.set).toNotHaveBeenCalled();
        });
    });
}
