'use client'
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import KeyIcon from '@mui/icons-material/Key';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { Breadcrumbs, Button, CircularProgress, Grid, Typography } from "@mui/material";

import { userSchema } from "@/validation/userValidation";
import Link from "next/link";
export default function ChangePassword() {
    const route = useRouter()
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);


    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    async function updatePassword() {
        setLoading(true)
        const { error } = await supabase.auth
            .updateUser({ password: password })
        if (error) {
            toast.error('مشکلی پیش آمده')
            console.log(error)
            setLoading(false)
        }
        else if (!error) {
            toast.success('با موفقیت ثبت شد')
            route.push('/login')
            setLoading(false)
        }
    }

    const initialValues = {
        password: password,
        confirmPassword: confirmPassword,
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
                md={5}
                id="formContent"
                boxShadow={2}
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
                        پروفایل
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>تغییر رمز عبور</Typography>
                </Breadcrumbs>
                <Formik
                    initialValues={initialValues}
                    onSubmit={updatePassword}
                    validateOnMount={true}
                    validationSchema={userSchema}

                >
                    <Form >
                        <div>
                            <label htmlFor="name">
                                <Typography
                                    variant='h5'
                                    textAlign={'right'}
                                    style={{ marginBottom: '-1rem' }}
                                >
                                    <KeyIcon />
                                </Typography>
                            </label>
                            <Field
                                className="icon-email"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="رمز عبور جدید"
                                onKeyUp={handlePassword}
                            />
                            <Typography color={'red'} variant='body2'>
                                <ErrorMessage name="password" component="div" />
                            </Typography>
                        </div>
                        <div>
                            <label htmlFor="confirm">
                                <Typography
                                    variant='h5'
                                    textAlign={'right'}
                                    style={{ marginBottom: '-1rem' }}
                                >
                                    <KeyIcon />
                                </Typography>
                            </label>
                            <Field
                                className="icon-email"
                                id="confirm"
                                name="confirm"
                                type="password"
                                placeholder="تکرار رمز عبور جدید"
                                onKeyUp={handleConfirmPassword}

                            />
                            <Typography color={'red'} variant='body2'>
                                <ErrorMessage name="confirm" component="div" />
                            </Typography>
                        </div>
                        <Button
                            type="submit"
                            variant='contained'
                            fullWidth
                            color="success"
                            size='large'
                            style={{ padding: '1rem', marginBlock: '1rem' }}
                            onClick={updatePassword}
                            disabled={password === confirmPassword ? false : true}
                        >
                            {loading === true ? <CircularProgress color='inherit' size={'1.6rem'} /> : 'ذخیره'}
                        </Button>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    )
}