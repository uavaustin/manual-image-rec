import React from 'react';
import {Container, Header, Grid, Image, Form} from 'semantic-ui-react';
import BackgroundImage from '../imagery/FlightImages/image (5).jpg'

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

  handleSubmit() {
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
    const {shape, color, alphanumeric, alphanumeric_color} = this.state

    return (<Container id='page'>
      <Header as='h1'>Classifier</Header>
      <Grid>
        <Grid.Column width={11}>
          <Image src={BackgroundImage} fluid/>
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
