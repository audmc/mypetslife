import React, { useState, useEffect } from "react";
import NavbarOutcome from "../components/NavbarOutcome/NavbarOutcome";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import OutcomePage from "../components/OutcomePage/OutcomePage";

import { retrievedFromJwt } from "../utils/user-infos";
import apioutcome from "../utils/api-outcome";
import { useAuth } from "../context/auth";

export default function Outcome(props) {
  const { authTokens } = useAuth();
  const [userId, setUserId] = useState("");
  const [fetchedPetId, setFetchedPetId] = useState("");
  const [fetchedCategory, setFetchedCategory] = useState("");
  const [outcomeId, setOutcomeId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [fetchedPetInfo, setFetchedPetInfo] = useState({ name: "" });
  const [fetchedOutcome, setFetchedOutcome] = useState({ name: "" });

  function handleChangeOutcomeId(newOutcomeId) {
    setOutcomeId(newOutcomeId);
    localStorage.setItem("outcome_id", outcomeId);
  }

  function handleChangePetId(newPetId) {
    setFetchedPetId(newPetId);
    apioutcome
      .getPetOutcome(userId, newPetId, fetchedCategory)
      .then((result) => {
        if (result.status === 200) {
          setFetchedOutcome(result.data.outcome);
        }
      });
  }
  function handleChangePetCategory(newPetCategory) {
    setFetchedCategory(newPetCategory);
    apioutcome
      .getPetOutcome(userId, fetchedPetId, newPetCategory)
      .then((result) => {
        if (result.status === 200) {
          setFetchedCategory(result.data.outcome);
        }
      });
  }
  useEffect(() => {
    if (
      retrievedFromJwt(authTokens) !== null &&
      retrievedFromJwt(authTokens) !== undefined
    ) {
      setUserId(retrievedFromJwt(authTokens)._id);
      setUserAvatar(retrievedFromJwt(authTokens).avatar);
    }
    apioutcome
      .getPetOutcome(userId, "")
      .then((result) => {
        if (result.status === 200) {
            setFetchedOutcome(result.data.outcome);
        }
      });
    apioutcome
      .getPetsName(userId)
      .then((result) => {
        if (result.status === 200) {
          setFetchedPetInfo(result.data.petsname);
        }
      });
  }, [userId, setFetchedOutcome, setFetchedPetInfo, setUserId, authTokens]);

  return (
    <>
      <NavbarTop isConnected={authTokens} isWelcomePage={false} />
      <div className="outcome-background full-page-w-nav">
        <NavbarOutcome
          userId={userId}
          value={fetchedPetId}
          onChange={handleChangePetId}
          fetchedPetInfo={fetchedPetInfo}
        />
        <OutcomePage
          userId={userId}
          userAvatar={userAvatar}
          fetchedOutcome={fetchedOutcome}
          fetchedCategory={fetchedCategory}
          onChangeCategory={handleChangePetCategory}
          onChangeOutcomeId={handleChangeOutcomeId}
          outcomeId={outcomeId}
          fetchedPetInfo={fetchedPetInfo}
        />
      </div>
    </>
  );
}
