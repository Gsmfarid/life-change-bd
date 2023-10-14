"use client";

import { NextPage } from "next";
import { useState } from "react";

import { Header, PageHeader, RefTable } from "@/components";
import { IUser } from "@/interface";
import { navData } from "@/lib";

const RefList: NextPage = () => {
  const [data, setData] = useState<IUser[] | null>(null);

  if (data) {
    console.log("🚀 ~ file: page.tsx:42 ~ refData:", data);
  }

  return (
    <>
      <Header navData={navData.refList} />
      <PageHeader
        title="Reference List (Inactive)"
        notice="Last 3 Month Outbound"
        setData={setData}
      />
      {data !== null && data.length !== 0 && (
        <RefTable
          tableData={data}
          tableHeaders={["No", "id", "Name", "Joining Time"]}
          dataProperties={["id", "firstName", "createdAt", "phone"]}
          message="Message"
        />
      )}
    </>
  );
};

export default RefList;
