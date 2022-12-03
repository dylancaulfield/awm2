import {latLng} from "leaflet";

export default {

    namespaced: true,

    state: {
        organisations: [
            {
                id: "guid",
                name: "Organisation 1",
                locations: [
                    {
                        id: "location1guid",
                        name: "Location 1",
                        polygon: [new latLng(53.44, 6.56), new latLng(53.24, 6.41), new latLng(53.54, 5.94)]
                    }
                ]
            }
        ],
    },

    mutations: {

    },

    actions: {

    }

};
