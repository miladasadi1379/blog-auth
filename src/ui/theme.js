'use client';
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
    typography: {
        fontFamily: 'BYekan'
    },
    overrides: {
        MuiInput: {
            input: {
                "&::placeholder": {
                    color: "red"
                },
                color: "blue", // if you also want to change the color of the input, this is the prop you'd use
            }
        },
        MuiSpeedDialAction: {
            staticTooltipLabel: {
                backgroundColor: 'red',
                width: 150,
            },
        },
    }
});


export default theme;
