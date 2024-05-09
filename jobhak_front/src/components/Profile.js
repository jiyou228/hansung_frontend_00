import Nav from './Nav';
import white from '../assets/profile/white.png';
import purple from '../assets/profile/purple.png';
import beige from '../assets/profile/beige.png';
import pink from '../assets/profile/pink.png';
import blue from '../assets/profile/blue.png';
import yellow from '../assets/profile/yellow.png';
import './Profile.css'
import { useEffect, useState } from 'react';
const Profile = () => {
    const [background, setBackground]  = useState(null);
    return(
    <>
        <Nav/>
        <div className='profile_background'>
            <h4 className='profile_name'>배경 색상</h4>
            <img src = {white} alt='white' onClick={() => setBackground("white")}/> 
            <img src = {beige} alt='white' onClick={() => setBackground("beige")}/> 
            <img src = {yellow} alt='white' onClick={() => setBackground("yellow")} />
            <img src = {pink} alt='white' onClick={() => setBackground("pink")}/>
            <img src = {purple} alt='white'onClick={() => setBackground("purple")} /> 
            <img src = {blue} alt='white'onClick={() => setBackground("blue")} />
        </div>
    </>
    );
};
export default Profile;