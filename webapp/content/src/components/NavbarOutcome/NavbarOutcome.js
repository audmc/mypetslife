import React from "react";
import "./NavbarOutcome.css";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function NavbarOutcome(props) {
  const { fetchedPetInfo } = props;

  function handleChangePetId(pet_id) {
    props.onChange(pet_id);
  }
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col className="nav-outcome-container" xs={12} mg={6}>
            <div className="unionBar">
              <div className="outcome-global-user">
                <p
                  className="fa-user-Global"
                  onClick={() => handleChangePetId("")}
                >
                  <i className="fas fa-user" />
                  {t("outcomeSpace.outcomeNavbar.global")}
                </p>
                {Object.keys(fetchedPetInfo).map((names, i) => (
                  <p 
                    key={i}
                    className="fa-user-Paw"
                    onClick={() => handleChangePetId(fetchedPetInfo[names]._id)}
                  >
                    <i className="fas fa-paw" />
                    {fetchedPetInfo[names].name}
                  </p>
                ))}
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  );
}
