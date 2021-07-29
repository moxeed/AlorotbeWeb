import { Grid,Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { GetData } from "../Services/ApiService";
import React from 'react';
import { RankTitle } from "./Components/RankTitle";
import { Reports } from "./Components/Reports";

export const Profile = () => {
    return(
        <Grid container style={{minHeight:"90vh",padding:"12rem 2rem 0 2rem"}} justify="center" alignItems="center">
            <Grid container>
                <Grid container style={{padding:"2rem 5rem"}}>
                    <Grid container item xs={4}>
                        <Grid item xs={12}>
                        <Typography variant="h5" > وضعیت شما  </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RankTitle/>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography >نمودار پیشرفت </Typography>
                        <div style={{background:"#FD7D21",width:"100%",height:"100%"}}></div>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{padding:"5rem"}}>
                    <Reports/>
                </Grid>
            </Grid>
        </Grid>
    );
}