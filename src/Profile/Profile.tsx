import { Grid,Typography } from "@material-ui/core";
import { Process } from "./Components/Process";
import { RankTitle } from "./Components/RankTitle";
import { Reports } from "./Components/Reports";
import { UserInfo } from "./Components/UserInfo";
export const Profile = () => {
    return(
        <Grid container style={{minHeight:"90vh",padding:"10rem 2rem 2rem 2rem"}} justify="center" alignItems="center">
            <Grid container style={{flexWrap:"wrap-reverse"}} item xs={12}  md={10} justify="center" alignItems="center" >
                <Grid container item xs={12} md={5} justify="center" alignItems="center" >
                    <Grid item xs={12}>
                        <Typography variant="h6" >پروفایل شما  </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <UserInfo/>
                    </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <RankTitle/>
                        <Typography >نمودار پیشرفت </Typography>
                        <Process/>
                    </Grid>
                </Grid>
            <Grid item xs={12} md={8} container justify="center" alignItems="center" >
                 <Reports/>
            </Grid>
        </Grid>
    );
}