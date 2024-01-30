import Nav from './Nav';
import './Home.css';
import Swipe from './swipe';
const Home = () => {
  return(
    <div className='home'>
        <Nav/>
        <Swipe/>
    </div>
  ); 
};
export default Home;