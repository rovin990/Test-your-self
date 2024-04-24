import React from 'react'

function SuccessStory() {
  return (
  <div id="success-stories" className="carousel slide" data-bs-ride="carousel">
        
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={process.env.PUBLIC_URL +'/images/dart-board.png'} className="img img-responsive success-story" alt="..."/>
                <div >
                    <h5>Third slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
            <div className="carousel-item ">
                <img src={process.env.PUBLIC_URL +'/images/document.png'} className="img img-responsive success-story" alt="..."/>
                <div >
                    <h5>second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={process.env.PUBLIC_URL +'/images/setting.png'} className="img img-responsive success-story" alt="..."/>
                <div >
                    <h5>first slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </div>

        <div class="container text-center">
            <button type="button" data-bs-target="#success-stories" data-bs-slide-to="0" className="active btn btn-secondary" aria-current="true" aria-label="Slide 1" >Previous</button>
            <button type="button" data-bs-target="#success-stories" data-bs-slide-to="1" aria-label="Slide 2" className='btn btn-info mx-2'>Middle</button>
            <button type="button" data-bs-target="#success-stories" data-bs-slide-to="2" aria-label="Slide 3" className='btn btn-primary'>Next</button>
        </div>
    </div>
  )
}

export default SuccessStory;