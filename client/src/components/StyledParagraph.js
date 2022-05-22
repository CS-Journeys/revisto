import { Markup } from "react-render-markup";
import remarkBreaks from "remark-breaks";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { useAsync } from "react-async";
import remarkParse from "remark-parse-no-trim";

/**
 * The list of markdown tokenizers to render
 *
 * For the complete list of possible tokenizers, see
 * https://www.npmjs.com/package/remark-parse-no-trim
 */
const TOKENIZERS = [
    "paragraph",
    "emphasis",
    "strong",
    "deletion",
    "blankLine",
    "break",
    "escape",
    "text",
];

/**
 * Enables the given list of tokenizers, disables all others.
 * Use the remark-parse-no-trim documentation to help you understand this function.
 *
 * @param {[String]} tokenizers the list of tokenizers to enable
 */
const allowTokenizers = (tokenizers) => {
    // Set block tokenizers
    Object.keys(remarkParse.Parser.prototype.blockTokenizers).forEach(
        (tokenizer) => {
            if (!tokenizers.includes(tokenizer)) {
                remarkParse.Parser.prototype.blockTokenizers[tokenizer] = () =>
                    true;
            }
        }
    );

    // Set inline tokenizers
    remarkParse.Parser.prototype.inlineMethods =
        remarkParse.Parser.prototype.inlineMethods.filter((tokenizer) =>
            tokenizers.includes(tokenizer)
        );
};

// Set the allowed tokenizers when the file is first loaded
allowTokenizers(TOKENIZERS);

/**
 * Converts markdown to HTML with remark (https://github.com/remarkjs/remark).
 * Uses the remark-breaks plugin to convert new lines into <br> tags.
 * Note that double new lines still create <p></p> tags.
 *
 * @param {String} str the markdown text to parse into HTML
 * @returns {String} the resulting HTML data
 */
const markdownToHTML = async ({ str }) => {
    const res = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(str);
    return res;
};

/**
 * Renders a paragraph with a single space at the end, instead of having
 * the default bottom margin which is greater than a single space.
 *
 * @param {JSX.Element} children the children to render
 * @returns {JSX.Element}
 */
const SingleSpaceParagraph = ({ children }) => {
    return (
        <>
            <p style={{ margin: 0 }}>{children}</p>
            <br />
        </>
    );
};

/**
 * Converts the paragraph's content from markdown to HTML, then renders the
 * HTML with the Markup class (see https://www.npmjs.com/package/react-render-markup).
 *
 * @param {String} children the content to be rendered
 * @returns {JSX.Element} the styled paragraph
 */
const StyledParagraph = ({ children, className }) => {
    const { data } = useAsync({ promiseFn: markdownToHTML, str: children });

    return (
        <>
            {data ? (
                // if the HTML data is loaded, render the styled paragraph
                <Markup
                    className={className}
                    markup={data.value}
                    replace={{ p: SingleSpaceParagraph }}
                />
            ) : (
                // otherwise, render the regular paragraph
                <p
                    className={className}
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                    {children}
                </p>
            )}
        </>
    );
};

export default StyledParagraph;
