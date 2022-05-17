import ReactToolTip from "react-tooltip";

const ReactionIcon = ({ reaction }) => {
    const filename = `../reactions/${reaction}.svg`;
    const size = "30px";

    return (
        <div>
            <img data-tip data-for={reaction} src={filename} alt={reaction} height={size} width={size}/>
            <ReactToolTip id={reaction} place="bottom" effect="solid">
                {reaction}
            </ReactToolTip>
        </div>
    );
}

export default ReactionIcon;