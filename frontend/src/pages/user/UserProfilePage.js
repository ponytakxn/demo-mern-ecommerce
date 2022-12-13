import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";


const updateUserApiRequest = async (name, lastName, phoneNumber, address, country, city, zipCode, password) => {
    const { data } = await axios.put('/api/users/profile', { name, lastName, phoneNumber, address, country, city, zipCode, password });
    return data;
}

const fetchUser = async (user_id) => {
    const {data} = await axios.get(`/api/users/profile/`+user_id);
    return data;
}

const UserProfilePage = () => {

    const reduxDispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userRegisterLogin);

    return( 
        <UserProfilePageComponent 
            updateUserApiRequest={updateUserApiRequest} 
            fetchUser={fetchUser} 
            userInfoFromRedux={userInfo}
            setReduxUserState={setReduxUserState}
            reduxDispatch={reduxDispatch}
            localStorage={window.localStorage}
            sessionStorage={window.sessionStorage} />
    );
};

export default UserProfilePage;