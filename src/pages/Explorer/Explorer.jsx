import React from 'react';
import { Container, Header, Grid, Card, Icon, Table, Button } from 'semantic-ui-react';
import image1 from './images/image-1.jpg'
import image2 from './images/image-2.jpg'
import image3 from './images/image-3.jpg'
import image4 from './images/image-4.jpg'

const images = [image1, image2, image3, image4]


// const FillerTableItem = (props) => ( //made this so I wouldn't have to copy and paste it so many times. It might be beneficial to make it into a class component later
//     <Table.Row>
//       <Table.Cell>
//         <Icon name='picture' /> {props.name}
//       </Table.Cell>
//     </Table.Row>
// )

export default class Explorer extends React.Component{
  constructor(){
    super()
    this.state = {
      currentImageIndex: 0
    }
    this.handleArrowClick = this.handleArrowClick.bind(this)
    this.handleListClick = this.handleListClick.bind(this)
  }

  handleArrowClick(event, data){
    if(data.name==="right-button"){
      this.setState((prevState) => {
        return {currentImageIndex: prevState.currentImageIndex+1}
      })
    }else{
      this.setState((prevState) => {
        return {currentImageIndex: prevState.currentImageIndex-1}
      })
    }
  }

  handleListClick(data){
    this.setState({currentImageIndex: data.index})
  }

  render(){
    const TableItems = images.map((image, index) =>
      <Table.Row key={index} name="table-row" style={{cursor: 'pointer'}} onClick={() => this.handleListClick({index})}>
        <Table.Cell active={index===this.state.currentImageIndex}>
          <Icon name='picture' /> Image {index+1}
        </Table.Cell>
      </Table.Row>
    )
    return(
      <Container id='page' fluid>
        <Header as='h1'>Explorer</Header>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width="3">
              <div style={{height: '81vh', overflowY: 'auto'}}>
                <Table celled striped selectable>
                  <Table.Body>
                    {TableItems}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
            <Grid.Column width="9">
              <Card fluid image={images[this.state.currentImageIndex]} description={"Image " + (this.state.currentImageIndex+1)} />
              <Card.Content extra style={{display:'flex', justifyContent: 'space-between'}}>
                <Button name='left-button' icon='arrow left' onClick={this.handleArrowClick} disabled={this.state.currentImageIndex===0}/>
                <Button name='right-button' icon='arrow right' onClick={this.handleArrowClick} disabled={this.state.currentImageIndex===images.length-1}/>
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
