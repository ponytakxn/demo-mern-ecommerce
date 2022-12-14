import UserOrderDetailsPageComponent from "./components/UserOderDetailsPageComponent";
import axios from 'axios';
import { useSelector } from 'react-redux';

const getOrder = async(orderId) => {
    const { data } = await axios.get(`/api/orders/user/${orderId}`);
    return data;
}

const UserOrderDetailsPage = () => {

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
    

    const getUser = async(userId) => {
        const { data } = await axios.get(`/api/users/profile/${userId}`);
        return data;
    }

    return <UserOrderDetailsPageComponent userInfo={userInfo} getUser={getUser} getOrder={getOrder} />
}

export default UserOrderDetailsPage;