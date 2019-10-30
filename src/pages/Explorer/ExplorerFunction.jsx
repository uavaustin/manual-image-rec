import React from 'react';
import { Container, Header, Grid, Card, Icon, Table, Image, Button } from 'semantic-ui-react';
import TestImage from '../imagery/background_target.jpg'
import image1 from './images/image-1.jpg'
import image2 from './images/image-2.jpg'
import image3 from './images/image-3.jpg'
import image4 from './images/image-4.jpg'

let currentImageIndex = 0
const images = [image1, image2, image3, image4]

const TableItems = images.map((image, index) =>
  <Table.Row key={index}>
    {index === currentImageIndex
      ? <Table.Cell active>
          <Icon name='picture' /> Image {index+1}
        </Table.Cell>
      : <Table.Cell>
          <Icon name='picture' /> Image {index+1}
        </Table.Cell>
    }

  </Table.Row>
)

function handleClick(){
  console.log('Hello world')
}

console.log(TableItems)

// const FillerTableItem = (props) => ( //made this so I wouldn't have to copy and paste it so many times. It might be beneficial to make it into a class component later
//     <Table.Row>
//       <Table.Cell>
//         <Icon name='picture' /> {props.name}
//       </Table.Cell>
//     </Table.Row>
// )

const Explorer = () => (
  <Container id='page' fluid>
    <Header as='h1'>Explorer</Header>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width="3">
            <div style={{height: '81vh', overflowY: 'auto'}}>
              <Table celled striped>
                <Table.Body>
                    {TableItems}
                </Table.Body>
              </Table>
            </div>
          </Grid.Column>
          <Grid.Column width="12">
            <Card fluid image={images[currentImageIndex]} description='Image 1' />
            <Card.Content extra style={{display:'flex', justifyContent: 'space-between'}}>
                <Button name='left-button' icon='arrow left' onClick={handleClick}/>
                <Button name='right-button' icon='arrow right' onClick={handleClick}/>
            </Card.Content>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  </Container>
);

export default Explorer;
