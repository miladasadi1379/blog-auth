'use client'
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import KeyIcon from '@mui/icons-material/Key';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from "next/link";

import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-toastify";

export default function Navbar() {
    const route = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [session, setSession] = useState(null)

    // get session
    const getSession = useCallback(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    })
    // get data
    useEffect(() => {
        getSession();
    }, [])


    // handle change password
    async function requestChangePassword() {
        const { data, error } = await supabase.auth
            .resetPasswordForEmail(session?.user?.email)
        if (error) {
            toast.error('مشکلی رخ داد')
            console.log(error.message)
        } else if (data) {
            toast.success('لطفا ایمیل خود را چک نمایید')
        }
    }

    // handle signout
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error('موفقیت آمیز نبود')
            console.log(error)
        }
        route.push('/login')
    }

    // handle open & close menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid xs={12}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            style={{ marginInline: '1rem' }}
                        >
                            <Link href={'/'}>خانه</Link>
                        </Typography>
                        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 0, marginLeft: '1rem' }}>
                            {
                                !session ? (
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ flexGrow: 1 }}
                                        style={{ marginInline: '1rem' }}
                                    >
                                        <Link href={'/login'}>ورود</Link>
                                    </Typography>
                                ) : (
                                    <Box style={{ marginLeft: '1rem' }}>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            color="inherit"
                                        >
                                            <MenuIcon />
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem style={{ padding: '1rem' }}>
                                                <Typography color={'inherit'}>
                                                    <Link href={'/dashboard'}
                                                        style={{ display: 'flex' }}
                                                    >
                                                        <DashboardIcon />پروفایل</Link>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem style={{ padding: '1rem' }}>
                                                <Typography color={'inherit'}>
                                                    <Link href={'/dashboard/posts'}
                                                        style={{ display: 'flex' }}
                                                    >
                                                        <WysiwygIcon />پست ها</Link>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem style={{ padding: '1rem' }}>
                                                <Button
                                                    onClick={requestChangePassword}
                                                    color="inherit"
                                                    style={{ background: "none" }}

                                                >
                                                    <Typography
                                                        color={'inherit'}
                                                        style={{ display: "flex" }}

                                                    >
                                                        <KeyIcon />تغییر رمز
                                                    </Typography>
                                                </Button>

                                            </MenuItem>
                                            <MenuItem
                                                onClick={signOut}
                                                style={{ color: 'InfoText', padding: '1rem' }}
                                            >
                                                <Typography color={'error'} style={{ display: 'flex' }}>
                                                    <ExitToAppIcon />خروج
                                                </Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                )
                            }

                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
    )
}