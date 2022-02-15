import SimpleMDE from "react-simplemde-editor";
import MarkdownView from "react-showdown";
import ReactDOMServer from "react-dom/server";
import "easymde/dist/easymde.min.css";
import { useState, useCallback, useRef } from "react";

/**
 * Allows for markdown editing within posts.
 * @param  {string} initial - The initial text within the markdown.
 * @return {SimpleMDE}     - The updated markdown text
 */
const MarkdownEditor = ({ initial = "" }) => {
    const [value, setValue] = useState(initial);
    const [cursor, setCursor] = useState(0);
    const ref = useRef();

    const onChange = useCallback((value) => {
        setValue(value);
        //Set cursor to where it currently is.
        setCursor(ref.current.selectionStart);
    }, []);

    return (
        <SimpleMDE
            ref={ref}
            value={value}
            name="content"
            id="content"
            onChange={onChange}
            onFocus={(e) => {
                e.target.selectionStart = cursor;
            }}
            options={{
                autofocus: true,
                forceSync: true,
                spellChecker: false,
                toolbar: [
                    "bold",
                    "italic",
                    "|",
                    "unordered-list",
                    "ordered-list",
                ],

                previewRender(text) {
                    return ReactDOMServer.renderToString(
                        <MarkdownView
                            markdown={text}
                            options={{
                                simpleLineBreaks: true,
                                openLinksInNewWindow: true,
                                emoji: true,
                            }}
                        />
                    );
                },
            }}
        />
    );
};

export default MarkdownEditor;
