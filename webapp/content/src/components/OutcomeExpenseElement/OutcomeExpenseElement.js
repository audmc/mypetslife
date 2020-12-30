import React from "react";
import "../OutcomeExpenseElement/OutcomeExpenseElement.css";
import "../../css/index.css";
import { Col, Row, Figure, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import defaultPetIcon from "../../svg/mpl-pet-icon.svg";
import groomers from "../../svg/outcome/groomers-icon.svg";
import other from "../../svg/outcome/other-icon.svg";
import accessories from "../../svg/outcome/accessories-icon.svg";

export default function OutcomeExpenseElement(props) {
  const { fetchedOutcome, fetchedPetInfo, outcomePetId } = props;

  function handleChangeOutcomeId(outcome_id) {
    props.onChangeOutcomeId(outcome_id);
  }

  function displayCategoryIcon() {
    switch (fetchedOutcome.category) {
      case "healthCare":
        return <i className="fas fa-heartbeat" />;

      case "supply":
        return <i className="fas fa-utensils" />;

      case "insurance":
        return <i className="fas fa-file-contract" />;

      case "dailyCare":
        return <i className="fas fa-hand-holding-heart" />;

      case "leisure":
        return <i className="fas fa-volleyball-ball" />;

      case "groomers":
        return <Image src={groomers} height="55%" />;

      case "accessories":
        return <Image src={accessories} height="55%" />;

      case "other":
        return <Image src={other} height="55%" />;

      default:
        return <Image src={other} height="55%" />;
    }
  }

  const { t } = useTranslation();

  return (
    <>
      <Row className="expense-item-container ">
        <Col className="expense-item">
          <Row className="expense-item-flex-container">
            <Col className="expense-item-category-icon" lg={2} sm={3} xs={3}>
              <div className="expense-item-category-icon-div">
                {displayCategoryIcon(fetchedOutcome.category)}
              </div>
            </Col>
            <Col
              className="expense-item-content-main-info firstel"
              lg={3}
              md={3}
              sm={3}
              xs={3}
            >
              <p className="expense-item-elements">{fetchedOutcome.title}</p>
              <p className="expense-item-elements">
                {fetchedOutcome.description}
              </p>
              <p className="expense-item-elements">
                {t(
                  "outcomeSpace.outcomeElement.category." +
                    fetchedOutcome.category
                )}
              </p>
            </Col>

            <Col sm={3} xs={3} className="expense-item-pet-picture">
              {Object.keys(fetchedPetInfo).map(
                (info, i) =>
                  fetchedPetInfo[info]._id === outcomePetId && (
                    <Figure key={i}>
                      <Figure.Image
                        width={90}
                        className={
                          fetchedPetInfo[info].avatar !== ""
                            ? "figure-pet"
                            : "figure-pet-default"
                        }
                        src={
                          fetchedPetInfo[info].avatar !== ""
                            ? fetchedPetInfo[info].avatar
                            : defaultPetIcon
                        }
                        draggable={false}
                      />
                      <Figure.Caption className="figure-pet-name">
                        {fetchedPetInfo[info].name}
                      </Figure.Caption>
                    </Figure>
                  )
              )}
            </Col>
            <Col
              lg={3}
              md={3}
              sm={3}
              xs={3}
              className="expense-item-secondelement"
            >
              <p className="value-item">{fetchedOutcome.value} €</p>
              <p className="expense-item-elements">
                {t(
                  "outcomeSpace.outcomeElement.paymentType." +
                    fetchedOutcome.payment_type
                )}
              </p>
              <p className="expense-item-elements">
                {t(
                  "outcomeSpace.outcomeElement.frequency." +
                    fetchedOutcome.frequency
                )}
              </p>
              <p className="expense-item-elements">
                {new Date(fetchedOutcome.date).toLocaleDateString()}
              </p>
            </Col>
            <Col className="action-icon-col" lg={1} sm={12} xs={12}>
              <i className="far fa-edit action-icon action-icon-first" />
              <i className="far fa-trash-alt action-icon action-icon-second" />
              <i
                onClick={() => handleChangeOutcomeId(fetchedOutcome._id)}
                className="far fa-file-alt action-icon action-icon-last"
              />
            </Col>
          </Row>
          <Row>
            <Col />
            <Col />
            <Col />
          </Row>
        </Col>
      </Row>
    </>
  );
}
