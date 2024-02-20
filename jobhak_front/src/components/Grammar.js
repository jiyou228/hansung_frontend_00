import Nav from "./Nav";
import './Grammar.css';

const Grammar = () => {
    return (
        <>
            <Nav/>
            <div className="grammar">
                <iframe src="http://speller.cs.pusan.ac.kr/"/>
            </div>
        </>

    );
};
export default Grammar;