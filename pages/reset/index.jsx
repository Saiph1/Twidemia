
import Head from "next/head";
import dbConnect from "../../lib/dbConnect";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
// import User from "@/models/User";
// import Token from "@/models/Token";
import bcrypt from "bcrypt"

export default function Reset({ dbConnect, user, token}) {
  return <></>
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
  return {props: {}};
 
  /*
  let hash = context.query.hash;
  console.log(hash);
  let user = null;
  const token = await Token.findOne({hash:hash});
  console.log(token)
  if (!token || token.type != "forgot") {
    console.log("something is wrong");
  } else {
    console.log('find user')
    // user = await User.findOne({email: token.email});
    user = await User.findOne({email: '1155144438@link.cuhk.edu.hk'});
  }

  if (!token || !user) {
    return {
      redirect: {
        destination: '/forgot',
        permanent: false,
      },
    }
  } else {
    return {
      props: {
        isDbConnected,
        token: null,
        user: null,
        // token: JSON.parse(JSON.stringify(token)),
        // user: JSON.parse(JSON.stringify(user)),
      },

    }
  };
  */
}
