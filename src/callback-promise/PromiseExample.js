import React, { useEffect, useState } from 'react';

export default function PromiseExample() {

    const [userData, setUserData] = useState();
    const [userName, setUserName] = useState();
    const [userJob, setUserJob] = useState();

    useEffect(() => {
        console.log("Promise: ", getUserData());
        getUserData().then(
            user => {
                console.log("First call: ", user)
                getUserData().then(user1 => {
                    console.log("second call: ", user1);
                    getUserData().then(user2 => {
                        console.log("third call:", user2);
                    })
                })
            }
        ).catch(error => {
            console.log("Error", error);
        })
    }, [])

    const getUserData = (callback) => {

        return new Promise((resolve, reject) => {


            // AJAX ----- asyncronous javasgit gitcript xml

            // XML looks like HTML. It has some restrictuion and it is also heavy
            // so we should use JSON to transfer data and get the data

            // JSON --------------> JavaScript Object Notation
            // JSON is lighweight 

            // XHR -> XML Http Request

            const xhrUserData = new XMLHttpRequest();
            console.log("opening the connection");
            // API methods : PUT, GET, POST, PATCH, DELETE
            xhrUserData.open("GET", "https://reqres.in/api/users?page=1?delay=40");

            console.log("Make the call API");
            xhrUserData.send();

            // ReadyStateChange
            // it will call every time when ready state change
            // it have 4 state 
            // if state == 4 then our api call finished
            xhrUserData.addEventListener("readystatechange", function () {
                console.log("Ready state chnage", this.readyState);
                if (this.readyState === 4) {
                    console.log("status ", this.status);
                    if (this.status !== 200) {
                        reject();
                    } else {

                        // console.log("text: ", this.responseText);
                        // console.log("type of response Text");
                        // console.log(typeof this.responseText);
                        // console.log("type of json resonse type", typeof JSON.parse(this.responseText));
                        // console.log("json resonse type", JSON.parse(this.responseText));
                        const user = JSON.parse(this.responseText);
                        setUserData(user);
                        resolve(user);
                    }
                }
            })
        })
    }

    const postObject = {
        name: userName,
        job: userJob
    }
    function createUserClickHandler() {
        console.log("postData", postObject);
        console.log("new user api call");
        console.log(userName, userJob);
        const xhrUserData = new XMLHttpRequest();
        xhrUserData.open("POST", "https://reqres.in/api/users");
        xhrUserData.send(JSON.stringify(postObject));

        xhrUserData.addEventListener("readystatechange", function () {
            console.log("Ready state chnage", this.readyState);
            if (this.readyState === 4) {
                console.log("status ", this.status);
                console.log("text: ", this.responseText);
                console.log("type of response Text");
                console.log(typeof this.responseText);
                console.log("type of json resonse type", typeof JSON.parse(this.responseText));
                console.log("json resonse type", JSON.parse(this.responseText));
                // const user = JSON.parse(this.responseText);
                // setUserData(user);

            }
        })

    }

    function nameOnChangeClickHandler(event) {
        setUserName(event.target.value);

    }

    function jobOnChangeClickHandler(event) {
        setUserJob(event.target.value);
    }

    return (
        <div>
            Here is the data
            <p>{JSON.stringify(userData)}</p>

            <div>
                To add new user
                <label>Name</label>
                <input type="text" id="name" value={userName} onChange={nameOnChangeClickHandler} />
                <label>Job</label>
                <input type="text" id="job" value={userJob} onChange={jobOnChangeClickHandler} />
                <button onClick={createUserClickHandler}>Create User</button>
            </div>
        </div>
    )
}
