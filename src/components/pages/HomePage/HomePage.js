import React, { useEffect } from "react";
import { BillBoxContainer, HomePageContainer, Title } from "./HomePage.style";
import Header from "../../custom/Header";
import BillCard from "./BillCard";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "styled-components";
import {
  getAllBillsInLocalStorage,
  updateAllBillsInLocalStorage,
} from "../../../services/LocalStorage.service";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [allBills, setAllBills] = useState(getAllBillsInLocalStorage());
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    updateAllBillsInLocalStorage(allBills);
  }, [allBills]);

  function deleteBill(id) {
    setAllBills((prev) => prev.filter((bill) => bill.id !== id));
  }

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
              date: Date.now(),
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
          background: theme.secondaryFontColor,
          color: theme.fontColorOnSecondary,
          // green
          confirmButtonColor: "#00D100",
          cancelButtonColor: "#d33",
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
          <BillCard
            key={bill.id}
            details={bill}
            onClick={() => navigate(`/bill/${bill.id}`)}
          />
        ))}
      </BillBoxContainer>
    </HomePageContainer>
  );
}

export default HomePage;
