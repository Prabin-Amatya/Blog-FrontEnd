import { screen, render } from "@testing-library/react";
import Toggalable from "./Toggalable"
import userEvent from "@testing-library/user-event";


describe("<Togglable/>",() => {
    let container

    beforeEach(()=>{
        container = render(
            <Toggalable buttonLabel='show'>
                <div className="testDiv">
                    test content
                </div>
            </Toggalable>
        ).container
    })

    test("Renders children", async ()=>{
        const div = await screen.findAllByText("test content")
        expect(div).toBeDefined()
    })

    test("Children are not shown at first", ()=>{
        const div = container.querySelector(".toggableContent")
        expect(div).toHaveStyle("display:none")
    })

    test("Children are shown after button click", async ()=>{
        const user = userEvent.setup()
        const button = screen.getByText("show")
        await user.click(button)
        
        const div = container.querySelector(".toggableContent")
        expect(div).not.toHaveStyle("display:none")
    })
})