import EmptyPic from '../Assets/empty.png';
import { Card, Typography } from "@material-ui/core";


export const Empty = () => {
    return( 
    <Card style={{boxShadow:"none !important",padding:"15px 25px"}}>
        <Typography>داده ای برای امروز ثبت نشده است</Typography>
        <img src={EmptyPic} alt="Empty" width="200px"/>
    </Card>                
    );
}