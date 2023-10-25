import React from 'react';
import s from './GalleryItem.module.css';

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
      <ul className={s.description}>
        <li>
          <span className={s.label}>Name: </span> {name}
        </li>
        <li>
          <span className={s.label}>Classification: </span>
          {classification}
        </li>
        <li>
          <span className={s.label}>Language: </span>
          {language}
        </li>
        <li>
          <span className={s.label}>Skin colors: </span>
          {skin_colors}
        </li>
      </ul>
    );
  }
}
