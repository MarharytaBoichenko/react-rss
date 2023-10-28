import s from './GalleryItem.module.css';

type ItemProps = {
  name?: string;
  gender?: string;
  hair_color?: string;
  eye_color?: string;
  mass?: string;
};

export const GalleryItem = ({ name, gender, hair_color, eye_color, mass }: ItemProps) => {
  return (
    <ul className={s.description}>
      <li>
        <span className={s.label}>Name: </span> {name}
      </li>
      <li>
        <span className={s.label}>Gender: </span>
        {gender}
      </li>
      <li>
        <span className={s.label}> Hair color: </span>
        {hair_color}
      </li>
      <li>
        <span className={s.label}>Eye color: </span>
        {eye_color}
      </li>
      <li>
        <span className={s.label}>Mass: </span>
        {mass}
      </li>
    </ul>
  );
};

// export default class GalleryItem extends React.Component<ItemProps, _> {
//   render() {
//     const { name, gender, hair_color, eye_color, mass } = this.props;
//     return (
//       <ul className={s.description}>
//         <li>
//           <span className={s.label}>Name: </span> {name}
//         </li>
//         <li>
//           <span className={s.label}>Gender: </span>
//           {gender}
//         </li>
//         <li>
//           <span className={s.label}> Hair color: </span>
//           {hair_color}
//         </li>
//         <li>
//           <span className={s.label}>Eye color: </span>
//           {eye_color}
//         </li>
//         <li>
//           <span className={s.label}>Mass: </span>
//           {mass}
//         </li>
//       </ul>
//     );
//   }
// }
