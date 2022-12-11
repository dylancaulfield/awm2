import {get, post} from "@/utilities/request";
import {latLng} from "leaflet";
import pip from "robust-point-in-polygon";

export default {

    namespaced: true,

    state: {
        organisations: [],
        clockedIn: [],
        location: null,
        organisationMembers: []
    },

    getters: {

        // Get Open TimesheetEntries with Location user is in
        getClockedInWithLocations: state => locations => {
            return state.clockedIn.filter(e => {
                return locations.map(l => l.id).includes(e.location.id)
            });
        },

        // Get Locations that contain users current position
        getLocationsUserIsIn(state) {

            if (!state.location) {
                return [];
            }

            const locations = [];
            const currentLocation = [state.location.lat, state.location.lng];

            for (let org of state.organisations) {

                for (let loc of org.locations) {

                    const bounds = loc.bounds.map(ll => [ll.lat, ll.lng])
                    if (!pip(bounds, currentLocation)) {
                        continue;
                    }

                    locations.push({
                        id: loc.id,
                        name: loc.name,
                        organisation: org.name,
                    });
                }
            }

            return locations;
        }
    },

    mutations: {

        saveOrganisations(state, orgs) {

            state.organisations = orgs.map(o => {

                return {
                    id: o.organisation.id,
                    name: o.organisation.name,
                    code: o.organisation.code,
                    locations: o.organisation.locations.map(l => {
                        return {
                            id: l.id,
                            name: l.name,
                            bounds: l.bounds.coordinates[0].map(c => new latLng(c[1], c[0]))
                        }
                    })
                }
            });

        },

        saveOrganisationMemberData(state, members, organisationCode){

            state.organisationMembers = members.map(m => {

                return {
                    id: m.member.id,
                    name: m.member.user.first_name,
                    timesheets: m.member.timesheets
                        .filter(t => t.location.organisation.code === organisationCode)
                        .map(t => {

                            return {
                                start: t.start,
                                finish: t.finish,
                                location: t.location.name
                            }

                        })
                }

            });

        },

        saveClockedIn(state, entries) {
            state.clockedIn = entries;
        },

        setLocation(state, location){
            state.location = location;
        }

    },

    actions: {

        async fetchOrganisations({commit}) {

            const organisations = await get("/api/organisations");
            commit("saveOrganisations", organisations);

        },

        async fetchClockedIn({commit}) {

            const entries = await get("/api/organisations/timesheets");
            commit("saveClockedIn", entries);

        },

        async fetchOrganisationMemberData({commit}, organisationCode){

            const members = await post("/api/organisations/members", {
                organisationCode
            });
            commit("saveOrganisationMemberData", members, organisationCode);

        },

        setLocation({commit}, location) {
            commit("setLocation", location);
        }

    }

};
