import React from "react";
import expect from "expect";
import moment from "moment";
import { mount } from "enzyme";

import { NoteListHeader } from "./NoteListHeader";
import "../../startup/test-setup";
import "../../startup/simpl-schema-config";

if (Meteor.isClient) {
    describe("NoteListHeader", function() {
        it("should call notesInsert with button", function() {
            const spy = expect.createSpy();
            const wrapper = mount(<NoteListHeader meteorCall={spy} />);

            wrapper.find("button").simulate("click");
            expect(spy).toHaveBeenCalledWith("notesInsert");
        });
    });
}
