//% fixedInstances
class TeamData {
    constructor(
        public readonly name: string,
        public readonly abbreviation: string,
        public readonly colorOne: number,
        public readonly colorTwo: number
    ) { }
}

namespace league {
    //% fixedInstance whenUsed block="Arizona Cardinals"
    export const arizonaCardinals = new TeamData("Arizona Cardinals", "ARI", 0x97233F, 0xFFB612);

    //% fixedInstance whenUsed block="Atlanta Falcons"
    export const atlantaFalcons = new TeamData("Atlanta Falcons", "ATL", 0xA71930, 0xA5ACAF);

    //% fixedInstance whenUsed block="Baltimore Ravens"
    export const baltimoreRavens = new TeamData("Baltimore Ravens", "BAL", 0x241773, 0x9E7C0C);

    //% fixedInstance whenUsed block="Buffalo Bills"
    export const buffaloBills = new TeamData("Buffalo Bills", "BUF", 0x00338D, 0xC60C30);

    //% fixedInstance whenUsed block="Carolina Panthers"
    export const carolinaPanthers = new TeamData("Carolina Panthers", "CAR", 0x0085CA, 0xBFC0BF);

    //% fixedInstance whenUsed block="Chicago Bears"
    export const chicagoBears = new TeamData("Chicago Bears", "CHI", 0x0B162A, 0xC83803);

    //% fixedInstance whenUsed block="Cincinnati Bengals"
    export const cincinnatiBengals = new TeamData("Cincinnati Bengals", "CIN", 0xFB4F14, 0x000000);

    //% fixedInstance whenUsed block="Cleveland Browns"
    export const clevelandBrowns = new TeamData("Cleveland Browns", "CLE", 0xFF3C00, 0x311D00);

    //% fixedInstance whenUsed block="Dallas Cowboys"
    export const dallasCowboys = new TeamData("Dallas Cowboys", "DAL", 0x003594, 0x041E42);

    //% fixedInstance whenUsed block="Denver Broncos"
    export const denverBroncos = new TeamData("Denver Broncos", "DEN", 0xFB4F14, 0x002244);

    //% fixedInstance whenUsed block="Detroit Lions"
    export const detroitLions = new TeamData("Detroit Lions", "DET", 0x0076B6, 0xB0B7BC);

    //% fixedInstance whenUsed block="Green Bay Packers"
    export const greenBayPackers = new TeamData("Green Bay Packers", "GB", 0x203731, 0xFFB612);

    //% fixedInstance whenUsed block="Houston Texans"
    export const houstonTexans = new TeamData("Houston Texans", "HOU", 0x03202F, 0xA71930);

    //% fixedInstance whenUsed block="Indianapolis Colts"
    export const indianapolisColts = new TeamData("Indianapolis Colts", "IND", 0x002C5F, 0xA2AAAD);

    //% fixedInstance whenUsed block="Jacksonville Jaguars"
    export const jacksonvilleJaguars = new TeamData("Jacksonville Jaguars", "JAX", 0xD7A22A, 0x006778);

    //% fixedInstance whenUsed block="Kansas City Chiefs"
    export const kansasCityChiefs = new TeamData("Kansas City Chiefs", "KC", 0xE31837, 0xFFB81C);

    //% fixedInstance whenUsed block="Los Angeles Chargers"
    export const losAngelesChargers = new TeamData("Los Angeles Chargers", "LAC", 0x002A5E, 0xFFC20E);

    //% fixedInstance whenUsed block="Los Angeles Rams"
    export const losAngelesRams = new TeamData("Los Angeles Rams", "LA", 0x002244, 0x866D4B);

    //% fixedInstance whenUsed block="Miami Dolphins"
    export const miamiDolphins = new TeamData("Miami Dolphins", "MIA", 0x008E97, 0xFC4C02);

    //% fixedInstance whenUsed block="Minnesota Vikings"
    export const minnesotaVikings = new TeamData("Minnesota Vikings", "MIN", 0x4F2683, 0xFFC62F);

    //% fixedInstance whenUsed block="New England Patriots"
    export const newEnglandPatriots = new TeamData("New England Patriots", "NE", 0x002244, 0xC60C30);

    //% fixedInstance whenUsed block="New Orleans Saints"
    export const newOrleansSaints = new TeamData("New Orleans Saints", "NO", 0xD3BC8D, 0x101820);

    //% fixedInstance whenUsed block="New York Giants"
    export const newYorkGiants = new TeamData("New York Giants", "NYG", 0x0B2265, 0xA71930);

    //% fixedInstance whenUsed block="New York Jets"
    export const newYorkJets = new TeamData("New York Jets", "NYJ", 0x125740, 0x000000);

    //% fixedInstance whenUsed block="Oakland Raiders"
    export const oaklandRaiders = new TeamData("Oakland Raiders", "OAK", 0x000000, 0xA5ACAF);

    //% fixedInstance whenUsed block="Philadelphia Eagles"
    export const philadelphiaEagles = new TeamData("Philadelphia Eagles", "PHI", 0x004C54, 0xACC0C6);

    //% fixedInstance whenUsed block="Pittsburgh Steelers"
    export const pittsburghSteelers = new TeamData("Pittsburgh Steelers", "PIT", 0xFFB612, 0x003087);

    //% fixedInstance whenUsed block="Seattle Seahawks"
    export const seattleSeahawks = new TeamData("Seattle Seahawks", "SEA", 0x002244, 0x69BE28);

    //% fixedInstance whenUsed block="San Francisco 49ers"
    export const sanFrancisco49ers = new TeamData("San Francisco 49ers", "SF", 0xAA0000, 0xB3995D);

    //% fixedInstance whenUsed block="Tampa Bay Buccaneers"
    export const tampaBayBuccaneers = new TeamData("Tampa Bay Buccaneers", "TB", 0xD50A0A, 0xFF7900);

    //% fixedInstance whenUsed block="Tennessee Titans"
    export const tennesseeTitans = new TeamData("Tennessee Titans", "TEN", 0x0C2340, 0x418FDE);

    //% fixedInstance whenUsed block="Washington Redskins"
    export const washingtonRedskins = new TeamData("Washington Redskins", "WAS", 0x773141, 0xFFB612);
}