'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";
import { toast } from 'react-toastify';
import { mainContext } from '@/context/mainContext';
import Link from 'next/link';

import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';


export default function Addpost() {
    const route = useRouter();
    const { session } = useContext(mainContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [loading, setLoading] = useState(false);

    // get value from input
    function changeTitle(e) {
        setTitle(e.target.value);
    }
    function changeContent(e) {
        setContent(e.target.value);
    }
    function changeImageLink(e) {
        setImageLink(e.target.value);
    }

    // cerate post
    async function createPost() {
        setLoading(true);
        const { error, status } = await supabase
            .from(session?.user?.id)
            .insert({
                title: title,
                content: content,
                image_url: imageLink
            })
        if (status === 201) {
            toast.success('با موفقیت ساخته شد')
            route.push('/dashboard/posts')
            setLoading(false);
        } else {
            toast.error('مشکلی رخ داد');
            console.log(error.message)
            setLoading(false);
        }
    }

    return (
        <>
            <Grid
                md={10}
                xs={12}
                style={{
                    margin: 'auto',
                    placeContent: 'center',
                    placeItems: 'center',
                    minHeight: '90vh'
                }}
            >
                <Breadcrumbs aria-label="breadcrumb" style={{ margin: '1rem' }}>
                    <Link underline="hover" color="inherit" href="/">
                        خانه
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/dashboard"
                    >
                        داشبورد
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>افزودن پست</Typography>
                </Breadcrumbs>

                < Box
                    boxShadow={4}
                    display={'block'}
                    style={{
                        margin: '1rem',
                        padding: '1rem',
                        borderRadius: '1rem'
                    }}
                >

                    <Typography variant='h6' style={{ marginBlock: '1rem' }} >تیتر:</Typography>
                    <TextField
                        id='inputCreate'
                        multiline
                        fullWidth
                        onChange={changeTitle}
                    />

                    <Typography variant='h6' style={{ marginBlock: '1rem' }} >محتوا:</Typography>
                    <TextField
                        id='inputCreate'
                        multiline
                        fullWidth
                        onChange={changeContent}
                    />
                    <Typography variant='h6' style={{ marginBlock: '1rem' }} >لینک عکس:</Typography>
                    <TextField
                        id='inputCreate'
                        multiline
                        fullWidth
                        onChange={changeImageLink}
                    />
                    <Button
                        type="submit"
                        variant='contained'
                        color="success"
                        size='large'
                        fullWidth
                        style={{
                            padding: '1rem',
                            marginLeft: '1rem',
                            marginBlock: '2rem'
                        }}
                        onClick={createPost}
                    >
                        {loading === true ? <CircularProgress color='inherit' size={'1.6rem'} /> : 'ذخیره'}
                    </Button>
                </Box>
            </Grid>
        </>
    )

}