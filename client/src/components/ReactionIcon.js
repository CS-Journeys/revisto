import ReactToolTip from "react-tooltip";

const ReactionIcon = ({ reaction }) => {
    const filename = `../icons/${reaction}.svg`;
    const size = "30px";

    return (
        <div>
            <img data-tip data-for={reaction} src={filename} alt={reaction} className="reaction"/>
            <ReactToolTip id={reaction} place="bottom" effect="solid">
                {reaction}
            </ReactToolTip>
        </div>
    );
}

export default ReactionIcon;