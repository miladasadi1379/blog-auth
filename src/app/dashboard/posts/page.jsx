'use client'
import { useState, useEffect, useContext, useCallback } from 'react'
import { supabase } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { mainContext } from '@/context/mainContext';
import ShowTime from '@/components/ShowTime';
import Link from 'next/link';

import { Box, Button, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Loading from './loading';


export default function AdminPosts({ params }) {
    const route = useRouter()
    const { session } = useContext(mainContext)

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    // get data
    const getPosts = useCallback(async () => {
        const { data, err, status } = await supabase
            .from(session?.user?.id)
            .select(`id,created_at,title,like,dislike,eye`)
            .order('created_at', { ascending: false })

        if (err) {
            toast.error("مشکلی پیش آمد")
            console.log(err.message)
        } else if (status === 200) {
            setPosts(data)
        }
    })
    useEffect(() => {
        getPosts()
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
                                container
                                style={{ marginTop: '1rem' }}
                            >
                                <Grid
                                    xs={8}
                                    sm={9}
                                    md={5}
                                    textAlign={'right'}
                                >

                                    <Breadcrumbs
                                        aria-label="breadcrumb"
                                        style={{ marginInline: '1rem' }}
                                    >
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
                                        <Typography
                                            sx={{ color: 'text.primary' }}
                                        >پست های من</Typography>
                                    </Breadcrumbs>

                                </Grid>
                                <Grid
                                    md={6}
                                    textAlign={'left'}
                                    style={{
                                        marginInline: '2rem',
                                        placeItems: 'end',
                                        display: 'flex',
                                        placeContent: 'end'
                                    }}
                                >
                                    <Link href={'/dashboard/addpost'}>
                                        <Button
                                            fullWidth
                                            color='success'
                                            variant='contained'
                                            style={{ padding: '.5rem' }}
                                        >افزودن پست</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            {
                                posts?.map((item, key) => (
                                    <Link href={`/dashboard/posts/${item.id}`}>
                                        < Box
                                            key={key}
                                            boxShadow={4}
                                            display={'block'}
                                            style={{
                                                margin: '1rem',
                                                padding: '1rem',
                                                borderRadius: '1rem'
                                            }}

                                        >
                                            <Typography variant='h5'>{item.title}</Typography>
                                            <Grid container>
                                                <Grid md={6}>
                                                    <ShowTime time={item.created_at} />
                                                </Grid>
                                                <Grid
                                                    xs={10}
                                                    sm={11}
                                                    md={6}
                                                    textAlign={'left'} style={{ display: 'inline-flex', placeContent: 'end' }}
                                                >
                                                    <Typography variant='caption'
                                                        style={{
                                                            display: 'flex',
                                                            fontSize: '14px',
                                                            placeContent: 'end',
                                                            marginInline: '1rem'
                                                        }}
                                                    >
                                                        <ThumbUpIcon fontSize='small' />{item.like}{` `}
                                                    </Typography>
                                                    <Typography variant='caption'
                                                        style={{
                                                            display: 'flex',
                                                            fontSize: '14px',
                                                            placeContent: 'end',
                                                            marginInline: '1rem'
                                                        }}
                                                    >
                                                        <ThumbDownIcon fontSize='small' color='error' />{item.dislike}{` `}
                                                    </Typography>
                                                    <Typography variant='caption'
                                                        style={{
                                                            display: 'flex',
                                                            fontSize: '14px',
                                                            placeContent: 'end',
                                                            marginInline: '1rem'
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize='small' />{item.eye}{` `}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Link>

                                ))
                            }
                        </>
                    )
                }

            </>
        )
    }

    return (
        <>
            <Grid
                md={10}
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
                        <Loading
                            size={"5rem"}
                            color="inherit"
                        />
                    ) :
                        showData()
                }
            </Grid>
        </>
    )

}
