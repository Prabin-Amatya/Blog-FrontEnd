import { screen, render } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

test("<BlogForm/> updates parent state and calls onsubmit", async ()=>{
    const user = userEvent.setup()
    const addUpdateBlog = vi.fn()

    render(<BlogForm addUpdateBlog={ addUpdateBlog }/>)

    const title = screen.getByLabelText("Title:")
    const author = screen.getByLabelText("Author:")
    const url = screen.getByLabelText("Url:")
    const likes = screen.getByLabelText("Likes:")
    const button = screen.getByText("Save")


    await user.type(title, "test")
    await user.type(author, "tester")
    await user.type(url, "testUrl")
    await user.type(likes, "0")
    await user.click(button)

    expect(addUpdateBlog.mock.calls).toHaveLength(1)
    expect(addUpdateBlog.mock.calls[0][0].title).toBe("test")
    expect(addUpdateBlog.mock.calls[0][0].author).toBe("tester")
    expect(addUpdateBlog.mock.calls[0][0].url).toBe("testUrl")
    expect(addUpdateBlog.mock.calls[0][0].likes).toBe("00")
})