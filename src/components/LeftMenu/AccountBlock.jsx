import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import { useAuthStateContext } from '../../providers/AuthProvider';
import AuthMutations from '../../services/auth/authUseMutations';



const AccountBlock = () => {

    const auth = useAuthStateContext();
    const mutation = AuthMutations.useLogoutUser()


    React.useEffect(() => {
        if (mutation.isSuccess) {
            auth.logout();
        }
    }, [mutation.isSuccess]);


    if (mutation.isError) {
        console.log(mutation.error.message)
    }

    const handleClick = () => {
        mutation.mutate()
    }

    return (

        <ListItemButton
            sx={{
                flex: 0
            }}
            onClick={() => handleClick()}

        >
            <ListItem alignItems="flex-start"
                sx={{
                    p: 2,
                }}
            >
                <ListItemAvatar>
                    <Avatar alt={"Мой аккаунт"} src="/media/user.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={auth.user?.name}
                    secondary={auth.user?.email}
                />
            </ListItem>
        </ListItemButton>
    );
}
export default AccountBlock