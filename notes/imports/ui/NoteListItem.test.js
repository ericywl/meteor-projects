import React from "react";
import expect from "expect";
import moment from "moment";
import { mount } from "enzyme";

import { NoteListItem } from "./NoteListItem";
import "../startup/test-setup";
import "../startup/simpl-schema-config";

if (Meteor.isClient) {
    describe("NoteListItem", function() {
        it("should render the title and timestamp", function() {
            const note = {
                title: "Me title",
                updatedAt: 1520606724315
            };
            const formattedTime = "09/03/2018";
            const wrapper = mount(<NoteListItem note={note} />);

            expect(wrapper.find("h5").text()).toBe(note.title);
            expect(wrapper.find("p").text()).toBe(formattedTime);
        });

        it("should render default text if no title given", function() {
            const note = {
                title: "",
                updatedAt: 1520606724315
            };
            const formattedTime = "09/03/2018";
            const wrapper = mount(<NoteListItem note={note} />);

            expect(wrapper.find("h5").text()).toBe("Untitled note");
            expect(wrapper.find("p").text()).toBe(formattedTime);
        });
    });
}
