import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
const Home = () => {
  const { list } = useAppSelector((state) => state.formControlled);
  console.log(list);

  return (
    <div>
      <div>
        <Link to="/controlled">Go to React Hook Form</Link>
        <h2>Data from React Hook Form</h2>
        {list &&
          list.map(({ id, name, email, age, password, gender, agreement }) => (
            <div key={id}>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Email: {email}</p>
              <p>Password: {password}</p>
              <p>Gender: {gender}</p>
              <p>Agreed T&C: {agreement}</p>
              <p>Country:</p>
              <p>Image:</p>
            </div>
          ))}
      </div>
      <div>
        <Link to="/uncontrolled">Go to Uncontrolled Form</Link>
        <h2>Data from Uncontrolled Form</h2>
      </div>
    </div>
  );
};

export default Home;
