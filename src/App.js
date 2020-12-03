import { Container, Grid, Grow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Navbar/>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
