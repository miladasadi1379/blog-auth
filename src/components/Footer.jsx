import Grid from "@mui/material/Unstable_Grid2";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import { GitHub } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Grid container
            display={'flex'}
            style={{
                minWidth: '100%',
                backgroundColor: 'black'
            }}
            boxShadow={6}
            bgcolor={'black'}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="relative" color="transparent" >
                    <Toolbar>
                        <Grid
                            container
                            xs={5}
                            style={{ placeContent: 'end' }}
                        >
                            <Grid
                                xs={2}
                            >
                                <a href='https://www.github.com/miladasadi1379' target='_blank' rel='noopener noreferre'>
                                    <GitHub className="socialmedia" style={{ color: 'white' }} />
                                </a>
                            </Grid>
                            <Grid xs={2}>
                                <a href='https://t.me/the_logic_life' target='_blank' rel='noopener noreferre'>
                                    <TelegramIcon className="socialmedia" style={{ color: 'white' }} />
                                </a>
                            </Grid>
                            <Grid xs={2}>
                                <a href='https://twitter.com/miladasadi1379' target='_blank' rel='noopener noreferre'>
                                    <XIcon className="socialmedia" style={{ color: 'white' }} />
                                </a>
                            </Grid>
                            <Grid xs={2} style={{ marginLeft: '3rem' }}>
                                <a href='https://www.linkedin.com/in/milad-asadi-47b994302/' target='_blank'
                                    rel='noopener noreferre'>
                                    <LinkedInIcon className="socialmedia" style={{ color: 'white' }} />
                                </a>
                            </Grid>
                        </Grid>
                        <Grid
                            xs={6}
                        >
                            <Typography
                                color={'white'}
                                variant={'body1'}
                                textAlign={'left'}
                            >
                                میلاد اسعدی هستم عاشق برنامه نویسی❤️
                            </Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>

        </Grid>
    )
}