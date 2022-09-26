import React, { useEffect, useState } from 'react';
import style from '../style/manage-users.module.css';
import moment from 'moment/moment';
import { useGlobalContext } from '../context';
import { useParams, useNavigate } from 'react-router-dom';
function ManageUsers() {
  const navigate = useNavigate();
  const { setUsers, users } = useGlobalContext();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [dob, setDOB] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [id, setId] = useState(null);

  const { uid } = useParams();

  function editUser() {
    const local = JSON.parse(localStorage.getItem('userr'));
    const foundUser = local.filter((user) => user.id === id);
    if (foundUser.length === 0) {
      alert(`No such user of id ${uid}`);
      // navigate('/', { replace: true });
    } else {
      const { fname, lname, dob, marital } = foundUser[0];
      setFname(fname);
      setLname(lname);
      setMaritalStatus(marital);
      setDOB(moment(new Date(dob)).format('YYYY-MM-DD'));
    }
  }

  function handleEdit() {
    const local = JSON.parse(localStorage.getItem('userr'));
    const userArray = local.map((user) => {
      if (user.id === id) {
        user.fname = fname;
        user.lname = lname;
        user.dob = dob;
        user.marital = maritalStatus;
        return user;
      }
      return user;
    });
    localStorage.setItem('userr', JSON.stringify(userArray));
    //update state
    setUsers(userArray);
  }

  function clearData() {
    setFname('');
    setLname('');
    setDOB('');
    setMaritalStatus('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (fname.trim().length < 2) {
      alert('First name should be greater than 2');
      return;
    } else if (lname.trim().length < 2) {
      alert('Last name should be greater than 2');
      return;
    } else if (dob === 'Invalid date' || dob === null) {
      alert('Please select date of birth');
    } else if (maritalStatus.trim() === '' || maritalStatus === null) {
      alert('Please select marital status');
    } else {
      //if user is in edit mode then update
      if (id) {
        handleEdit();
        console.log(dob);
        alert('Edieted successfully');
        clearData();
        return;
      }

      //get the id of last user to increment
      if (users.length > 0) {
        var { id: lastID } = users[users.length - 1];
      } else {
        var lastID = 0;
      }

      // push into local storage
      const local = JSON.parse(localStorage.getItem('userr'));
      console.log(local);
      local.push({ fname, lname, dob, id: lastID + 2, marital: maritalStatus });

      //update state
      setUsers(local);
      localStorage.setItem('userr', JSON.stringify(local));

      alert('User added sucessfully');

      // clear user details
      clearData();
    }
  }

  function deleteUser() {
    const local = JSON.parse(localStorage.getItem('userr'));
    const sortedArray = local.filter((user) => user.id !== id);
    localStorage.setItem('userr', JSON.stringify(sortedArray));
    //update state
    setUsers(sortedArray);
  }
  useEffect(() => {
    setId(Number(uid));
    if (id) {
      editUser();
    }
  }, [id]);

  return (
    <section className={style.container}>
      <article className={style.form_wrapper}>
        <header style={{ textAlign: 'center', margin: '10px auto' }}>
          {id ? <h2>EDIT MODE ON</h2> : <h2>ADD NEW USER</h2>}
        </header>
        <form action="#" onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              value={fname}
              onChange={(ev) => {
                setFname(ev.target.value);
              }}
              placeholder="required*"
            />
          </div>
          <div>
            <label htmlFor="lname"> Last Name</label>
            <input
              type="text"
              id="lname"
              placeholder="required*"
              value={lname}
              onChange={(ev) => setLname(ev.target.value)}
            />
          </div>
          <div>
            <input
              onChange={(ev) => setMaritalStatus(ev.target.value)}
              name="marital"
              id="single"
              value="Single"
              type="radio"
              checked={maritalStatus === 'Single' ? true : false}
            />
            <label htmlFor="single">Single</label>
            <input
              onChange={(ev) => setMaritalStatus(ev.target.value)}
              name="marital"
              id="married"
              value="Married"
              type="radio"
              checked={maritalStatus === 'Married' ? true : false}
            />
            <label htmlFor="married">Married</label>
            <input
              onChange={(ev) => setMaritalStatus(ev.target.value)}
              name="marital"
              id="divorced"
              value="Divorced"
              checked={maritalStatus === 'Divorced' ? true : false}
              type="radio"
            />
            <label htmlFor="divorced">Divorced</label>
          </div>
          <div>
            <label htmlFor="dob">Date of birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={dob}
              onChange={(ev) =>
                setDOB(moment(new Date(ev.target.value)).format('YYYY-MM-DD'))
              }
            />
          </div>
          <div>
            <button type="submit" className={style.success}>
              {id ? 'Update' : 'Save'}
            </button>
            {id ? (
              <button onClick={() => deleteUser()} className={style.warning}>
                Delete
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </article>
    </section>
  );
}

export default ManageUsers;
