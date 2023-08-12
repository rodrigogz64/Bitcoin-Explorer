import img from '../assets/Splash.png'
import './SplashScreen.css'

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={img} alt="" className="icon"/>
    </div>
  );
};

export default SplashScreen;
