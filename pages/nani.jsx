
import Head from "next/head";
import dbConnect from "../lib/dbConnect";
import mongoose from "mongoose";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
// https://flowbite.com/blocks/marketing/login/

export default function Nani() {
  // Just a simple example for testing backend
    return <></>;
}

export async function getServerSideProps(context) {
  let isDbConnected = false;
  try {
    // Try to connect the DB.
    if (await dbConnect()) isDbConnected = true;
  } catch (e) {
    // If it cannot connect to DB, output log to console by using error flag.
    console.error(e);
  }

  // Show the mongoose connection status in back end.
  console.log(mongoose.connection.readyState);

  // Return all post and login status by props.
  return {
    props: {
      isDbConnected,
    },
  };
}
