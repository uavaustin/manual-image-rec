import React from 'react';
import { ImageContext } from '../../contexts/ImageContext'
import {Container, Header, Grid, Form, Card, Button} from 'semantic-ui-react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import fillerImg from './../imagery/uava_logo.png'

function importAll(r) {
  return r.keys().map(r);
}

const importedImages = importAll(require.context('../imagery/FlightImages/', false, /\.(png|jpe?g|svg)$/));

const imageObjects = importedImages.map((image, index) => {
    return(
      {
        image: image,
        name: "Image "+(index+1)
      }
    )
  }
)

const shapeOptions = [
  {
    key: 'square',
    text: 'Square',
    value: 'square'
  }, {
    key: 'circle',
    text: 'Circle',
    value: 'circle'
  }, {
    key: 'triangle',
    text: 'Triangle',
    value: 'triangle'
  }
]

const colorOptions = [
  {
    key: 'red',
    text: 'Red',
    value: 'red'
  }, {
    key: 'blue',
    text: 'Blue',
    value: 'blue'
  }, {
    key: 'green',
    text: 'Green',
    value: 'green'
  }
]

export default class Classifier extends React.Component {
  static contextType = ImageContext

  constructor() {
    super()
    this.state = {
      shape: '',
      color: '',
      alphanumeric: '',
      alphanumeric_color: '',
      crop: {
        aspect: 1,
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange(event, data) {
    if(data.name === 'alphanumeric'){
      this.setState({
        [data.name]: data.value.toUpperCase().substr(-1)
      })
    }else{
      this.setState({
        [data.name]: data.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.shape, this.state.color, this.state.alphanumeric, this.state.alphanumeric_color)
  }

  handleClear(){
    this.setState({
      shape: '',
      color: '',
      alphanumeric: '',
      alphanumeric_color: ''
    })
  }

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = (crop, percentCrop) => {
    console.log('onCropComplete', crop, percentCrop);
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // console.log('onCropChange', crop, percentCrop);
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  onDragStart = () => {
    console.log('onDragStart');
  };

  onDragEnd = () => {
    console.log('onDragEnd');
  };

  onChangeToIncompleteCropClick = () => {
    this.setState({
      crop: {
        aspect: 16 / 9,
        unit: '%',
        width: 100,
      },
    });
  };

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        blob.name = fileName; // eslint-disable-line no-param-reassign
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  makeClientCrop(crop) {
      if (this.imageRef && crop.width && crop.height) {
        this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg').then(croppedImageUrl =>
          this.setState({ croppedImageUrl })
        );
      }
    }

  render() {
    const { currentImageIndex, changeImageIndex } = this.context
    const {shape, color, alphanumeric, alphanumeric_color, crop, croppedImageUrl} = this.state
    const src = imageObjects[currentImageIndex].image

    return (<Container id='page'>
      <Header as='h1'>Classifier</Header>
      <Grid>
        <Grid.Column width={11}>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
            />
          )}
          <Card.Content extra style={{display:'flex', justifyContent: 'space-between'}}>
            <Button name='left-button' icon='arrow left' onClick={() => changeImageIndex(currentImageIndex-1)} disabled={currentImageIndex===0}/>
            <Button name='right-button' icon='arrow right' onClick={() => changeImageIndex(currentImageIndex+1)} disabled={currentImageIndex===imageObjects.length-1}/>
          </Card.Content>
        </Grid.Column>
        <Grid.Column width={5}>
          <Container fluid textAlign='center'>
            {(
              <img alt="Crop" style={{ width: '300px' }} src={croppedImageUrl ? croppedImageUrl : fillerImg} />
            )}
            <br />
            <br />
          </Container>
          <Form>
            <Form.Group widths="equal">
              <Form.Dropdown placeholder='Select Shape' search fluid name='shape' selection value={shape} options={shapeOptions} onChange={this.handleChange}/>
              <Form.Dropdown placeholder='Select Color' search name='color' value={color} fluid selection options={colorOptions} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input name='alphanumeric' value={alphanumeric} placeholder='Enter Alphanumeric' fluid onChange={this.handleChange}/>
              <Form.Dropdown placeholder='Select Alpha Color' search name='alphanumeric_color' value={alphanumeric_color} fluid selection options={colorOptions} onChange={this.handleChange}/>
            </Form.Group>
            <br />
            <br />
            <Form.Group widths="equal">
              <Form.Button color='grey' fluid content='Clear' onClick={this.handleClear} icon='close'/>
              <Form.Button color='green' fluid content='Submit' onClick={this.handleSubmit} icon='check'/>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>)
  }
}
