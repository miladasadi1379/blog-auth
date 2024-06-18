'use client'
import { useState } from 'react'
import Link from 'next/link'
import { google, github } from "@/utils/supabase/oAuth"
import loginImage from '@/assets/login.jpg'
import icon from '@/app/favicon.ico'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';

// mui
import { Button, Divider, Grid, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import GoogleIcon from '@mui/icons-material/Google';
import { GitHub } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress';
import { userSchema } from '@/validation/userValidation'
import RecoveryPassword from '@/components/RecoveryPassword'


export default function LoginPage() {
    const route = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }
    const initialValues = {
        email: email,
        password: password
    }
    async function login(e) {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            toast.error('مشکلی پیش آمد')
            console.log(error.message)
            setLoading(false);

        } else if (data) {
            console.log(data)
            setLoading(false);
            toast.success('موفقیت آمیز بود')
            route.push('/dashboard')
        }

    }


    return (
        <Grid
            container
            style={{
                display: "flex",
                placeContent: 'center',
                placeItems: 'center',
                minHeight: '100vh',
                marginBlock: '2rem'
            }}
        >
            <Grid
                sm={8}
                md={5}
                id="formContent"
                boxShadow={4}
            >

                <Typography
                    textAlign={'center'}
                    style={{
                        marginBlock: '1rem',
                        zIndex: '-1'
                    }}
                >
                    <Image
                        src={icon}
                        width={50}
                        height={50}
                        alt='loginImage'
                        style={{
                            zIndex: '-1'
                        }}
                    />
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={userSchema}
                    onSubmit={login}
                    validateOnMount={true}
                >
                    {({ isSubmitting, values }) => (
                        <Form >

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
                                id="email"
                                name="email"
                                type="text"
                                placeholder="ایمیل"
                                onKeyUp={handleEmail}

                            />
                            <Typography color={'red'} variant='body2'>
                                <ErrorMessage name="email" component="div" />
                            </Typography>

                            <label htmlFor="password">
                                <Typography
                                    variant='h5'
                                    textAlign={'right'}
                                    style={{ marginBottom: '-1rem' }}
                                >
                                    <LockIcon />
                                </Typography>
                            </label>
                            <Field
                                className="icon-pass"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="رمز ورود"
                                onKeyUp={handlePassword}

                            />
                            <Typography color={'red'} variant='body2'>
                                <ErrorMessage name="password" component="div" />
                            </Typography>

                            <Grid container>
                                <Grid md={6} style={{ marginBlock: '.5rem' }}>
                                    <RecoveryPassword
                                        style={{
                                            margin: '1rem',
                                            width: '7rem'
                                        }}
                                    />
                                </Grid>
                                <Grid md={6} style={{ marginBlock: '.5rem' }}>
                                    <Typography
                                        variant='body1'
                                        textAlign={'left'}
                                    >
                                        <Link
                                            href="signup"
                                            style={{
                                                margin: '1rem',
                                                width: '7rem'
                                            }}
                                        >ساخت حساب جدید</Link>
                                    </Typography>
                                </Grid>


                            </Grid>

                            <Button
                                type="submit"
                                variant='contained'
                                fullWidth
                                size='large'
                                style={{ padding: '1rem', marginBlock: '1rem' }}
                                onClick={login}
                                disabled={!values.email || !values.password || isSubmitting}
                            >
                                {loading === true ? <CircularProgress color='inherit' size={'1.6rem'} /> : 'ورود'}
                            </Button>
                        </Form>
                    )}
                </Formik>

                <Divider>یا</Divider>

                <Grid container>
                    <Grid
                        sm={6}
                        md={6}
                        style={{ marginBlock: '.5rem' }}
                    >
                        <Button
                            onClick={github}
                            variant='contained'
                            size='large'
                            color='warning'
                            fullWidth
                            style={{ padding: '1rem', marginBlock: '1rem' }}

                        >
                            <GitHub />
                        </Button>
                    </Grid>
                    <Grid
                        sm={6}
                        md={6}
                        style={{ marginBlock: '.5rem' }}
                    >
                        <Typography
                            variant='body1'
                            textAlign={'left'}
                        >
                            <Button
                                onClick={google}
                                variant='outlined'
                                size='large'
                                fullWidth
                                color='warning'
                                style={{ padding: '1rem', marginBlock: '1rem' }}

                            >
                                <GoogleIcon />
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>


            </Grid>

            <Grid
                md={6}
                sx={{
                    display: "flex",
                    placeContent: 'center',
                    placeItems: 'center',
                    minHeight: '100vh'
                }}

            >
                <Image
                    src={loginImage}
                    width={400}
                    height={400}
                    alt='login'
                />
            </Grid>
        </Grid>
    )
}