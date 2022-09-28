"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSeedInputs = void 0;
// import add patient functions here to seed. then run the function in node
// build this as a test file later
const modeltypes_1 = require("../types/modeltypes");
const __1 = require("../");
const buildSeedInputs = (user) => {
    let i = 0;
    let j = randomString.length;
    const buildStringInput = () => {
        if (i == randomString.length - 10) {
            i = i / 2;
            j = i / 4;
        }
        i += 1;
        j -= 1;
        const newString = randomString.slice(i, i + 4) + randomString.slice(j - 3, j);
        return newString;
    };
    function randomDate(start = new Date(2018, 0, 1), end = new Date()) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const users = [];
    const patients = [];
    const prescriptions = [];
    const newProvider = user.type === modeltypes_1.UserType.Provider
        ? user
        : {
            email: `${buildStringInput()}@${buildStringInput()}`,
            firstName: buildStringInput(),
            lastName: buildStringInput(),
            dateCreated: randomDate(),
            patients: [],
            type: modeltypes_1.UserType.Provider,
        };
    const newPharmacist = user.type === modeltypes_1.UserType.Pharmacist
        ? user
        : {
            email: `${buildStringInput()}@${buildStringInput()}`,
            firstName: buildStringInput(),
            lastName: buildStringInput(),
            dateCreated: randomDate(),
            patients: [],
            type: modeltypes_1.UserType.Pharmacist,
        };
    __1.services.userServices.addUser(newProvider);
    __1.services.userServices.addUser(newPharmacist);
    users.push(newProvider);
    users.push(newPharmacist);
    // for every user push 3 prescriptions and 3 patients
    let newPatient;
    let newScript;
    for (let i = 0; i <= 3; i++) {
        newPatient = {
            email: `${buildStringInput()}@${buildStringInput()}`,
            firstName: buildStringInput(),
            lastName: buildStringInput(),
            dateCreated: randomDate(),
            prescriptions: [],
            pharmacist: i % 3 !== 0
                ? i % 2 !== 0
                    ? newPharmacist.email
                    : newPharmacist.email
                : null,
            provider: i % 3 !== 0
                ? i % 2 !== 0
                    ? newProvider.email
                    : null
                : newProvider.email,
        };
        __1.services.patientServices.addPatient(newPatient);
        patients.push(newPatient);
        for (let i = 0; i <= 4; i++) {
            newScript = {
                patient: newPatient.email,
                drugName: buildStringInput(),
                dateCreated: randomDate(),
                expirationDate: randomDate(),
                prescriptionStatus: i % 3 !== 0
                    ? i % 2 !== 0
                        ? modeltypes_1.PrescriptionStatus.Pending
                        : modeltypes_1.PrescriptionStatus.InProgress
                    : modeltypes_1.PrescriptionStatus.Failed,
            };
            __1.services.prescriptionServices.addPrescription(newScript, newProvider.email);
            prescriptions.push(newScript);
        }
    }
    return { users, patients, prescriptions };
};
exports.buildSeedInputs = buildSeedInputs;
const randomString = "0izvm5edtd46awf50xnk539msuwudw6ypr6hzdf83m1v4p68s44g2uofq1vkauao57drvkxgipmc3l0aardbrwfg9i3gkykvmp876nkgi9rwsepju8jewe80netub9h4nx4btkakjgs7yitjgffbakgpu6oax8r1o9zd590vbt1srv0sphz1n4f3tygczun8kxagexvhjqctblvr0dr618no7n8ukivxpz7gh7y00lqiibz3gl94d7sfujufc865918ngum1oy43xlt3lpc7c53c41d3n2y74j8gek14ei0ajtk2px802zr4hrjr24dgd0kd45ytklpg86jz6ulxhd6m3l84ai11wh5s59ah6mbafwzl6xkewjggfsq9f1kkqmug92x8a6rxq9alskf8hqihoetskq3bbv6b4cdrrw5j4vk7j5a80uj8d7w3qb5ga8rsdq1sys1oas9n6rre5mvm04n52flsyxu9ytvcvrod3koksa0rrryzb9irpqedzhvv7i76cotbnxe44wym9fb1srh9u8y07qiens7ae9nw0pa4eod8f6rmhnn4nufpukwj6ul3h6rsrb8mrv9v50agggvj1gz9nwfopo2fxtecpn3otwdrhcvlqihsl4xxx5dxqwev66oykksswidfbcquuodnh296r";
//# sourceMappingURL=seedData.js.map