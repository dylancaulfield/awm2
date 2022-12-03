import {get} from "@/utilities/request";
import {latLng} from "leaflet";

export default {

    namespaced: true,

    state: {
        organisations: []
    },

    mutations: {

        saveOrganisations(state, orgs){

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

        }

    },

    actions: {

        async fetchOrganisations(context){

            const organisations = await get("/api/organisations");
            context.commit("saveOrganisations", organisations);

        }

    }

};
