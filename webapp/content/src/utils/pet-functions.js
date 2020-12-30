import speciesList from "./species";
import racesList from "./races";
import React from "react";



/**
 * Create select options for species
 * @returns {JSX.Element|unknown[]}
 */
export function getSpeciesOptions(t) {
    try {
        return (
            speciesList.map((item, i) =>
                <option key={i} value={item}>{t("pets:species." + item)}</option>)
        );
    } catch {
        return (
            <option value="" disabled/>
        );
    }
}

/**
 * create select options for races
 * @returns {JSX.Element|*}
 */
export function getRacesOptions(t, species) {
    try {
        return (
            racesList[species].map((item, i) =>
                <option key={i} value={item}>{t("pets:races." + species + "." + item)}</option>)
        );
    } catch {
        return (
            <option value="" disabled/>
        );
    }
}