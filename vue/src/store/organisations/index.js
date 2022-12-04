import {get} from "@/utilities/request";
import {latLng} from "leaflet";
import pip from "robust-point-in-polygon";

export default {

    namespaced: true,

    state: {
        organisations: [],
        clockedIn: [],
        location: null,
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
                    userIsAdmin: o.admin,
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

        saveClockedIn(state, entries) {
            state.clockedIn = entries;
        },

        setLocation(state, location){
            state.location = location;
        }

    },

    actions: {

        async fetchOrganisations(context) {

            const organisations = await get("/api/organisations");
            context.commit("saveOrganisations", organisations);

        },

        async fetchClockedIn(context) {

            const entries = await get("/api/organisations/timesheets");
            context.commit("saveClockedIn", entries);

        },

        setLocation(context, location) {
            context.commit("setLocation", location);
        }

    }

};
