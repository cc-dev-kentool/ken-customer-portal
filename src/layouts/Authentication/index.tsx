import * as S from './style'
import { useAppSelector } from 'hooks'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'



function AuthenticationLayout(props) {
    const [
        isLoading
    ] = useAppSelector((state) => [
        state.app.isLoading
    ]);
    const { children } = props
    return (
        <S.AuthenticationContainer>
            <Backdrop
                sx={{ color: '#fff', zIndex: 99999 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </S.AuthenticationContainer>

    );
}

export default AuthenticationLayout;