import React, { useContext } from 'react';
import FormContext from '../contexts/FormContext';

const FormComponent = () => {
  const { name, email, phone, message } = useContext(FormContext);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default FormComponent;