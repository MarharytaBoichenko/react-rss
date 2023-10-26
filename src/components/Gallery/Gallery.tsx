import React from 'react';
import s from './Gallery.module.css';
import GalleryItem from '../GalleryItem/GalleryItem';

type GalleryProps = {
  items: [];
};
type GalleryState = {
  // query: string;
};

export default class Gallery extends React.Component<GalleryProps, GalleryState> {
  render() {
    const { items } = this.props;
    return (
      <div>
        <ul className={s.gallery}>
          {items.map(({ name, created, classification, language, skin_colors }) => {
            return (
              <li className={s.gallery__item} key={created}>
                <GalleryItem
                  name={name}
                  classification={classification}
                  language={language}
                  skin_colors={skin_colors}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
