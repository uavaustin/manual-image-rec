import React from 'react';
import { Container, Header, Grid, Card, Icon, Table} from 'semantic-ui-react';
import TestImage from './imagery/background_target.jpg'

const FillerTableItem = () => ( //made this so I wouldn't have to copy and paste it so many times. It might be beneficial to make it into a class component later
    <Table.Row>
      <Table.Cell>
        <Icon name='picture' /> Image1
      </Table.Cell>
    </Table.Row>
)

const Explorer = () => (
  <Container id='page' fluid>
    <Header as='h1'>Explorer</Header>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width="3">
            <div style={{height: '81vh', overflowY: 'scroll'}}>
              <Table celled striped>
                <Table.Body>
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                    <FillerTableItem />
                </Table.Body>
              </Table>
            </div>
          </Grid.Column>
          <Grid.Column width="12">
            <Card image={TestImage} fluid description='Image 1'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  </Container>
);

export default Explorer;
