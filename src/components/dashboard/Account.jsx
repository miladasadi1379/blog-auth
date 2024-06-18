import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import MailIcon from '@mui/icons-material/Mail';
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function Account({ session }) {
    const [email, setEmail] = useState(session?.email)
    const [fullname, setFullName] = useState(session?.user_metadata?.full_name)
    const [profileImage, setProfileImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState([]);

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handleName(e) {
        setFullName(e.target.value);
    }

    const handleImageFile = (e) => {
        setImageFile([...imageFile, e.target.files[0]]);
    };

    // get data
    useEffect(() => {
        async function getProfile() {
            setFullName(session?.user_metadata?.full_name)
            setEmail(session?.email)

            const { data, error } = await supabase.storage
                .from('avatars')
                .getPublicUrl(`${session?.id}/photo.jpg`)
            setProfileImage(data.publicUrl)
        }
        getProfile()
    }, [session])

    const initialValues = {
        name: fullname,
        email: email,
    }
    // update profile
    async function updateProfile(e) {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
            email: email,
            data: {
                full_name: fullname
            }
        })
        console.log("imageFile:", imageFile);
        const file = new File(imageFile, "photo.jpg");
        console.log("file:", file);
        const { data: { upload }, error: newErr } = await supabase
            .storage
            .from('avatars')
            .update(`${session?.id}/photo.jpg`, file, {
                cacheControl: '2000',
                upsert: true
            })
        console.log("upload:", upload)
        console.log("newErr:", newErr)
        if (error) {
            toast.error('مشکلی پیش آمد!')
            console.warn(error)
            setLoading(false);
        } else if (data) {
            toast.success('با موفقیت اعمال شد')
            setLoading(false);
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
                md={5}
                id="formContent"
                boxShadow={2}
            >
                <Typography
                    textAlign={'center'}
                    style={{ marginBlock: '1rem' }}
                >
                    <Image
                        src={profileImage}
                        width={170}
                        height={170}
                        style={{ borderRadius: '4rem' }}
                    />
                    <div className="upload-btn-wrapper">
                        <button className="btn">
                            <AddPhotoAlternateIcon />
                        </button>
                        <input onChange={handleImageFile} type="file" name="myfile" />
                    </div>
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={updateProfile}
                    validateOnMount={true}
                >
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
                                defaultValue={fullname}
                                placeholder="نام و نام خانوادگی"
                                onKeyUp={handleName}
                            />

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
                                defaultValue={email}
                                placeholder="ایمیل"
                                onKeyUp={handleEmail}

                            />

                        </div>
                        <Button
                            type="submit"
                            variant='contained'
                            fullWidth
                            color="success"
                            size='large'
                            style={{ padding: '1rem', marginBlock: '1rem' }}
                            onClick={updateProfile || handleClickUpload}
                        >
                            {loading === true ? <CircularProgress color='inherit' size={'1.6rem'} /> : 'ذخیره'}
                        </Button>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    )
}