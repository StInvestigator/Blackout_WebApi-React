import '../App.css';
import Login from './Login.jsx';
import Schedule from './Schedule';
export default function Home() {

    function isUserLogedIn() {
        return localStorage.getItem("user_token") !== null
    }


    return <>
        {isUserLogedIn()
            ? <Schedule/>
            : <Login/>
        }
    </>
}