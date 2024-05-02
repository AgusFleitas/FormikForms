import "./App.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function App() {
  const [send, setSend] = useState(false);

  return (
    <div className='app-container'>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        validate={(values) => {
          let errors = {};

          // Validación nombre.
          if (!values.name) {
            errors.name = "Please insert a name.";
          } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,40}$/.test(values.name)) {
            errors.name =
              "The name can only contain uppercase and lowercase letters. It must not contain numbers or special characters.";
          }

          // Validación correo.
          if (!values.email) {
            errors.email = "Please insert your email.";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "The email entered is invalid, please try again.";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          setSend(true);
          setTimeout(() => setSend(false), 5000);
          console.log("Your request has been sended!");
        }}
      >
        {({ errors }) => (
          <Form className='form'>
            <div>
              <h1>
                Formularios con <span>Formik</span>
              </h1>
              <div>
                <label htmlFor='name'>Name:</label>
                <Field
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Robert Smith'
                />
                <ErrorMessage
                  name='name'
                  component={() => <div className='error'>{errors.name}</div>}
                />
              </div>
              <div>
                <label htmlFor='name'>Email:</label>
                <Field
                  type='email'
                  name='email'
                  id='email'
                  placeholder='example123@gmail.com'
                />
                <ErrorMessage
                  name='email'
                  component={() => <div className='error'>{errors.email}</div>}
                />
              </div>
              <div>
                <label htmlFor='country'>Select your country:</label>
                <Field name='country' as='select' className='select-country'>
                  <option value='Spain'>Spain</option>
                  <option value='Argentina'>Argentina</option>
                  <option value='Mexico'>Mexico</option>
                </Field>
              </div>
            </div>
            <button type='submit'>Confirm</button>
            {send && <p className='success'>Form submitted successfully!</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
