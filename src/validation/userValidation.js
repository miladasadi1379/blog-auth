import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    name: Yup.string().required('نام الزامی است!'),
    email: Yup.string().email('ایمیل صحیح وارد کنید!').required('ایمیل الزامی است!'),
    password: Yup.string().required('رمز عبور الزامی است!').min(5, 'حداقل دارای 5 حروف باشد'),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'رمز عبور ها باید مطابقت داشته باشند'),
})

