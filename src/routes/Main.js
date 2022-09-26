import React, { useState } from 'react';
import main from '../style/main.module.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import EmptyList from './EmptyList';
function Main() {
  const { users } = useGlobalContext();
  return (
    <main className={main.container}>
      <nav>
        <Link to="manage-users/add">
          <button>Add User</button>
        </Link>
      </nav>
      <header className={`${main.row} ${main.header}`}>
        <div>ID</div>
        <div>First Name</div>
        <div>last Name</div>
        <div>Marital Status</div>
        <div>Date of Birth</div>
        <div> Manage data</div>
      </header>
      {users.length == 0 ? (
        <EmptyList />
      ) : (
        users.map((user) => {
          return <Row key={user.id} {...user} />;
        })
      )}
    </main>
  );
}

function Row({ fname, lname, id, marital, dob }) {
  return (
    <article className={main.row}>
      <div>{id}</div>
      <div>{fname}</div>
      <div>{lname}</div>
      <div>{marital}</div>
      <div>{dob}</div>
      <div>
        <Link to={`/manage-users/${id}`}>edit</Link>
      </div>
    </article>
  );
}
export default Main;
