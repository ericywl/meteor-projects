import React from "react";
import expect from "expect";
import moment from "moment";
import { mount } from "enzyme";

import { NoteList } from "./NoteList";
import "../startup/test-setup";
import "../startup/simpl-schema-config";

const notes = [
    {
        _id: "noteId1",
        title: "My stupid title",
        body: "",
        updatedAt: 123123421,
        userId: "userId1"
    },
    {
        _id: "noteId2",
        title: "",
        body: "Mamamia",
        updatedAt: 18532342,
        userId: "userId2"
    }
];

if (Meteor.isClient) {
    describe("NoteList", function() {
        it("should render NoteListItem for each note", function() {
            const wrapper = mount(<NoteList notes={notes} />);

            expect(wrapper.find("NoteListItem").length).toBe(2);
            expect(wrapper.find("NoteListEmptyItem").length).toBe(0);
        });

        it("should render NoteListEmptyItem if no notes", function() {
            const wrapper = mount(<NoteList notes={[]} />);

            expect(wrapper.find("NoteListItem").length).toBe(0);
            expect(wrapper.find("NoteListEmptyItem").length).toBe(1);
        });
    });
}
