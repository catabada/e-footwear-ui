import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Form, useForm } from "~/hooks/useForm";
import AccountHeader from "../header/AccountHeader";
import style from "./ChangePassword.module.scss";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangePassword } from "~/redux/auth/authSlice";
const cx = classNames.bind(style);
function ChangePassword() {
    const initialFormValues = {
        oldPassword: "",
        newPassword: "",
        verifyPassword: "",
    };
    const textRef = useRef();
    const refPassword = textRef.current?.value;
    const dispatch = useDispatch();
    const { accountId, accessToken } = useSelector((state) => state.authReducer);

    const validate = (fieldValues = values) => {
        const temp = { ...errors };
        const tempEnable = { ...errorsEnable };
        if ("oldPassword" in fieldValues) {
            if (fieldValues.oldPassword === "") {
                temp.oldPassword = "Vui lòng nhập mật khẩu";
                tempEnable.oldPassword = true;
            } else {
                temp.oldPassword = "";
                tempEnable.oldPassword = false;
            }
        }
        if ("newPassword" in fieldValues) {
            if (fieldValues.newPassword === "") {
                temp.newPassword = "Vui lòng nhập mật khẩu mới";
                tempEnable.newPassword = true;
            } else {
                temp.newPassword = "";
                tempEnable.newPassword = false;
            }
        }
        if ("verifyPassword" in fieldValues) {
            if (fieldValues.verifyPassword === "") {
                tempEnable.verifyPassword = true;
                temp.verifyPassword = "Không được để trống.";
            } else {
                if (fieldValues.verifyPassword === refPassword) {
                    tempEnable.verifyPassword = false;
                    temp.verifyPassword = "";
                } else {
                    temp.verifyPassword = "Không khớp với mật khẩu. Vui lòng nhập lại.";
                    tempEnable.verifyPassword = true;
                }
            }
        }

        setErrors({ ...temp });
        setErrorsEnable({ ...tempEnable });
        if (fieldValues === values) {
            return Object.values(temp).every((x) => x === "");
        }
    };
    const {
        values,
        setValues,
        errors,
        setErrors,
        errorsEnable,
        setErrorsEnable,
        handleInputChange,
        resetForm,
    } = useForm(initialFormValues, true, validate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            await dispatch(
                fetchChangePassword({
                    id: accountId,
                    accessToken,
                    newPassword: values.newPassword,
                    oldPassword: values.oldPassword,
                })
            );
            resetForm();
        }
    };
    return (
        <Paper className={cx("change-password-section")}>
            <AccountHeader
                title="Đổi mật khẩu"
                text="Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác"
            />
            <Grid container sx={{ paddingTop: "3rem" }} className={cx("content")}>
                <Grid item xs={8} sx={{ borderRight: "1px solid #efefef" }}>
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ marginBottom: "3rem" }}>
                            <Grid item xs={3}>
                                <Typography variant="body2" className={cx("text", "text-light")}>
                                    Mật Khẩu Hiện Tại
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    name="oldPassword"
                                    type="password"
                                    fullWidth
                                    value={values.oldPassword}
                                    onChange={handleInputChange}
                                    error={errorsEnable.oldPassword}
                                    helperText={errors.oldPassword}
                                    FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                                    inputProps={{ style: { padding: "1.5rem 1rem" } }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "3rem" }}>
                            <Grid item xs={3}>
                                <Typography variant="body2" className={cx("text", "text-light")}>
                                    Mật Khẩu Mới
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    inputRef={textRef}
                                    name="newPassword"
                                    type="password"
                                    fullWidth
                                    value={values.newPassword}
                                    onChange={handleInputChange}
                                    error={errorsEnable.newPassword}
                                    helperText={errors.newPassword}
                                    FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                                    inputProps={{ style: { padding: "1.5rem 1rem" } }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: "3rem" }}>
                            <Grid item xs={3}>
                                <Typography variant="body2" className={cx("text", "text-light")}>
                                    Xác Nhận Mật Khẩu
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    name="verifyPassword"
                                    type="password"
                                    fullWidth
                                    value={values.verifyPassword}
                                    onChange={handleInputChange}
                                    error={errorsEnable.verifyPassword}
                                    helperText={errors.verifyPassword}
                                    FormHelperTextProps={{ style: { fontSize: "1.4rem" } }}
                                    inputProps={{ style: { padding: "1.5rem 1rem" } }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="center">
                            <Button variant="contained" type="submit" className={cx("btn-save")}>
                                Lưu
                            </Button>
                        </Grid>
                    </Form>
                </Grid>
                <Grid item xs={4} className={cx("forgot")}>
                    <Link to="/auth/forgot" className={cx("link")}>
                        Quên mật khẩu?
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ChangePassword;
