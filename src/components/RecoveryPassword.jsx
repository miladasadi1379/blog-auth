import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { Field } from 'formik';
import MailIcon from '@mui/icons-material/Mail';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'react-toastify';

export default function RecoveryPassword() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false)
    const [recoveryEmail, setRecoveryEmail] = useState('')

    function handleRecoveryEmail(e) {
        setRecoveryEmail(e.target.value);
    }
    // recoveryPassword
    async function recoveryPass() {
        setLoading(true);
        const { data, error } = await supabase.auth
            .resetPasswordForEmail(recoveryEmail)
        if (error) {
            toast.error('مشکلی رخ داد')
            console.log(error.message)
            setLoading(false);
        } else {
            toast('ایمیل خود را چک نمایید')
            setLoading(false);
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} color='warning'>
                <Typography>
                    فراموشی رمز عبور؟
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
                        <RecyclingIcon
                            color='black'
                            fontSize='large'
                        />
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color={'white'}
                    >
                        ایمیل خود را وارد نمایید
                    </Typography>
                    <label htmlFor="email">
                        <Typography
                            variant='h5'
                            textAlign={'right'}
                            style={{ marginBottom: '-1rem' }}
                        >
                            <MailIcon />
                        </Typography>
                    </label>
                    <Field
                        className="icon-email"
                        name="emailrecovery"
                        type="email"
                        placeholder="ایمیل"
                        onKeyUp={handleRecoveryEmail}

                    />
                    <Button
                        type="submit"
                        variant='contained'
                        size='large'
                        style={{
                            padding: '1rem',
                            marginBlock: '1rem',
                            minWidth: '15rem'
                        }}
                        onClick={recoveryPass}
                        disabled={recoveryEmail.includes('@' && '.com') ? false : true}
                    >
                        {loading === true ?
                            <CircularProgress color='inherit' size={'1.6rem'} /> : 'ارسال'}
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}