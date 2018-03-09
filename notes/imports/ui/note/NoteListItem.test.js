import React from "react";
import expect from "expect";
import { mount } from "enzyme";

import "../../startup/test-setup";
import "../../startup/simpl-schema-config";
import { notes } from "../../fixtures/fixtures";
import { NoteListItem } from "./NoteListItem";

if (Meteor.isClient) {
    describe("NoteListItem", function() {
        let session;

        beforeEach(() => {
            session = {
                set: expect.createSpy()
            };
        });

        it("should render the title and timestamp", function() {
            const formattedTime = "09/03/2018";
            const wrapper = mount(
                <NoteListItem note={notes[0]} session={session} />
            );

            expect(wrapper.find("h5").text()).toBe(notes[0].title);
            expect(wrapper.find("p").text()).toBe(formattedTime);
        });

        it("should render default text if no title given", function() {
            const formattedTime = "09/03/2018";
            const wrapper = mount(
                <NoteListItem note={notes[1]} session={session} />
            );

            expect(wrapper.find("h5").text()).toBe("Untitled note");
            expect(wrapper.find("p").text()).toBe(formattedTime);
        });

        it("should call set on click", function() {
            const wrapper = mount(
                <NoteListItem note={notes[0]} session={session} />
            );

            wrapper.find("div").simulate("click");
            expect(session.set).toHaveBeenCalledWith(
                "selectedNoteId",
                notes[0]._id
            );
        });
    });
}
