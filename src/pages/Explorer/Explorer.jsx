import React from 'react';
import { ImageContext } from '../../contexts/ImageContext'
import { Container, Header, Grid, Card, Table, Button, Icon } from 'semantic-ui-react';

function importAll(r) {
  return r.keys().map(r);
}

const importedImages = importAll(require.context('../imagery/FlightImages/', false, /\.(png|jpe?g|svg)$/));

const imageObjects = importedImages.map((image, index) => {
    return(
      {
        image: image,
        name: "Image "+(index+1),
        visible: true
      }
    )
  }
)

export default class Explorer extends React.Component{
  static contextType = ImageContext

  render(){
    const { currentImageIndex, changeImageIndex } = this.context

    return(
      <Container id='page' fluid>
        <Header as='h1'>Explorer</Header>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width="3">
              <div style={{height: '81vh', overflowY: 'auto'}}>
                <Table celled striped selectable>
                  <Table.Body>
                    {imageObjects.map((image, index) =>
                      <Table.Row key={index} style={{cursor: 'pointer'}} onClick={() => changeImageIndex(index)}>
                        <Table.Cell active={index===currentImageIndex}>
                          <Icon name='picture' /> {image.name}
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
            <Grid.Column width="9">
              <Card fluid image={imageObjects[currentImageIndex].image} description={imageObjects[currentImageIndex].name} />
              <Card.Content extra style={{display:'flex', justifyContent: 'space-between'}}>
                <Button name='left-button' icon='arrow left' onClick={() => changeImageIndex(currentImageIndex-1)} disabled={currentImageIndex===0}/>
                <Button name='right-button' icon='arrow right' onClick={() => changeImageIndex(currentImageIndex+1)} disabled={currentImageIndex===imageObjects.length-1}/>
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
