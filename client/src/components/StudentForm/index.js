import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_STUDENT } from '../../utils/mutations';

const StudentForm = ({ userId }) => {
  const [studentname, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addStudent, { error }] = useMutation(ADD_STUDENT);
console.log(userId);
  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 50) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
console.log(studentname);
    try {
      await addStudent({
        variables: { userId,studentname }
      });

      // clear form value
      setBody('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 50 || error ? 'text-error' : ''}`}>
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form 
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
      <div class="info-list ">
        <input
          placeholder="Sudent name"
          value={studentname}
          className="form-input col-12 col-md-5 "
          onChange={handleChange}
        ></input>

        <button className="btn tablebtn col-12 col-md-3" type="submit">
          Add Student
        </button>
        </div>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default StudentForm;
