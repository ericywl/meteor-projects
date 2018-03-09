import React from "react";
import expect from "expect";
import { mount } from "enzyme";

import { Editor } from "./Editor";
import { notes } from "../../fixtures/fixtures";

if (Meteor.isClient) {
    describe("Editor", function() {
        let call, history;

        beforeEach(() => {
            call = expect.createSpy();
            history = {
                replace: expect.createSpy()
            };
        });

        it("should render pick note message", function() {
            const wrapper = mount(<Editor call={call} history={history} />);
            expect(wrapper.find("p").text()).toBe("Pick or create a note.");
        });

        it("should render note not found message", function() {
            const wrapper = mount(
                <Editor
                    selectedNoteId={"invalidId"}
                    call={call}
                    history={history}
                />
            );
            expect(wrapper.find("p").text()).toBe("Note not found.");
        });

        it("should call notesRemove if click delete", function() {
            const wrapper = mount(
                <Editor
                    selectedNoteId={notes[0]._id}
                    note={notes[0]}
                    call={call}
                    history={history}
                />
            );

            wrapper.find("button").simulate("click");
            expect(call).toHaveBeenCalledWith("notesRemove", notes[0]._id);
            expect(history.replace).toHaveBeenCalledWith("/dashboard");
        });
    });
}
