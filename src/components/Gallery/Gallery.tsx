import React from 'react';
import s from './Gallery.module.css';
import { GalleryItem } from '../GalleryItem/GalleryItem';

type GalleryProps = {
  items: [];
};

export const Gallery = ({ items }: GalleryProps) => {
  return (
    <div>
      <ul className={s.gallery}>
        {items.map(({ name, gender, hair_color, eye_color, mass, created }) => {
          return (
            <li className={s.gallery__item} key={created}>
              <GalleryItem
                name={name}
                gender={gender}
                hair_color={hair_color}
                eye_color={eye_color}
                mass={mass}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// export default class Gallery extends React.Component<GalleryProps, _> {
//   render() {
//     const { items } = this.props;
//     return (
//       <div>
//         <ul className={s.gallery}>
//           {items.map(({ name, gender, hair_color, eye_color, mass, created }) => {
//             return (
//               <li className={s.gallery__item} key={created}>
//                 <GalleryItem
//                   name={name}
//                   gender={gender}
//                   hair_color={hair_color}
//                   eye_color={eye_color}
//                   mass={mass}
//                 />
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }
// }
