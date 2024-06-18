import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ConfirmDelete() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false)

    // delete post
    async function deletePost() {
        setLoading(true);
        const { data, error } = await supabase
            .from(session?.user?.id)
            .delete()
            .eq('id', params.slug)
            .select()
        if (error) {
            toast.error('مشکلی رخ داد')
            console.log(error.message)
            setLoading(false);

        } else {
            toast.success('با موفقیت حذف شد')
            route.push('/dashboad/posts')
            setLoading(false);

        }
    }

    return (
        <div>
            <Button onClick={handleOpen} color='error'>
                <Typography color={'white'}>
                    حذف
                </Typography>
            </Button>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box id='modal'>
                    <Typography
                        id="modal-modal-icon"
                        variant="h6"
                        component="h2"
                    >
                        <RemoveCircleOutlineIcon
                            color='error'
                            fontSize='large'
                        />
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color={'white'}
                    >
                        ایا میخواهید این پست حذف شود؟؟
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        color={'ActiveBorder'}

                    >
                        در صورت حذف،این پست غیر قابل بازیابی است
                    </Typography>
                    <Button
                        type="submit"
                        variant='contained'
                        color="error"
                        size='large'
                        style={{
                            padding: '1rem',
                            marginBlock: '1rem',
                            minWidth: '15rem'

                        }}
                    >
                        {loading === true ?
                            <CircularProgress color='inherit' size={'1.6rem'} /> : 'حذف'}
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}