import Nav from './Nav';
import white from '../assets/profile/white.png';
import purple from '../assets/profile/purple.png';
import beige from '../assets/profile/beige.png';
import pink from '../assets/profile/pink.png';
import blue from '../assets/profile/blue.png';
import yellow from '../assets/profile/yellow.png';
import './Profile.css'
const Profile = () => {
    return(
    <>
        <Nav/>
        <div className='profile_background'>
            <h4 className='profile_name'>배경 색상</h4>
            <img src = {white} alt='white'/> 
            <img src = {beige} alt='white'/> 
            <img src = {yellow} alt='white'/>
            <img src = {pink} alt='white'/>
            <img src = {purple} alt='white'/> 
            <img src = {blue} alt='white'/>
        </div>
    </>
    );
};
export default Profile;