import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const me = useSelector((store) => store.user);
  console.log(me);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    console.log(email, password);
    dispatch(loginAction({ email, password }));
  }, [email, password]);

  // 로그인 성공 시, 홈으로 이동
  if (me) {
    props.history.push('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="standard"
            id="filled-search"
            margin="normal"
            required
            fullWidth
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            onChange={onChangePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={me}
          >
            로그인
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
