import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import GuestHome from './guestHome';
import TradieHome from './tradieHome/index';
import BuilderHome from './builderHome/index';
import storageService from '../../utils//storageService';
import { addFCMNotifToken } from '../../redux/auth/actions';
import { requestPermission } from "../../services/firebase";


const Home = () => {
    const [userType] = useState(storageService.getItem('userType'))
    const location: any = useLocation();
    const history: any = useHistory();

    const setTokenSentToServer = (sent: any) => {
        storageService.setItem('sentToServer', sent ? '1' : '0');
    }

    useEffect(() => {
        (async () => {
            if (userType === 1 || userType === 2) {
                const res: any = await requestPermission();
                const data: any = {
                    deviceToken: res.deviceToken,
                    deviceId: "dGlja3RfYXBwOnRpY2t0X2FwcF8xMjNzYWRlZnNz",
                    deviceType: 1
                }
                console.log(res, "getRegisterToken", data, "addFCMNotifToken");
                if (res.success) {
                    const res2 = await addFCMNotifToken(data);
                    storageService.setItem("FCM token", res.deviceToken);
                    if (res2.success) {
                        setTokenSentToServer(true);
                    } else {
                        setTokenSentToServer(false);
                    }
                }
            }
        })();
    }, []);

    if (userType === 0) {
        return <GuestHome />
    }
    else if (userType === 1) {
        return <TradieHome history={history} />
    } else if (userType === 2) {
        return <BuilderHome history={history} />
    }
    else {
        return <GuestHome />
    }
}

export default Home;
