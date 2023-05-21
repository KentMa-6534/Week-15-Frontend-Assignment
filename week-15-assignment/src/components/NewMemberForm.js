import React from "react";
import { useEffect, useState } from "react";

function NewMemberForm() {
  const API_URL = "https://646813e060c8cb9a2ca2bb6b.mockapi.io/members";
  const [members, setMembers] = useState([{}]);

  //State Variables for POSTing and PUTing functions

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  function getMembers() {
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => setMembers(data));
  }

  useEffect(() => {
    getMembers();
  }, []);

  function deleteMember(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getMembers());
  }

  function updateMember(e, memberObject) {
    e.preventDefault();

    let updatedMemberObject = {
      ...memberObject,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
    };

    fetch(`${API_URL}/${memberObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMemberObject),
    }).then(() => getMembers());
  }

  function postNewMember(e) {
    e.preventDefault();

    console.log(newFirstName, newLastName, newEmail);

    let data = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => getMembers());
  }
  function handleClick() {
    console.log("Hello");
  }
  return (
    /*Form to add new members and list of members. If there are no members in the list displayed, a message will be shown stating that the array is empty. */
    <div>
      <div className="container bg-light mb-3">
        <br></br>
        <div className="form-group">
          <h2>Chess Club Sign Up Form ♟</h2>
          <div className="row">
            <div className="col-md">
              <label for="firstName">First Name</label>
              <input
                onChange={(e) => setNewFirstName(e.target.value)}
                className="form-control"
                placeholder="Enter your first name..."
              ></input>
            </div>
            <div className="col-md">
              <label for="firstName">Last Name</label>
              <input
                onChange={(e) => setNewLastName(e.target.value)}
                className="form-control"
                placeholder="Enter your last name..."
              ></input>
            </div>
            <div className="row">
              <div className="col-md">
                <label for="firstName">Email Address</label>
                <input
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email address..."
                ></input>
              </div>
            </div>
          </div>
          <div className="row py-3">
            <div>
              <button
                onClick={(e) => postNewMember(e)}
                className="btn btn-primary col-md form-control"
                id="addMember"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div>
        <div className="bg-light container-md py-3">
          {members && members.length > 0 ? (
            <div>
              <h2>Members:</h2>
              <table id="memberList" className="table bg-light table-striped">
                <thead>
                  <th>First Name:</th>
                  <th>Last Name:</th>
                  <th>Email Address:</th>
                  <th>Actions:</th>
                </thead>
                {members.map((member, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{member.firstName}</td>
                      <td>{member.lastName}</td>
                      <td>{member.email}</td>
                      <td>
                        {" "}
                        <form className="py-3">
                          <label>Update First Name</label>
                          <input onChange={(e) => setUpdatedFirstName(e.target.value)} className="form-control"
                          placeholder="Enter First Name..."
                          ></input>
                          <label>Update Last Name</label>
                          <input onChange={(e) => setUpdatedLastName(e.target.value)} className="form-control"
                          placeholder="Enter Last Name..."
                          ></input>
                          <label>Update Email Address</label>
                          <input onChange={(e) => setUpdatedEmail(e.target.value)} className="form-control"
                          placeholder="Enter Email Address..."
                          ></input>
                        </form>
                      </td>
                      <td>
                        <button
                        onClick={(e) => updateMember(e, member)}
                        className="btn bg-primary text-white col-md">
                            Update
                          </button>
                          &nbsp;
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="btn bg-danger text-white col-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <h2>No data available.</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewMemberForm;
