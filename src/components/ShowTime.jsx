import { parseISO, formatDistanceToNow } from "date-fns-jalali";
import { Typography } from "@mui/material";

const ShowTime = ({ time }) => {
    let timeAgo = '';
    let date = parseISO(time);
    let timeToPersian = formatDistanceToNow(date);
    timeAgo = `${timeToPersian} قبل `;
    return (
        <Typography variant={'caption'} >{timeAgo}</Typography>
    )
};
export default ShowTime;
