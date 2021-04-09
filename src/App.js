import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Navigation/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Register from './components/Register/Register';
import './App.css';

const app = new Clarifai.App({
//Use your Clarifai API key
  apiKey:'8ea1ca06812d436d'

});

const particlesOptions = {
                  particles: {
                              number:{
                                        value: 100,
                                        density: {
                                        enable: true,
                                        value_area: 900,
                                        }
                                      }
                              }
                  }

class App extends Component {
  constructor () {
super ();
this.state = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false
}
  }
calculateFaceLocation = (data) => {
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
return {
  leftCol: clarifaiFace.left_col * width,
  topRow: clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height)
}
}

displayFaceBox = (box) => {
 
this.setState({box: box});
}

onInputChange = (event) => {
 this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models
  .predict(
  Clarifai.FACE_DETECT_MODEL, 
  this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
.catch(err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
  this.setState({isSignedin: false})
} else if (route === 'home') {
  this.setState({isSignedin: true})
}
this.setState({route:route});
} 
render() {
      return (
      <div className="App">
              <Particles className='particles'
                  params={particlesOptions}
                />
            <Navigation isSignedIn= {this.state.isSignedin} onRouteChange = {this.onRouteChange} />
            {this.state.route === 'home'
              ?<div>
                  <Logo />
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                  <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
                  </div> 
              : (
                this.state.route === 'signin' ?
                <Signin onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
              )
            }
      </div>
  );
}
}
export default App;


