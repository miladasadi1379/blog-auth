'use client'
import { useState } from 'react'
import { toast } from 'react-toastify';
import Image from 'next/image';

import Link from 'next/link'
import loginImage from '@/assets/login.jpg'
import icon from '@/app/favicon.ico'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
// mui
import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { userSchema } from '@/validation/userValidation';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';


export default function SignUpPage() {
    const route = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullName] = useState('')
    const [loading, setLoading] = useState(false)

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleName(e) {
        setFullName(e.target.value);
    }
    const initialValues = {
        name: fullname,
        email: email,
        password: password
    }
    async function signup(e) {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullname
                }
            }
        })

        if (error) {
            toast.error('مشکلی پیش آمد')
            console.log(error.message)
            setLoading(false);
        } else if (data) {
            console.log(data)
            setLoading(false);
            toast.success('موفقیت آمیز بود،ایمیل را تایید کنید')
            route.push('/dashboard')
        }
    }




    return (
        <Grid
            container
            sx={{
                display: "flex",
                placeContent: 'center',
                placeItems: 'center',
                minHeight: '100vh'
            }}
        >

            <Grid
                style={{ marginBlock: '1rem' }}
                md={5}
                id="formContent"
                boxShadow={2}
            >

                <Typography
                    textAlign={'center'}
                    style={{ marginBlock: '1rem' }}
                >
                    <Image
                        src={icon}
                        width={70}
                        height={70}
                    />
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={userSchema}
                    onSubmit={signup}
                    validateOnMount={true}
                >
                    {({ isSubmitting, values }) => (
                        <Form >
                            <div>
                                <label htmlFor="name">
                                    <Typography
                                        variant='h5'
                                        textAlign={'right'}
                                        style={{ marginBottom: '-1rem' }}
                                    >
                                        <AccountBoxIcon />
                                    </Typography>
                                </label>
                                <Field
                                    className="icon-email"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="نام و نام خانوادگی"
                                    onKeyUp={handleName}
                                />
                                <Typography color={'red'} variant='body2'>
                                    <ErrorMessage name="name" component="div" />
                                </Typography>
                            </div>
                            <div>
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
                            </div>
                            <div>
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
                            </div>
                            <Button
                                type="submit"
                                variant='contained'
                                fullWidth
                                size='large'
                                style={{ padding: '1rem', marginBlock: '1rem' }}
                                onClick={signup}
                                disabled={!values.name || !values.email || !values.password || isSubmitting}
                            >
                                {loading === true ? <CircularProgress color='inherit' size={'1.6rem'} /> : 'ثبت نام'}
                            </Button>
                            <Typography
                                variant='body1'
                                textAlign={'center'}
                                style={{ marginInline: '-1rem' }}
                            >
                                <Link
                                    href="login"
                                    style={{
                                        margin: '1rem',
                                        width: '7rem'
                                    }}
                                >اکانت دارید؟</Link>
                            </Typography>
                        </Form>
                    )}
                </Formik>

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