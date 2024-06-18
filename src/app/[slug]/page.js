'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import Link from 'next/link';
import Image from "next/image";
import { Box, Button, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function Pots({ params }) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [like, setLike] = useState('')
    const [dislike, setDislike] = useState('')
    const [eye, setEye] = useState('')
    const [imageLink, setImageLink] = useState('')

    const [loading, setLoading] = useState(true);

    const [clickCount, setClickCount] = useState(0)
    const [allowClick, setAllowClick] = useState(null)
    const [bgColorLike, setBgColorLike] = useState('')
    const [bgColorDislike, setBgColorDislike] = useState('')
    // wheat
    // give data
    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                .select()
                .eq('id', params.slug)
            if (error) {
                toast.error('مشکلی رخ داد')
                console.log(error.message)
            } else if (data) {
                setContent(data[0].content)
                setTitle(data[0].title)
                setLike(data[0].like)
                setDislike(data[0].dislike)
                setEye(data[0].eye)
                setImageLink(data[0].image_url)
            }
        }

        getData();
        setLoading(false);
    }, [])

    // update like & dislike 
    async function updateLike() {
        if (allowClick === null) {

            if (clickCount === 0) {
                const { error, data } = await supabase
                    .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                    .upsert({
                        id: params.slug,
                        like: like + 1
                    })
                    .select()
                if (!error) {
                    setLike(data?.[0]?.like)
                }
                setClickCount(clickCount + 1);
                setAllowClick('like');
                setBgColorLike('wheat')

            } else if (clickCount === 1) {
                const { error, data } = await supabase
                    .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                    .update({
                        id: params.slug,
                        like: like - 1
                    })
                    .select()
                if (!error) {
                    setLike(data?.[0]?.like)
                }
                setClickCount(clickCount - 1);
                setAllowClick(null);
                setBgColorLike('')
            }

        }

        else if (allowClick === "like" && clickCount === 1) {
            const { error, data } = await supabase
                .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                .upsert({
                    id: params.slug,
                    like: like - 1
                })
                .select()
            if (!error) {
                setLike(data?.[0]?.like)
            }
            setClickCount(clickCount - 1);
            setAllowClick(null);
            setBgColorLike('')
        }
    }

    async function updateDisLike() {
        if (allowClick === null) {

            if (clickCount === 0) {
                const { error, data } = await supabase
                    .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                    .upsert({
                        id: params.slug,
                        dislike: dislike + 1
                    })
                    .select()
                if (!error) {
                    setDislike(data?.[0]?.dislike)
                }
                setClickCount(clickCount + 1);
                setAllowClick('dislike');
                setBgColorDislike('wheat')
            }
            else if (clickCount === 1) {
                const { error, data } = await supabase
                    .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                    .upsert({
                        id: params.slug,
                        dislike: dislike - 1
                    })
                    .select()
                if (!error) {
                    setDislike(data?.[0]?.dislike)
                }
                setClickCount(clickCount - 1);
                setAllowClick(null);
                setBgColorDislike('')
            }

        }

        else if (allowClick === 'dislike' && clickCount === 1) {
            const { error, data } = await supabase
                .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
                .upsert({
                    id: params.slug,
                    dislike: dislike - 1
                })
                .select()
            if (!error) {
                setDislike(data?.[0]?.dislike)
            }
            setClickCount(clickCount - 1);
            setAllowClick(null);
            setBgColorDislike('')
        }
    }


    // show data
    function showData() {
        return (
            <>
                <Grid container>
                    < Box
                        boxShadow={4}
                        display={'block'}
                        style={{
                            margin: '1rem',
                            padding: '1rem',
                            borderRadius: '1rem'
                        }}

                    >
                        <Grid container>

                            <Grid md={7}>
                                <Typography variant='h5'>{title}</Typography>
                            </Grid>
                            <Grid md={4}>
                                <Image
                                    src={imageLink}
                                    width={300}
                                    height={300}
                                    style={{ borderRadius: '2rem' }}
                                />
                            </Grid>
                        </Grid>
                        <Typography
                            variant='body1'
                            textAlign={"justify"}
                            style={{ marginBlock: '1rem' }}
                        >
                            {content}
                        </Typography>

                        <Grid
                            md={12}
                            textAlign={'left'} style={{ display: 'flex', placeContent: 'end' }}
                        >
                            <Button
                                color="inherit"
                                onClick={updateLike}
                                style={{ backgroundColor: bgColorLike }}
                            >
                                <Typography variant='caption'
                                    style={{
                                        display: 'flex',
                                        fontSize: '14px',
                                        placeContent: 'end',
                                        marginInline: '1rem'
                                    }}
                                >
                                    <ThumbUpIcon fontSize='small' />{like}{` `}
                                </Typography>
                            </Button>

                            <Button
                                color="inherit"
                                onClick={updateDisLike}
                                style={{ backgroundColor: bgColorDislike }}
                            >
                                <Typography variant='caption'
                                    style={{
                                        display: 'flex',
                                        fontSize: '14px',
                                        placeContent: 'end',
                                        marginInline: '1rem'
                                    }}
                                >
                                    <ThumbDownIcon fontSize='small' color='error' />{dislike}{` `}
                                </Typography>
                            </Button>


                            <Typography variant='caption'
                                style={{
                                    display: 'flex',
                                    fontSize: '14px',
                                    placeContent: 'end',
                                    marginInline: '1rem'
                                }}
                            >
                                <VisibilityIcon fontSize='small' />{eye}{` `}
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>

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
        </>
    )
}