import EmptyPic from '../Assets/empty.png';
import { Card, Typography } from "@material-ui/core";


export const Empty = () => {
    return( 
    <Card style={{boxShadow:"none !important",padding:"15px 25px"}}>
        <Typography>داده ای  ثبت نشده است</Typography>
        <img src={EmptyPic} alt="Empty" width="100%" style={{maxWidth:"200px"}}/>
    </Card>                
    );
}