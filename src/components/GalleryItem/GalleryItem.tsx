import React from 'react';
// import s from './GalleryItem.module.css';

type ItemProps = {
  name?: string;
  classification?: string;
  language?: string;
  skin_colors?: string;
};
type ItemState = {
  // query: string;
};

export default class GalleryItem extends React.Component<ItemProps, ItemState> {
  render() {
    const { name, classification, language, skin_colors } = this.props;
    return (
      <ul>
        <li> {name}</li>
        <li>{classification}</li>
        <li>{language}</li>
        <li>{skin_colors}</li>
      </ul>
    );
  }
}
