import React from 'react';
import { ImageContext } from '../../contexts/ImageContext'
import {Container, Header, Grid, Form, Card, Button} from 'semantic-ui-react';

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
      alphanumeric_color: ''
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

  render() {
    const { currentImageIndex, changeImageIndex } = this.context
    const {shape, color, alphanumeric, alphanumeric_color} = this.state

    return (<Container id='page'>
      <Header as='h1'>Classifier</Header>
      <Grid>
        <Grid.Column width={11}>
          <Card fluid image={imageObjects[currentImageIndex].image} description={imageObjects[currentImageIndex].name} />
          <Card.Content extra style={{display:'flex', justifyContent: 'space-between'}}>
            <Button name='left-button' icon='arrow left' onClick={() => changeImageIndex(currentImageIndex-1)} disabled={currentImageIndex===0}/>
            <Button name='right-button' icon='arrow right' onClick={() => changeImageIndex(currentImageIndex+1)} disabled={currentImageIndex===imageObjects.length-1}/>
          </Card.Content>
        </Grid.Column>
        <Grid.Column width={5}>
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
