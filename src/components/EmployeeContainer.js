import React, { useState, useEffect } from "react";
import Table from "./Table";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/EmployeeContainer.css";
import DataAreaContext from "../utils/DataAreaContext";

const EmployeeContainer = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: "descend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%", order: "descend" },
      { name: "name", width: "10%", order: "descend" },
      { name: "phone", width: "20%", order: "descend" },
      { name: "email", width: "20%", order: "descend" },
      { name: "dob", width: "10%", order: "descend" },
    ],
  });

  const handleSort = (heading) => {
    let currentOrder = developerState.headings
      .filter((elem) => elem.name === heading)
      .map((elem) => elem.order)
      .toString();

    if (currentOrder === "descend") {
      currentOrder = "ascend";
    } else {
      currentOrder = "descend";
    }

    const compareFnc = (a1, b1) => {
      let a = a1;
      let b = b1;
      if (currentOrder === "descend") {
        a = b1;
        b = a1;
      }

      if (a[heading] === undefined) {
        return 1;
      } else if (b[heading] === undefined) {
        return -1;
      }
      if (heading === "name") {
        return a[heading].first.localeCompare(b[heading].first);
      }
      if (heading === "dob") {
        return a[heading].age - b[heading].age;
      }
    };

    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    if (developerState.headings) {
      const updatedHeadings = developerState.headings.map((elem) => {
        elem.order = elem.name === heading ? currentOrder : elem.order;
        return elem;
      });

      setDeveloperState({
        ...developerState,
        filteredUsers: sortedUsers,
        headings: updatedHeadings,
      });
    }
  };

  const handleSearchChange = (event) => {
    const filter = event.target.value;
    // const filteredList = developerState.users.filter((item) => {
    //   let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
    //   console.log(filter, values);
    //   if (values.indexOf(filter.toLowerCase()) !== -1) {
    //     return item;
    //   }
    // });
    const filteredList = developerState.users.filter(
      (item) =>
        (item.name.first.toLowerCase() + " " + item.name.last.toLowerCase()).indexOf(filter.toLowerCase()) !== -1
    );

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  ///https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once

  useEffect(() => {
    API.getUsers().then((results) => {
      console.log(results.data.results);
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results,
      });
    });
  },[]);

  return (
    <>
      <DataAreaContext.Provider value={[ developerState, handleSearchChange, handleSort ]}>
        <Nav />
        <div className="data-area">{developerState.filteredUsers.length > 0 ? <Table /> : <></>}</div>
        {/* <div className="data-area">{developerState.filteredUsers.length > 0 ? console.log (developerState.filteredUsers) : <></>}</div> */}
      </DataAreaContext.Provider>
    </>
  );
};

export default EmployeeContainer;
