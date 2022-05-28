import ReactMarkdown from 'react-markdown';

const StyledParagraph = ({content, className}) => {
    return (
        <ReactMarkdown disallowedElements={["a", "h1", "h2"]} 
            className={className} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                
            {content}
        </ReactMarkdown>
    )
}

export default StyledParagraph;