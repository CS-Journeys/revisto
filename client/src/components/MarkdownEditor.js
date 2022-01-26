import SimpleMDE from "react-simplemde-editor";
import MarkdownView from "react-showdown";
import ReactDOMServer from "react-dom/server";
import "easymde/dist/easymde.min.css";

const MarkdownEditor = () => {
  return (
    <SimpleMDE
      name="content"
      id="content"
      options={{
        forceSync: true,
        spellChecker: false,
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "unordered-list",
          "ordered-list",
          "preview",
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
}

export default MarkdownEditor;