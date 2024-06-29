import './Person.css'
import { Link } from 'react-router-dom';
function Person() {
  return (
    <div>
      <div className='header'>
        <span style={{fontWeight:'bolder', color:'yellow',fontSize:'30px',marginLeft:'5px'}}class="price-text">LAPVAPS</span>&nbsp;&nbsp;
        <img style={{height:'60px', marginTop:'5px'}}src='https://www.svgrepo.com/show/2086/laptop.svg' alt='laptoppic'></img>
        <span style={{fontWeight:'bolder', color:'white',fontSize:'30px',marginLeft:'100px'}} class="price-value">{'SELECT ACCORDING TO YOUR KNOWLEDGE ON SPECIFICATIONS'}</span>
      </div>
    <div className="typesofpersoncontainer">
          <div className="typesofperson">
                <button  id="typesofpersonbutton">
                <Link to={'/Beginnerform'} >
                    <div >
                       
                      <img src='https://cdn-icons-png.flaticon.com/512/3048/3048127.png' alt='person1' style={{ width: '230px', height: 'auto' }}></img>
                    </div>
                    <div className='beginnerlink'>
                        <h2>Beginner</h2>
                    </div>
                </Link>
                </button>

            </div>
            <div className="typesofperson">
                <button  id="typesofpersonbutton2">
                <Link to={'/Intermediateform'} >
                    <div >
                        
                        <img src='https://cdn-icons-png.flaticon.com/512/4042/4042171.png' alt='person2' style={{ width: '230px', height: 'auto' }}></img>
                        
                    </div>
                    <div>
                        <h2>Intermediate</h2>
                    </div>
                    </Link>
                </button>

            </div>
            <div className="typesofperson">
                <button  id="typesofpersonbutton3">
                <Link to={'/Proform'} >
                    <div >
                       
                        <img src='https://cdn-icons-png.flaticon.com/512/9308/9308310.png' alt='person3' style={{ width: '230px', height: 'auto' }}></img>
                    </div>
                    <div>
                        <h2>Pro</h2>
                    </div>
                    </Link>
                </button>

            </div>     
    </div>
    </div>
  );
}

export default Person;