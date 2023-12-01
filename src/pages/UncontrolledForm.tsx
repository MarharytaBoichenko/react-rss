const Gender = {
  MALE: 'male',
  FEMALE: 'female',
};

const UncontrolledForm = () => {
  return (
    <main>
      <h2>UncontrolledForm</h2>
      <form>
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" placeholder="name" />
        </label>
        <label htmlFor="age">
          Age
          <input type="number" name="age" id="age" placeholder="age" />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" placeholder="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" placeholder="password" />
        </label>
        <label htmlFor="password-second">
          Repeat password
          <input
            type="password"
            name="password-second"
            id="password-second"
            placeholder="password"
          />
        </label>
        <div>
          <h3>Choose your gender</h3>
          <label htmlFor="gender">
            Female
            <input type="radio" name="gender" id="gender" value={Gender.FEMALE} />
          </label>
          <label htmlFor="gender">
            Male
            <input type="radio" name="gender" id="gender" value={Gender.MALE} />
          </label>
        </div>
        <label htmlFor="">
          I agree with terms and conditions
          <input type="checkbox" name="agreement" />
        </label>
        {/* <label htmlFor="">
          <input type="" name="image" />
        </label>
        <label htmlFor="">
          <input type="" name="country" />
        </label> */}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default UncontrolledForm;
