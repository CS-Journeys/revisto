import { Markup } from "react-render-markup";
import remarkBreaks from "remark-breaks";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { useAsync } from "react-async";
import remarkParse from "remark-parse-no-trim";

/**
 * TODO: optimize this file!
 */

const TOKENIZERS = [
    "paragraph",
    "emphasis",
    "break",
    "strong",
    "blankLine",
    "escape",
    "text",
    "deletion",
];

const allowTokenizers = (tokenizers) => {
    Object.keys(remarkParse.Parser.prototype.blockTokenizers).forEach(
        (tokenizer) => {
            if (!tokenizers.includes(tokenizer)) {
                remarkParse.Parser.prototype.blockTokenizers[tokenizer] = () =>
                    true;
            }
        }
    );

    remarkParse.Parser.prototype.inlineMethods =
        remarkParse.Parser.prototype.inlineMethods.filter((tokenizer) =>
            tokenizers.includes(tokenizer)
        );
};

const markdownToHTML = async ({ str }) => {
    allowTokenizers(TOKENIZERS);
    const res = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(str);
    return res;
};

const NoSpaceParagraph = ({ children }) => {
    return (
        <>
            <p style={{ margin: 0 }}>{children}</p>
            <br />
        </>
    );
};

const StyledParagraph = ({ content, className }) => {
    const { data } = useAsync({ promiseFn: markdownToHTML, str: content });

    return (
        <>
            {data ? (
                <Markup markup={data.value} replace={{ p: NoSpaceParagraph }} />
            ) : (
                <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {content}
                </p>
            )}
        </>
    );
};

export default StyledParagraph;
