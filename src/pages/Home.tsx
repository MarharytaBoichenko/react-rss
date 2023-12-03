import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import Card from '../components/Card';
import styles from '../App.module.css';
const Home = () => {
  const { list } = useAppSelector((state) => state.formControlled);
  console.log(list);
  const newCardIndex = list.length - 1;
  console.log(newCardIndex);

  return (
    <div>
      <div>
        <Link to="/controlled">Go to React Hook Form</Link>
        <br />
        <Link to="/uncontrolled">Go to Uncontrolled Form</Link>
        <h2>Data from Forms</h2>
        {list &&
          list.map(
            (
              { name, age, password, country, gender, image, agreement, id, email, passwordsecond },
              index
            ) => (
              <Card
                index={index}
                key={id}
                name={name}
                age={age}
                password={password}
                country={country}
                gender={gender}
                image={image}
                agreement={agreement}
                email={email}
                passwordsecond={passwordsecond}
              />
            )
          )}
      </div>
      {/* <div>
        <Link to="/uncontrolled">Go to Uncontrolled Form</Link>
        <h2>Data from Uncontrolled Form</h2>
      </div> */}
    </div>
  );
};

export default Home;
