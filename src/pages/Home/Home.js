import React from "react";
import { Component } from "react/cjs/react.production.min";

import MyHeatService from "../../services/MyHeatService";

import { Container, Box, BoxTitle, BoxText } from "./HomeStyles";

class Home extends Component {
  constructor(props) {
    super(props);
    this.updateData();
  }

  state = {
    data: [],
    isNew: false
  }

  myHeatService = new MyHeatService();
  
  onDataLoaded = (data) => {
    this.setState({
      data: data.data,
      isNew: data.isNew
    })
  }

  updateData = () => {
      this.myHeatService
          .getAllData()    
          .then(this.onDataLoaded)
  }

  render() {
    const { data, isNew } = this.state;
    console.log(data);
    return (
      <Container>
      {data.map(box => (
        <Box key={box.id}>
          <BoxTitle>{box.name}</BoxTitle>
          <BoxText>id: {box.id}</BoxText>
          <BoxText>temperature: {box.temperature} ℃</BoxText>
        </Box>
      ))}
      </Container>
    );
  }
}

export default Home;
