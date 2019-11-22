import React, { createContext } from 'react'

export const ImageContext = createContext();

class ImageContextProvider extends React.Component {
  state = {
    currentImageIndex: 0,
    importedImageList: []
  }

  changeImageIndex = (newIndex) => {
    this.setState({ currentImageIndex: newIndex})
  }

  render () {
    return(
      <ImageContext.Provider value={{...this.state, changeImageIndex: this.changeImageIndex}}>
        {this.props.children}
      </ImageContext.Provider>
    )
  }
}

export default ImageContextProvider;
