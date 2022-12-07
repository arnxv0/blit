import React from "react";
import { BillBoxContainer, HomePageContainer, Title } from "./HomePage.style";
import Header from "../../custom/Header";
import BillCard from "./BillCard";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "styled-components";

function HomePage() {
  const [allBills, setAllBills] = useState([]);
  const theme = useTheme();

  function addBill() {
    const id = Math.random().toString(36).substring(2, 15);
    Swal.fire({
      title: "Enter a name for your bill",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      background: theme.secondaryFontColor,
      color: theme.fontColorOnSecondary,
      // green
      confirmButtonColor: "#00D100",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage(`Please enter a name`);
        } else {
          setAllBills((prev) => [
            {
              id: id,
              name: name,
            },
            ...prev,
          ]);
          return name;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value} created!`,
        });
      }
    });
  }

  return (
    <HomePageContainer>
      <Header />
      {/* <Title>Your Bills</Title> */}
      <BillBoxContainer>
        <BillCard createCard={true} addCard={addBill} />
        {allBills.map((bill) => (
          <BillCard key={bill.id} id={bill.id} name={bill.name} />
        ))}
      </BillBoxContainer>
    </HomePageContainer>
  );
}

export default HomePage;
