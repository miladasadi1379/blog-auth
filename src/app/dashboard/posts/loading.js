'use client'
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {

    return (
        <>
            <Grid
                xs={10}
                style={{
                    display: "block",
                    placeContent: 'center',
                    placeItems: 'center',
                    minHeight: '100vh',
                    margin: 'auto'
                }}
            >
                <Skeleton style={{ marginBlock: '1rem' }} variant="rounded" width={800} height={100} />
                <Skeleton style={{ marginBlock: '1rem' }} variant="rounded" width={800} height={100} />
                <Skeleton style={{ marginBlock: '1rem' }} variant="rounded" width={800} height={100} />
                <Skeleton style={{ marginBlock: '1rem' }} variant="rounded" width={800} height={100} />
            </Grid>
        </>
    )
}