'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import ShowTime from '@/components/ShowTime';
import Link from 'next/link';

import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // give data
  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from('3ee91358-24e7-4d4c-8820-e7d08edcb1b2')
        .select(`id,title,created_at,like,eye,dislike`)
        .order('created_at', { ascending: false })
      if (error) {
        toast.error('مشکلی رخ داد')
        console.log(error.message)
      } else if (data) {
        setData(data);
      }
    }
    getData();
    setLoading(false);
  }, [])

  // show data
  function showData() {
    return (
      <>
        {
          data?.map((item, key) => (
            <Link href={`/${item.id}`}>
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
                display: "flex",
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
  );
}
