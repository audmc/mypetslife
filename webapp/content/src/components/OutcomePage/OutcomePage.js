import React from "react";
import "./OutcomePage.css";
import OutcomeExpenseElement from "../OutcomeExpenseElement/OutcomeExpenseElement";
import "../../css/index.css";
import { Col, Row, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import OutcomeCategoryListFile from "../../utils/outcome-category-list";
import OutcomeSortListFile from "../../utils/outcome-sort-list";
import defaultUserIcon from "../../svg/mpl-user-icon.svg";
import {retrieveLanguage} from "../../utils/user-infos";

export default function OutcomePage(props) {
  let OutcomeCategoryList = OutcomeCategoryListFile[
     retrieveLanguage()
  ].split(",");

  let OutcomeSortList = OutcomeSortListFile[
      retrieveLanguage()
  ].split(",");

  const { fetchedOutcome, userAvatar, fetchedPetInfo } = props;

  const { t } = useTranslation();

  function handleChangePetCategory(category) {
    props.onChangeCategory(category);
  }

  function handleChangeOutcomeId(outcome_id) {
    props.onChangeOutcomeId(outcome_id);
  }

  return (
    <>
      <Row className="outcome-left-side-row">
        <Col md={3} lg={3} className="outcome-left-side-container">
          <div className="outcome-left-side">
            <Row className="d-xs-none outcome-user-avatar">
              <img
                src={userAvatar !== "" ? userAvatar : defaultUserIcon}
                className={
                  userAvatar === "" ? "user-default-image" : "user-image"
                }
                alt="user-avatar"
              />
            </Row>
            <Row className="outcome-pie-chart">
              <p className="outcome-pie-chart-title">
                <i className="fas fa-money-check-alt" />
                {t("outcomeSpace.outcomePieChart.expenseReport")}
              </p>
              <hr className="outcome-pie-chart-line" />
              <div className="outcome-pie-chart-body">
                <p>{t("outcomeSpace.outcomePieChart.month")}</p>
                <div className="outcome-pie-chart-svg">
                  <PieChart
                    data={[
                      { title: "One", value: 60, color: "#E38627" },
                      { title: "Two", value: 15, color: "#C13C37" },
                      { title: "Three", value: 20, color: "#6A2135" },
                    ]}
                  />
                </div>
                <p>Hello</p>
              </div>
            </Row>
          </div>
        </Col>
        <Col className="outcome-page-body" lg={8}>
          <div className="outcome-page-title-expenses">
            <i className="fas fa-list-alt" />
            {t("outcomeSpace.outcomePage.expenses")}
            <Dropdown className="filter-button" as={ButtonGroup}>
              <Button variant="outline">
                {t("outcomeSpace.outcomePage.sorting")}
              </Button>
              <Dropdown.Toggle
                split
                variant="outline"
                id="dropdown-split-basic"
              >
                <i className="fas fa-chevron-down" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(OutcomeSortList).map((outcomeSorting, i) => (
                  <Dropdown.Item key={i} href="#/action-1">
                    {OutcomeSortList[outcomeSorting]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="filter-button" as={ButtonGroup}>
              <Button variant="outline">
                {t("outcomeSpace.outcomePage.category")}
              </Button>
              <Dropdown.Toggle
                split
                variant="outline"
                id="dropdown-split-basic"
              >
                <i className="fas fa-chevron-down" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(OutcomeCategoryList).map((outcomeCategory, i) => (
                  <Dropdown.Item
                    key={i}
                    onClick={() =>
                      handleChangePetCategory(
                        OutcomeCategoryList[outcomeCategory]
                      )
                    }
                  >
                    {OutcomeCategoryList[outcomeCategory]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline"
              className="add-expense-button"
            >
              {t("outcomeSpace.outcomePage.addExpenses")}
            </Button>
            <hr className="outcome-page-title-break" />
            {Object.keys(fetchedOutcome).map((outcome, i) => (
              <OutcomeExpenseElement
                key={i}
                fetchedOutcome={fetchedOutcome[outcome]}
                onChangeOutcomeId={handleChangeOutcomeId}
                outcomePetId={fetchedOutcome[outcome].pet_id}
                fetchedPetInfo={fetchedPetInfo}
              />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
}
