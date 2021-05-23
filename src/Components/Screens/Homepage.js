import React, {useState} from 'react';
import URLSearchBar from '../URLSearchBar';
import {CardDeck,Card, CardImg, CardText, CardBody,
    CardTitle,} from 'reactstrap';
const Homepage = () => {
    document.title=`${process.env.REACT_APP_TITLE}`
    return ( 
        <div>
            <div className="top-wrapper">
                <div className="pt-5 pb-5 text-center">
                    <div className="d-flex justify-content-center">
                        <h1>When you’re ready for a change, we’re ready to help.</h1>
                    </div>                
                    <br/>
                    <div className="d-flex justify-content-center">
                        <URLSearchBar/>
                    </div>
                </div>
            </div>
            <div className="container pt-3 pb-3">
                <CardDeck>
                    <Card className="card-wrapper">
                        <CardImg top width="100%" src="https://res.cloudinary.com/code-gambit/image/upload/v1621277824/Web%20App/card-wrapper_rbuejg.png" alt="Card image cap" />
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Card title</CardTitle>                        
                            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>                        
                        </CardBody>
                    </Card>
                    <Card className="card-wrapper">
                        <CardImg top width="100%" src="https://res.cloudinary.com/code-gambit/image/upload/v1621277824/Web%20App/card-wrapper_rbuejg.png" alt="Card image cap" />
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Card title</CardTitle>                        
                            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>                        
                        </CardBody>
                    </Card>
                    <Card className="card-wrapper">
                        <CardImg top width="100%" src="https://res.cloudinary.com/code-gambit/image/upload/v1621277824/Web%20App/card-wrapper_rbuejg.png" alt="Card image cap" />
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Card title</CardTitle>                        
                            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>                        
                        </CardBody>
                    </Card>
                </CardDeck>
            </div>
        </div>
     );
}
 
export default Homepage;