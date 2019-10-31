import React from 'react';
import { Container, Header, Grid, Card, Icon, Table, Button } from 'semantic-ui-react';

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
    const TableItems = imageObjects.map((object, index) =>
      <Table.Row key={index} name="table-row" style={{cursor: 'pointer'}} onClick={() => this.handleListClick({index})}>
        <Table.Cell active={index===this.state.currentImageIndex}>
          <Icon name='picture' /> {object.name}
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
              <Card fluid image={imageObjects[this.state.currentImageIndex].image} description={imageObjects[this.state.currentImageIndex].name} />
              <Card.Content extra style={{display:'flex', justifyContent: 'space-between'}}>
                <Button name='left-button' icon='arrow left' onClick={this.handleArrowClick} disabled={this.state.currentImageIndex===0}/>
                <Button name='right-button' icon='arrow right' onClick={this.handleArrowClick} disabled={this.state.currentImageIndex===imageObjects.length-1}/>
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
