'use client'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";
import { toast } from 'react-toastify';
import { mainContext } from '@/context/mainContext';

import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import ConfirmDelete from '@/components/ConfirmDelete';

export default function Post({ params }) {
    const route = useRouter()
    const { session } = useContext(mainContext)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    function changeTitle(e) {
        setTitle(e.target.value);
    }
    function changeContent(e) {
        setContent(e.target.value);
    }
    function changeImageLink(e) {
        setImageLink(e.target.value);
    }

    // get data 
    useEffect(() => {
        async function getPost() {
            const { data, err, status } = await supabase
                .from(session?.user?.id)
                .select(`id,title,content,image_url`)
                .eq('id', params.slug)

            if (err) {
                toast.error("مشکلی پیش آمد")
                console.log(err.message)
            } else if (status === 200) {
                setContent(data[0].content)
                setTitle(data[0].title)
                setImageLink(data[0].image_url)
            }
        }
        getPost()
        setLoading(false);
    }, [session])

    // show data 
    function showData() {
        return (
            <>
                {
                    !session ? route.push('/login') : (
                        <>
                            <Grid
                                md={12}
                                xs={12}
                                style={{ marginInline: '1rem' }}
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
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        href="/dashboard"
                                    >
                                        پست های من
                                    </Link>
                                    <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
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
                                        id="outlined-multiline-flexible"
                                        multiline
                                        fullWidth
                                        margin='dense'
                                        defaultValue={title}
                                        onChange={changeTitle}
                                    />

                                    <Typography variant='h6' style={{ marginBlock: '1rem' }} >محتوا:</Typography>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        fullWidth
                                        margin='dense'
                                        defaultValue={content}
                                        onChange={changeContent}
                                    />
                                    <Typography variant='h6' style={{ marginBlock: '1rem' }} >لینک عکس:</Typography>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        fullWidth
                                        margin='dense'
                                        defaultValue={imageLink}
                                        onChange={changeImageLink}
                                    />
                                    <Button
                                        type="submit"
                                        variant='contained'
                                        color="success"
                                        size='large'
                                        fullWidth
                                        style={{ padding: '1rem', marginLeft: '1rem', marginBlock: '1rem' }}
                                        onClick={updateData}
                                    >
                                        {loadingUpdate === true ? <CircularProgress color='inherit' size={'1.6rem'} /> : 'ذخیره'}
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant='contained'
                                        color="error"
                                        size='large'
                                        fullWidth
                                        style={{ padding: '1rem', marginLeft: '1rem', marginBlock: '1rem' }}
                                    >
                                        <ConfirmDelete />
                                    </Button>
                                </Box>
                            </Grid>
                        </>
                    )
                }
            </>
        )
    }

    // update data
    async function updateData() {
        setLoadingUpdate(true);
        const { error, status } = await supabase
            .from(session?.user?.id)
            .update({
                title: title,
                content: content,
                image_url: imageLink
            })
            .eq('id', params.slug)
            .select()
        if (error) {
            toast.error('مشکلی پیش آمد')
            setLoadingUpdate(false);
            console.log(error.message)
        } else if (status === 200) {
            setLoadingUpdate(false);
            toast.success('با موفقیت انجام شد')
            route.push('/dashboard/posts')
        }
    }


    return (
        <Grid
            md={10}
            xs={11}
            container
            style={{
                display: "block",
                placeContent: 'center',
                placeItems: 'center',
                minHeight: '100vh',
                margin: 'auto'
            }}

        >
            {
                loading === true ? (
                    <CircularProgress
                        size={"5rem"}
                        style={{
                            margin: 'auto',
                            display: "block",
                            placeContent: 'center',
                            placeItems: 'center',
                            minHeight: '90vh',
                        }}
                        color="inherit"
                    />
                ) :
                    showData()
            }
        </Grid>
    )
}