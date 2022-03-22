import {
    createCurrentUserHook,
    createClient
} from 'next-sanity';

import imageUrlBuilder from '@sanity/image-url'

export const config = {

    //Find your project ID and dataset in 'sanity.son in your studio prokect.
    //These are considered public, but you can use environment variables
    //if you want to differ between local and dev production

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",

    //Set useCdn to 'false' if your application reques the freshest possible data laways
    //Authenticated request (like preview) will always bypass the CDN

    useCdn: process.env.NODE_ENV === "production"
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a helper function for generating image urls with only the asset reference data in your documents
export const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);